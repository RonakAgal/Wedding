// Audio Controller for Background Wedding Music & Sound Effects
class SoundEffects {
  private audio: HTMLAudioElement | null = null;
  private isMusicPlaying: boolean = false;
  private ctx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Load the song from public/audio folder
      this.audio = new Audio('/audio/Roshni%20Hi%20Roshni%20Hai.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.65;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isMusicPlaying = true;
      });
      this.audio.addEventListener('pause', () => {
        this.isMusicPlaying = false;
      });
      this.audio.addEventListener('ended', () => {
        this.isMusicPlaying = false;
      });
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play the actual wedding song from /public/audio/
  playWeddingSong(): boolean {
    if (this.audio) {
      this.audio
        .play()
        .then(() => {
          this.isMusicPlaying = true;
        })
        .catch((err) => {
          console.warn('Autoplay prevented or audio playback issue:', err);
        });
      return true;
    }
    return false;
  }

  // Compatibility aliases
  playShehnaiMelody() {
    this.playWeddingSong();
  }

  startAmbientDrone() {
    this.playWeddingSong();
  }

  stopAmbientDrone() {
    this.pauseWeddingSong();
  }

  pauseWeddingSong() {
    if (this.audio) {
      this.audio.pause();
      this.isMusicPlaying = false;
    }
  }

  toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.pauseWeddingSong();
      return false;
    } else {
      this.playWeddingSong();
      return true;
    }
  }

  isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  // Royal Golden Seal Coin Click / Temple Bell Chime
  playRoyalChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const decay = 2.2 + idx * 0.4;
        gain.gain.setValueAtTime(0.25 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + decay);
      });
    } catch {
      // Audio context might be restricted before interaction
    }
  }
}

export const royalSound = new SoundEffects();
