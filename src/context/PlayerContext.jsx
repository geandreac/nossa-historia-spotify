/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useRef, useEffect } from "react";
import { moments } from "../data/moments.js";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(moments[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Novo estado de volume (0.0 a 1.0). Começa em 0.7 (70%)
  const [volume, setVolume] = useState(0.7);

  // Efeito para carregar a música
  useEffect(() => {
    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log("Aguardando interação", e));
    }
  }, [currentTrack]);

  // Efeito para a barra de progresso
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Novo Efeito para gerenciar o volume real
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Erro de interação", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerContext.Provider 
      value={{ 
        currentTrack, 
        setCurrentTrack, 
        isPlaying, 
        togglePlay, 
        progress,
        volume,  // Exportando o volume
        setVolume // Exportando a função para mudar o volume
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};