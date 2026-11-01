import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  Compass,
  Radio,
  Gauge,
  Camera,
  Film,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCENES, MISSION_METRICS } from '../data/chandrayaanData';
import { sound } from '../services/soundDesign';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const CinematicPlayer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [aspectRatioMode, setAspectRatioMode] = useState<'cinemascope' | 'standard'>('cinemascope');
  const [viewMode, setViewMode] = useState<'cinematic' | 'hud' | 'clean'>('cinematic');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const hasTriggeredConfettiRef = useRef<boolean>(false);

  // Total documentary duration is exactly 20.0 seconds
  const TOTAL_DURATION = 20.0;

  // Determine current active scene based on currentTime
  const currentSceneIndex = Math.min(
    SCENES.length - 1,
    SCENES.findIndex((s) => currentTime >= s.timeRange[0] && currentTime < s.timeRange[1]) === -1
      ? SCENES.length - 1
      : SCENES.findIndex((s) => currentTime >= s.timeRange[0] && currentTime < s.timeRange[1])
  );
  const activeScene = SCENES[currentSceneIndex];

  // Calculate normalized progress within the active scene [0..1]
  const sceneDuration = activeScene.timeRange[1] - activeScene.timeRange[0];
  const sceneProgress = Math.max(0, Math.min(1, (currentTime - activeScene.timeRange[0]) / sceneDuration));

  // Audio initialize on first user interaction
  const initAudio = useCallback(() => {
    if (!isAudioInitialized) {
      sound.init();
      sound.startAtmosphericDrone();
      setIsAudioInitialized(true);
    }
  }, [isAudioInitialized]);

  // Jump to specific time
  const seekTo = (seconds: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_DURATION, seconds));
    setCurrentTime(clamped);
    if (clamped < 16) {
      hasTriggeredConfettiRef.current = false;
    }
  };

  // Trigger audio effects & narration when entering scene
  useEffect(() => {
    if (!isPlaying) return;

    if (activeScene.actNumber === 1) {
      sound.playRocketRumble(0.4);
    } else if (activeScene.actNumber === 2) {
      sound.playThrusterHiss();
    } else if (activeScene.actNumber === 3) {
      sound.playServoSound();
    } else if (activeScene.actNumber === 4) {
      sound.playTriumphChime();
      if (!hasTriggeredConfettiRef.current) {
        hasTriggeredConfettiRef.current = true;
        try {
          confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF9933', '#FFFFFF', '#138808', '#000080', '#FCD34D'],
          });
        } catch {
          // ignore
        }
      }
    }

    if (voiceEnabled) {
      sound.speakNarration(activeScene.narration, activeScene.actNumber);
    }
  }, [activeScene.actNumber, isPlaying, voiceEnabled]);

  // Handle Play/Pause toggle
  const togglePlay = () => {
    initAudio();
    if (currentTime >= TOTAL_DURATION) {
      seekTo(0);
      sound.resetNarrationHistory();
      hasTriggeredConfettiRef.current = false;
    }
    setIsPlaying((prev) => !prev);
  };

  // Keyboard shortcut: Space to play/pause, Left/Right arrow to seek
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekTo(currentTime + 1);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekTo(currentTime - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, isPlaying]);

  // Main playback loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const step = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }
      const deltaSeconds = ((timestamp - lastTimestampRef.current) / 1000) * playbackSpeed;
      lastTimestampRef.current = timestamp;

      setCurrentTime((prev) => {
        const next = prev + deltaSeconds;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  // Particle Canvas Simulation for each scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const act = activeScene.actNumber;

      // Spawn particles based on the active act
      if (isPlaying) {
        if (act === 1) {
          // Act 1: Golden dawn rocket exhaust fire & billowing smoke
          for (let i = 0; i < 4; i++) {
            particlesRef.current.push({
              x: width * 0.5 + (Math.random() - 0.5) * 60,
              y: height * 0.65 + Math.random() * 30,
              vx: (Math.random() - 0.5) * 3,
              vy: Math.random() * 2 + 1,
              radius: Math.random() * 18 + 10,
              color: Math.random() > 0.4 ? 'rgba(255, 140, 0, ' : 'rgba(255, 215, 0, ',
              alpha: 0.6,
              life: 0,
              maxLife: 40 + Math.random() * 30,
            });
          }
          // Billowing white-orange smoke
          if (Math.random() > 0.3) {
            particlesRef.current.push({
              x: width * 0.5 + (Math.random() - 0.5) * 120,
              y: height * 0.72 + (Math.random() - 0.5) * 40,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -Math.random() * 0.8,
              radius: Math.random() * 35 + 20,
              color: 'rgba(240, 210, 180, ',
              alpha: 0.25,
              life: 0,
              maxLife: 80,
            });
          }
        } else if (act === 2) {
          // Act 2: Lunar soft regolith dust kicking up in low gravity vacuum + thruster flare
          for (let i = 0; i < 6; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            particlesRef.current.push({
              x: width * 0.5 + (Math.random() - 0.5) * 80,
              y: height * 0.78,
              vx: Math.cos(angle) * speed,
              vy: -Math.sin(Math.abs(angle)) * speed * 0.6 - 0.3,
              radius: Math.random() * 4 + 1.5,
              color: Math.random() > 0.3 ? 'rgba(200, 210, 225, ' : 'rgba(255, 255, 255, ',
              alpha: 0.7,
              life: 0,
              maxLife: 60 + Math.random() * 40,
            });
          }
        } else if (act === 3) {
          // Act 3: Subtle floating moon dust motes around rover ramp
          if (Math.random() > 0.4) {
            particlesRef.current.push({
              x: width * 0.35 + (Math.random() - 0.5) * 150,
              y: height * 0.8 + (Math.random() - 0.5) * 60,
              vx: (Math.random() - 0.5) * 0.5,
              vy: -Math.random() * 0.6 - 0.2,
              radius: Math.random() * 2.5 + 1,
              color: 'rgba(220, 230, 245, ',
              alpha: 0.5,
              life: 0,
              maxLife: 70,
            });
          }
        } else if (act === 4) {
          // Act 4: Triumphant star shimmers and subtle golden solar glints
          if (Math.random() > 0.5) {
            particlesRef.current.push({
              x: Math.random() * width,
              y: Math.random() * (height * 0.45),
              vx: 0,
              vy: 0,
              radius: Math.random() * 2 + 1,
              color: Math.random() > 0.5 ? 'rgba(147, 197, 253, ' : 'rgba(251, 191, 36, ',
              alpha: 0.8,
              life: 0,
              maxLife: 45,
            });
          }
        }
      }

      // Update & draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const currentAlpha = p.alpha * (1 - p.life / p.maxLife);

        if (currentAlpha <= 0 || p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color + currentAlpha + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderParticles);
    };

    const handleResize = () => {
      if (containerRef.current && canvas) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    animId = requestAnimationFrame(renderParticles);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeScene.actNumber, isPlaying]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Sound muting
  const toggleMute = () => {
    initAudio();
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  // Voice narration toggle
  const toggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    sound.setVoiceEnabled(next);
  };

  // Calculate dynamic camera transform based on scene & progress
  // Scene 1: Dawn liftoff sweeping upward tilt and slow pan
  // Scene 2: Vikram descending slow tracking push-in
  // Scene 3: Pragyan rollout macro slow forward crawl
  // Scene 4: Majestic pull-back wide crane move
  let cameraScale = 1.0;
  let cameraTranslateX = 0;
  let cameraTranslateY = 0;

  if (activeScene.actNumber === 1) {
    // Upward tilt & gentle zoom
    cameraScale = 1.05 + sceneProgress * 0.08;
    cameraTranslateY = sceneProgress * -2.5; // slow upward pan
  } else if (activeScene.actNumber === 2) {
    // Tracking descent downwards
    cameraScale = 1.08 - sceneProgress * 0.05;
    cameraTranslateY = sceneProgress * 1.8;
  } else if (activeScene.actNumber === 3) {
    // Low angle rover roll tracking
    cameraScale = 1.06 + sceneProgress * 0.06;
    cameraTranslateX = (sceneProgress - 0.5) * -1.5;
  } else if (activeScene.actNumber === 4) {
    // Slow majestic pull-back (grand zoom out revealing full vista)
    cameraScale = 1.12 - sceneProgress * 0.12;
    cameraTranslateY = sceneProgress * -1.0;
  }

  // Format seconds to mm:ss.ms
  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const ms = Math.floor((secs - s) * 100);
    return `00:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div id="player" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Editorial Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <span>ISRO Lunar Exploration Programme</span>
            <span aria-hidden="true">·</span>
            <span>20-Second Documentary Cut</span>
            <span aria-hidden="true">·</span>
            <span>23 August 2023</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-tech text-balance">
            Chandrayaan-3: India's Giant Leap to the Lunar South Pole
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Relive the 20-second cinematic space journey from the dawn liftoff at Sriharikota to the soft-landing
            and historic tricolour stand at Shiv Shakti Point.
          </p>
        </div>

        {/* View Mode & Aspect Ratio Controls */}
        <div className="flex items-center gap-2 self-start md:self-end shrink-0">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setAspectRatioMode('cinemascope')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                aspectRatioMode === 'cinemascope'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="2.39:1 Anamorphic Scope"
            >
              2.39:1 Scope
            </button>
            <button
              onClick={() => setAspectRatioMode('standard')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                aspectRatioMode === 'standard'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="16:9 Standard Widescreen"
            >
              16:9 HD
            </button>
          </div>

          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('cinematic')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'cinematic' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Director's Cut
            </button>
            <button
              onClick={() => setViewMode('hud')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'hud' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Telemetry HUD
            </button>
            <button
              onClick={() => setViewMode('clean')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'clean' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Clean
            </button>
          </div>
        </div>
      </div>

      {/* Main Theater Screen Container */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-black rounded-xl border border-slate-800 shadow-2xl transition-all duration-300 ${
          aspectRatioMode === 'cinemascope' ? 'aspect-[2.39/1]' : 'aspect-video'
        } ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : ''}`}
      >
        {/* Cinematic Letterbox Mask (when in cinemascope mode) */}
        {aspectRatioMode === 'cinemascope' && (
          <>
            <div className="absolute top-0 left-0 right-0 h-4 md:h-6 bg-black z-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 bg-black z-30 pointer-events-none" />
          </>
        )}

        {/* Master Scene Imagery with Transitions */}
        {SCENES.map((scene, idx) => {
          const isCurrent = idx === currentSceneIndex;
          // Calculate opacity: blend nicely
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Visual Asset */}
              <img
                src={scene.imageSrc}
                alt={scene.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none transition-transform duration-100 ease-out"
                style={{
                  transform: isCurrent
                    ? `scale(${cameraScale}) translate(${cameraTranslateX}%, ${cameraTranslateY}%)`
                    : 'scale(1)',
                }}
              />

              {/* Lighting Tone Color Grading Scrim */}
              {scene.lightingTone === 'warm-golden' && (
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-orange-900/10 to-transparent mix-blend-screen pointer-events-none" />
              )}
              {scene.lightingTone === 'cold-silver-blue' && (
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-cyan-950/15 to-transparent mix-blend-color-dodge pointer-events-none" />
              )}
              {scene.lightingTone === 'triumphant-contrast' && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-amber-500/10 mix-blend-soft-light pointer-events-none" />
              )}

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none" />
            </div>
          );
        })}

        {/* Real-time Dynamic Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

        {/* Telemetry HUD Layer (when mode is HUD or Cinematic) */}
        {viewMode !== 'clean' && (
          <div className="absolute inset-0 z-30 p-4 sm:p-6 flex flex-col justify-between pointer-events-none">
            {/* Top HUD Info */}
            <div className="flex items-start justify-between">
              <div className="space-y-1 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                    MISSION TIMELINE · {formatTime(currentTime)}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white font-tech tracking-wide">
                  ACT {activeScene.actNumber}: {activeScene.title}
                </div>
                <div className="text-[10px] text-slate-300 font-mono">{activeScene.location}</div>
              </div>

              {/* Right Telemetry Readout */}
              {viewMode === 'hud' && (
                <div className="bg-black/65 backdrop-blur-md p-3 rounded-lg border border-cyan-500/30 text-right space-y-1">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center justify-end gap-1.5">
                    <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>ISTRAC TELEMETRY</span>
                  </div>
                  <div className="text-sm font-bold font-mono text-white tabular-nums">
                    ALT: <span className="text-cyan-300">{activeScene.telemetry.altitude}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-300 tabular-nums">
                    VEL: {activeScene.telemetry.velocity}
                  </div>
                  <div className="text-[10px] font-mono text-amber-300">
                    STAGE: {activeScene.telemetry.stage}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Subtitle / Documentary Narration Bar */}
            <div className="w-full max-w-3xl mx-auto mb-2 text-center">
              <div className="inline-block bg-black/80 backdrop-blur-md px-4 py-2 sm:py-2.5 rounded-lg border border-white/10 shadow-lg">
                <p className="text-xs sm:text-sm md:text-base font-medium text-slate-100 leading-snug tracking-wide">
                  "{activeScene.narration}"
                </p>
                <div className="mt-1 flex items-center justify-center gap-3 text-[10px] text-slate-400 font-mono">
                  <span>Camera: {activeScene.cameraMotion}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400/90">{activeScene.depthOfField}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Center Big Play Button Overlay on Pause */}
        {!isPlaying && currentTime < TOTAL_DURATION && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 backdrop-blur-[2px]">
            <button
              onClick={togglePlay}
              className="group flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/90 text-slate-950 hover:bg-amber-400 hover:scale-105 transition-all shadow-xl hover:shadow-amber-500/30 focus:outline-none"
              aria-label="Play 20-Second Clip"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            </button>
          </div>
        )}

        {/* Climax Replay Screen on Completion */}
        {currentTime >= TOTAL_DURATION && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-tech text-white">
                "India is Now on the Moon"
              </h3>
              <p className="text-sm text-slate-300 max-w-md mt-1">
                Shiv Shakti Point, 69.373° S. First nation to softly touch down in the lunar south polar zone.
              </p>
            </div>
            <button
              onClick={() => {
                seekTo(0);
                setIsPlaying(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay 20s Documentary</span>
            </button>
          </div>
        )}
      </div>

      {/* Scrubber & Master Player Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
        {/* Scrubber Bar with Scene Chapters */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-amber-400 font-semibold tabular-nums">{formatTime(currentTime)}</span>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-sans">
                Scene {activeScene.actNumber} of 4: <strong className="text-white">{activeScene.title}</strong>
              </span>
              <span className="text-slate-500 tabular-nums">/ 00:20.00</span>
            </div>
          </div>

          {/* Interactive Range Scrubber */}
          <div className="relative group py-1 cursor-pointer">
            <input
              type="range"
              min="0"
              max={TOTAL_DURATION}
              step="0.05"
              value={currentTime}
              onChange={(e) => {
                initAudio();
                seekTo(parseFloat(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
            />

            {/* Scene Markers on Timeline */}
            <div className="absolute top-1 left-0 right-0 h-2 pointer-events-none flex">
              {SCENES.map((scene, i) => {
                const widthPercent = ((scene.timeRange[1] - scene.timeRange[0]) / TOTAL_DURATION) * 100;
                return (
                  <div
                    key={scene.id}
                    style={{ width: `${widthPercent}%` }}
                    className={`h-full border-r border-slate-950/70 ${
                      currentTime >= scene.timeRange[0] && currentTime < scene.timeRange[1]
                        ? 'bg-amber-400/20'
                        : ''
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Scene Chapter Click Targets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {SCENES.map((scene) => {
              const isSelected = activeScene.id === scene.id;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    initAudio();
                    seekTo(scene.timeRange[0]);
                  }}
                  className={`text-left p-2 rounded-lg border transition-all text-xs ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                    <span>ACT {scene.actNumber}</span>
                    <span>{scene.timeRange[0]}s - {scene.timeRange[1]}s</span>
                  </div>
                  <div className="font-medium truncate text-white mt-0.5">{scene.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Control Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          {/* Left: Playback controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                initAudio();
                seekTo(0);
                sound.resetNarrationHistory();
              }}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Playback Speed */}
            <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-0.5">
              {[0.5, 1, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-1 text-xs font-mono rounded ${
                    playbackSpeed === speed ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Right: Audio & Screen Controls */}
          <div className="flex items-center gap-3">
            {/* Audio Soundtrack Mute */}
            <button
              onClick={toggleMute}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                isMuted
                  ? 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
              }`}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
            </button>

            {/* Voiceover Narration Toggle */}
            <button
              onClick={toggleVoice}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                voiceEnabled
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title={voiceEnabled ? 'Disable Voiceover' : 'Enable Voiceover'}
            >
              {voiceEnabled ? <Mic className="w-4 h-4 text-amber-400" /> : <MicOff className="w-4 h-4" />}
              <span className="hidden sm:inline">Voiceover {voiceEnabled ? 'Active' : 'Off'}</span>
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
