import { useCallback, useRef } from 'react';

export function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    return ctxRef.current;
  }, []);

  const playTone = useCallback((freq: number, duration: number, type: OscillatorType = 'sine') => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [getCtx]);

  const playClick = useCallback(() => playTone(800, 0.05), [playTone]);
  const playSuccess = useCallback(() => {
    playTone(523, 0.1); setTimeout(() => playTone(659, 0.1), 100); setTimeout(() => playTone(784, 0.15), 200);
  }, [playTone]);
  const playError = useCallback(() => { playTone(200, 0.1); setTimeout(() => playTone(150, 0.15), 100); }, [playTone]);
  const playDrop = useCallback(() => playTone(500, 0.05), [playTone]);

  return { playClick, playSuccess, playError, playDrop };
}
