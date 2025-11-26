import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative z-10 mb-12 animate-slide-up">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-telegram to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-telegram-input rounded-xl border border-gray-700 focus-within:border-telegram transition-colors">
          <Search className="ml-4 w-6 h-6 text-gray-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Anahtar kelime girin (örn: Yazılım, Kripto, İngilizce Pratik)..."
            className="w-full bg-transparent text-white p-4 text-lg focus:outline-none placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="mr-2 px-6 py-2 bg-telegram hover:bg-telegram-dark text-white rounded-lg font-medium transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Bul</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Quick suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center text-sm text-gray-400">
        <span>Popüler:</span>
        {['Python', 'Kripto Para', 'İş İlanları', 'Yapay Zeka', 'Film & Dizi'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setInput(tag);
              onSearch(tag);
            }}
            className="hover:text-telegram hover:underline transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </form>
  );
};