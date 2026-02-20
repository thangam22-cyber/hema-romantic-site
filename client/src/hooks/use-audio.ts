import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

export function useHeartbeatAudio() {
  const soundRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/media/heartbeat.mp3'],
      loop: true,
      volume: 0.3, // Low volume as requested
      html5: true,
      onloaderror: (id, err) => console.error('Audio load error', err),
      onplayerror: (id, err) => {
        console.error('Audio play error', err);
        soundRef.current?.once('unlock', () => {
          soundRef.current?.play();
        });
      }
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const play = () => {
    if (soundRef.current && !soundRef.current.playing()) {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  };

  return { play, pause, isPlaying };
}
