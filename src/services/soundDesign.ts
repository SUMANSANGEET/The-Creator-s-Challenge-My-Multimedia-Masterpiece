/**
 * High-end cinematic sound design using Web Audio API + Speech Synthesis
 * Provides ambient space drone, rocket roar, thruster bursts, servo sounds,
 * telemetry telemetry beeps, and optional documentary narration.
 */

class SoundDesignService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private droneGain: GainNode | null = null;
  private voiceEnabled: boolean = true;
  private currentSpeech: SpeechSynthesisUtterance | null = null;
  private lastSpokenAct: number = -1;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setValueAtTime(muted ? 0 : 0.12, this.ctx.currentTime);
    }
    if (muted && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public getIsMuted() {
    return this.isMuted;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    if (!enabled && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  public getVoiceEnabled() {
    return this.voiceEnabled;
  }

  public startAtmosphericDrone() {
    if (!this.ctx || this.isMuted) return;
    try {
      if (this.droneGain) return; // already active

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.08, this.ctx.currentTime);
      master.connect(this.ctx.destination);
      this.droneGain = master;

      // Low cosmic drone 55Hz & 110Hz with slow modulation
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime); // E2 note

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.07, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(subGain);
      subGain.connect(master);

      osc1.start();
      osc2.start();
    } catch {
      // Audio context policy or unsupported
    }
  }

  public playRocketRumble(intensity: number = 0.5) {
    if (!this.ctx || this.isMuted) return;
    try {
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.8));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3 * intensity, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Audio play failure ignored
    }
  }

  public playThrusterHiss() {
    if (!this.ctx || this.isMuted) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.75);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Audio play failure ignored
    }
  }

  public playServoSound() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.36);
    } catch {
      // Audio play failure ignored
    }
  }

  public playTriumphChime() {
    if (!this.ctx || this.isMuted) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 major chord
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.06, this.ctx!.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.12 + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.12);
        osc.stop(this.ctx!.currentTime + idx * 0.12 + 1.9);
      });
    } catch {
      // Audio play failure ignored
    }
  }

  public playTelemetryBeep() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, this.ctx.currentTime); // A6 ping
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignored
    }
  }

  public speakNarration(text: string, actNumber: number) {
    if (this.isMuted || !this.voiceEnabled) return;
    if (this.lastSpokenAct === actNumber) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      this.lastSpokenAct = actNumber;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // documentary cinematic tempo
      utterance.pitch = 0.95; // slightly deeper documentary tone
      utterance.volume = 0.9;

      // Select high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Arthur')) &&
          v.lang.startsWith('en')
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferred) {
        utterance.voice = preferred;
      }

      this.currentSpeech = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis error handled gracefully
    }
  }

  public resetNarrationHistory() {
    this.lastSpokenAct = -1;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const sound = new SoundDesignService();
