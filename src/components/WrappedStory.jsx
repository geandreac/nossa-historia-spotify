/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { wrappedData } from '../data/moments.js';

const WrappedStory = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Trava de segurança: Se o wrappedData não existir ou estiver vazio, não renderiza nada
  if (!isOpen || !wrappedData || wrappedData.length === 0) return null;

  const nextSlide = () => {
    if (currentSlide < wrappedData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = wrappedData[currentSlide];

  // ... restante do código do componente

  return (
    <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col">
      {/* Fundo com Gradiente Dinâmico */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-90 transition-colors duration-500`}></div>

      {/* Conteúdo Seguro (Dynamic Island) */}
      <div className="relative z-10 flex flex-col h-full pt-14 pb-10 px-4">
        
        {/* Barras de Progresso (Estilo Instagram Stories) */}
        <div className="flex gap-1 mb-6">
          {wrappedData.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300"
                style={{ width: index <= currentSlide ? '100%' : '0%' }}
              ></div>
            </div>
          ))}
        </div>

        {/* Botão Fechar */}
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="p-2 bg-black/20 rounded-full backdrop-blur-md">
            <X size={24} />
          </button>
        </div>

        {/* Áreas de Clique Invisíveis (Esquerda/Direita) */}
        <div className="absolute inset-y-24 left-0 w-1/3 z-20" onClick={prevSlide}></div>
        <div className="absolute inset-y-24 right-0 w-2/3 z-20" onClick={nextSlide}></div>

        {/* Textos e Imagens Animadas */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
                {slide.title}
              </h2>

              {slide.highlight && (
                <motion.h1 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                  className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 drop-shadow-2xl my-2"
                >
                  {slide.highlight}
                </motion.h1>
              )}

              {slide.image && (
                <motion.img 
                  initial={{ rotate: -5, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  src={slide.image} 
                  alt="Momento" 
                  className="w-64 h-64 object-cover rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] border-4 border-white/20"
                />
              )}

              {slide.subtitle && (
                <p className="text-xl font-medium text-white/90 drop-shadow-md mt-4">
                  {slide.subtitle}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WrappedStory;