import React from 'react';
import { TelegramGroup } from '../types';
import { Users, Globe, CheckCircle, ExternalLink } from 'lucide-react';

interface GroupCardProps {
  group: TelegramGroup;
  index: number;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, index }) => {
  // Staggered animation delay
  const style = { animationDelay: `${index * 100}ms` };

  return (
    <div 
      style={style}
      className="bg-telegram-card border border-gray-800 rounded-xl p-6 hover:border-telegram/50 transition-all hover:shadow-lg hover:shadow-telegram/10 group animate-slide-up flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-telegram transition-colors line-clamp-1">
              {group.name}
            </h3>
            {group.isOfficial && (
              <CheckCircle className="w-4 h-4 text-blue-400" fill="currentColor" stroke="black" />
            )}
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-gray-800 text-gray-300 rounded-md uppercase tracking-wider">
            {group.category}
          </span>
        </div>
        <div className="bg-gray-800 p-2 rounded-lg">
            <div className="text-telegram font-bold text-xl text-center w-10 h-10 flex items-center justify-center rounded-md bg-telegram/10">
                {group.name.substring(0, 1).toUpperCase()}
            </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
        {group.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{group.membersCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            <span>{group.language}</span>
          </div>
        </div>
        
        <a 
          href={group.link.startsWith('http') ? group.link : `https://${group.link}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/5 hover:bg-telegram hover:text-white text-gray-300 px-4 py-2 rounded-lg transition-all text-sm font-medium"
        >
          Katıl
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};