/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { PlayerContext } from '../context/PlayerContext.jsx';

const MiniPlayer = ({ onClick }) => {
  const { currentTrack, isPlaying, togglePlay, progress } = useContext(PlayerContext);

  return (
    <div className="fixed bottom-[85px] left-2 right-2 z-40">
      <div 
        onClick={onClick}
        className="bg-[#1e1e1e]/95 backdrop-blur-xl rounded-lg flex flex-col shadow-2xl cursor-pointer overflow-hidden border border-white/10"
      >
        <div className="flex items-center justify-between p-2 gap-2">
          
          {/* Info da Música */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <img src={currentTrack.cover} alt="Capa" className="w-10 h-10 rounded shadow-md flex-shrink-0 object-cover" />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-[13px] font-bold truncate">{currentTrack.title}</span>
              <span className="text-[#a7a7a7] text-[11px] truncate">{currentTrack.artist}</span>
            </div>
          </div>

          {/* Controles: Play e Coração */}
          <div className="flex items-center gap-4 pr-2">
            <Heart size={20} className="text-spotify-green" fill="#1DB954" />
            <button 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
            </button>
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="h-[2px] w-full bg-white/10">
          <div className="h-full bg-white transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;