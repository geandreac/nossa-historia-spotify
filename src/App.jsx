/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import BottomNav from './components/BottomNav.jsx';
import MiniPlayer from './components/MiniPlayer.jsx';
import FullScreenPlayer from './components/FullScreenPlayer.jsx';
import WrappedStory from './components/WrappedStory.jsx';
import { PlayerContext } from './context/PlayerContext.jsx';

function App() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isWrappedOpen, setIsWrappedOpen] = useState(false);
  const { currentTrack } = useContext(PlayerContext);

  return (
    <div className="min-h-screen bg-spotify-black text-white pb-40 overflow-x-hidden">
      <main className="p-6">
        {/* Header Personalizado */}
        <div className="flex items-center gap-3 mb-8 mt-4">
          <img 
            src="/perfil.jpg" 
            alt="Perfil" 
            className="w-9 h-9 rounded-full object-cover border border-white/10 shadow-md" 
          />
          <h2 className="text-2xl font-bold tracking-tight">Bom dia, Amorzinho! ❤️</h2>
        </div>
        
        {/* Banner do Wrapped 2026 */}
        <div 
          onClick={() => setIsWrappedOpen(true)}
          className="relative w-full h-32 bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#6366f1] rounded-xl mb-8 flex items-center justify-center cursor-pointer overflow-hidden shadow-2xl active:scale-95 transition-transform"
        >
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/30 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 block mb-1">A nossa história</span>
            <h1 className="text-3xl font-black tracking-tighter italic">Nosso Wrapped</h1>
          </div>
        </div>

        {/* Cards de Atalho com Fotos Reais */}
<div className="grid grid-cols-2 gap-3 mb-10">
  {/* Botão Nossa Casa */}
  <div 
    className="bg-spotify-light/60 p-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-spotify-light transition-colors border border-white/5"
  >
    <img 
      src="/casa.jpg" 
      alt="Nossa Casa" 
      className="w-12 h-12 object-cover rounded-sm shadow-lg flex-shrink-0" 
    />
    <span className="text-[11px] font-bold truncate">Nossa Casa</span>
  </div>

  {/* Botão Momentos - Configurado para abrir o Wrapped ao clicar */}
  <div 
    onClick={() => setIsWrappedOpen(true)}
    className="bg-spotify-light/60 p-2 rounded-md flex items-center gap-3 cursor-pointer hover:bg-spotify-light transition-colors border border-white/5"
  >
    <img 
      src="/momentos.jpg" 
      alt="Momentos" 
      className="w-12 h-12 object-cover rounded-sm shadow-lg flex-shrink-0" 
    />
    <span className="text-[11px] font-bold truncate">Momentos</span>
  </div>
</div>

        <h2 className="text-xl font-bold mb-6 tracking-tight">Feito para vocês</h2>
        
        {/* Card do Álbum Centralizado */}
        <div className="flex justify-center">
          <div 
            onClick={() => setIsPlayerOpen(true)}
            className="w-[190px] bg-spotify-dark/40 p-4 rounded-xl flex flex-col items-center gap-4 cursor-pointer group shadow-2xl hover:bg-spotify-light/30 transition-all duration-300 border border-white/5"
          >
            <div className="relative w-full aspect-square">
              <img 
                src={currentTrack.cover} 
                className="w-full h-full object-cover rounded-lg shadow-2xl group-hover:scale-[1.02] transition-transform duration-500" 
                alt="Album Cover" 
              />
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-spotify-green rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.3)] flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                 <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 6v12l10-6z"></path></svg>
              </div>
            </div>
            
            <div className="text-center w-full">
              <span className="text-sm font-bold block truncate text-white">{currentTrack.title}</span>
              <span className="text-[11px] text-spotify-gray block truncate font-medium uppercase tracking-wider">{currentTrack.artist}</span>
            </div>
          </div>
        </div>

      </main>

      {/* Interface do Player */}
      <MiniPlayer onClick={() => setIsPlayerOpen(true)} />
      
      <FullScreenPlayer 
        isOpen={isPlayerOpen} 
        onClose={() => setIsPlayerOpen(false)} 
      />

      <WrappedStory 
        isOpen={isWrappedOpen} 
        onClose={() => setIsWrappedOpen(false)} 
      />
      
      <BottomNav />
    </div>
  )
}

export default App;