import { useEffect, useRef } from 'react';

const MUSIC_URL = 'https://mp3.itingwa.com/2017-08/09/20170809091923-Mzg0NzA1.mp3';

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    const startMusic = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      audio.play().catch(() => {
        startedRef.current = false;
      });
    };

    const onInteraction = () => startMusic();
    document.addEventListener('click', onInteraction, { once: true });
    document.addEventListener('scroll', onInteraction, { once: true });

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click', onInteraction);
      document.removeEventListener('scroll', onInteraction);
    };
  }, []);

  return null;
}
