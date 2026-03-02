import { Home, Search, Library } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-12 pb-4 px-8 z-40 pointer-events-none">
      <div className="flex justify-between items-center max-w-md mx-auto pointer-events-auto">
        <div className="flex flex-col items-center gap-1 text-white cursor-pointer hover:text-spotify-green transition-colors">
          <Home size={24} />
          <span className="text-[10px] font-medium">Início</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-spotify-gray cursor-pointer hover:text-white transition-colors">
          <Search size={24} />
          <span className="text-[10px] font-medium">Buscar</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-spotify-gray cursor-pointer hover:text-white transition-colors">
          <Library size={24} />
          <span className="text-[10px] font-medium">Biblioteca</span>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;