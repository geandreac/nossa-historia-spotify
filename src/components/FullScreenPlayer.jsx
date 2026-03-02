/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { ChevronDown, MoreHorizontal, Heart, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PlayerContext } from '../context/PlayerContext.jsx';

const FullScreenPlayer = ({ isOpen, onClose }) => {
  const { currentTrack, isPlaying, togglePlay, progress, volume, setVolume } = useContext(PlayerContext);
  
  // Estado para o coração
  const [isLoved, setIsLoved] = useState(true);

  // Função do Easter Egg (A Chuva de Corações)
  const handleLoveClick = () => {
    if (!isLoved) {
      // Dispara os confetes apenas quando ela "curtir"
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#1DB954', '#ff69b4', '#ff0000', '#ffffff'], // Verde, Rosa, Vermelho, Branco
        disableForReducedMotion: true,
        zIndex: 100
      });
    }
    setIsLoved(!isLoved);
  };

  // Cor padrão caso a música não tenha a propriedade color
  const bgColor = currentTrack.color || "from-emerald-800/80";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed inset-0 z-50 bg-spotify-black text-white overflow-y-auto hide-scrollbar"
        >
          {/* Fundo com Gradiente Dinâmico (Agora lê a cor do moments.js) */}
          <div className={`fixed inset-0 bg-gradient-to-b ${bgColor} via-spotify-black to-spotify-black pointer-events-none -z-10 h-[100vh] transition-colors duration-1000`}></div>

          <div className="min-h-full flex flex-col px-6 pt-14 pb-12">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <button onClick={onClose} className="p-2 -ml-2 hover:opacity-70 transition-opacity">
                <ChevronDown size={28} />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/70">Tocando de "Nossa História"</span>
                <span className="text-sm font-bold">{currentTrack.artist}</span>
              </div>
              <button className="p-2 -mr-2 hover:opacity-70 transition-opacity">
                <MoreHorizontal size={28} />
              </button>
            </div>

            {/* Arte do Álbum */}
            <div className="w-full aspect-square mb-8">
              <img 
                src={currentTrack.cover} 
                alt="Capa" 
                className="w-full h-full object-cover rounded-[4px] shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              />
            </div>

            {/* Informações da Música e Coração Animado */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col overflow-hidden pr-4">
                <h1 className="text-2xl font-bold truncate text-white">{currentTrack.title}</h1>
                <p className="text-white/70 text-lg truncate">{currentTrack.artist}</p>
              </div>
              
              {/* O Botão de Curtir com Animação */}
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={handleLoveClick}
                className="flex-shrink-0 p-2 -mr-2"
              >
                <Heart 
                  size={28} 
                  className={isLoved ? "text-spotify-green" : "text-white/70"} 
                  fill={isLoved ? "#1DB954" : "transparent"} 
                />
              </motion.button>
            </div>

            {/* Barra de Progresso */}
            <div className="mb-6">
              <div className="group h-1.5 w-full bg-white/20 rounded-full mb-2 overflow-hidden relative cursor-pointer">
                <div 
                  className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 group-hover:bg-spotify-green" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-white/50 tracking-wider">
                <span>0:00</span>
                <span>∞</span>
              </div>
            </div>

            {/* Controles Principais */}
            <div className="flex justify-between items-center mb-8">
              <Shuffle size={24} className={isLoved ? "text-spotify-green" : "text-white/70"} />
              <SkipBack size={36} fill="white" className="text-white" />
              <button 
                onClick={togglePlay}
                className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
              </button>
              <SkipForward size={36} fill="white" className="text-white" />
              <Repeat size={24} className="text-white/70" />
            </div>

            {/* Controle de Volume */}
            <div className="flex items-center gap-3 mb-12 px-2">
              <Volume2 size={20} className="text-white/70" />
              <input 
                type="range" min="0" max="100" value={volume * 100}
                onChange={(e) => setVolume(e.target.value / 100)}
                className="w-full h-1 bg-white/20 rounded-full appearance-none accent-white cursor-pointer"
              />
            </div>

            {/* Card de Letras (Lyrics) */}
            <div className={`bg-${currentTrack.color ? currentTrack.color.split('-')[1] : 'emerald'}-600/30 rounded-2xl p-6 mb-6 shadow-lg border border-white/10`}>
              <div className="flex justify-between items-center mb-4 font-bold text-sm tracking-wide">
                <span>Letras</span>
              </div>
              <p className="text-2xl font-bold leading-relaxed text-white whitespace-pre-line">
                {currentTrack.lyrics}
              </p>
            </div>

            {/* Card de Contexto */}
            <div className="bg-[#242424] rounded-2xl p-6 mb-8 shadow-lg border border-white/5">
              <div className="font-bold text-sm tracking-wide mb-4">Sobre este momento</div>
              <div className="flex gap-4 items-center mb-4">
                <img src={currentTrack.cover} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-lg">{currentTrack.artist}</p>
                  <p className="text-white/60 text-sm">Ouvintes mensais: Apenas nós dois</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {currentTrack.context}
              </p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenPlayer;