import React from 'react';
import { Send, Info } from 'lucide-react';

interface HeaderProps {
  onInfoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onInfoClick }) => {
  return (
    <header className="w-full py-6 flex flex-col items-center justify-center text-center px-4 animate-fade-in relative">
      <button 
        onClick={onInfoClick}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
        title="Nasıl Çalışır?"
      >
        <Info className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-telegram rounded-full p-3 shadow-lg shadow-telegram/30">
          <Send className="w-8 h-8 text-white" fill="white" />
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-telegram to-blue-400">
          TeleBul
        </h1>
      </div>
      <p className="text-gray-400 text-lg max-w-md">
        Yapay zeka ile ilgi alanlarınıza uygun Telegram topluluklarını keşfedin.
      </p>
    </header>
  );
};