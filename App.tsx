import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { GroupCard } from './components/GroupCard';
import { SkeletonLoader } from './components/SkeletonLoader';
import { searchTelegramGroups } from './services/geminiService';
import { SearchState } from './types';
import { AlertCircle, Terminal, X, Server, Key, Settings, Info, Cloud, HardDrive, Package } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<SearchState>({
    query: '',
    loading: false,
    results: [],
    error: null,
    hasSearched: false,
  });
  
  const [showInfo, setShowInfo] = useState(false);

  const handleSearch = async (query: string) => {
    setState(prev => ({ ...prev, loading: true, error: null, query, hasSearched: true }));
    
    try {
      const results = await searchTelegramGroups(query);
      setState(prev => ({
        ...prev,
        loading: false,
        results,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Bilinmeyen bir hata oluştu.',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-telegram-darker bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1B2735] via-[#0F1621] to-[#0F1621] text-gray-100 font-sans selection:bg-telegram selection:text-white">
      
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-telegram/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col min-h-screen">
        <Header onInfoClick={() => setShowInfo(true)} />

        <main className="flex-grow flex flex-col items-center w-full">
          <SearchBar onSearch={handleSearch} isLoading={state.loading} />

          {/* Error State */}
          {state.error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3 mb-8 animate-fade-in max-w-2xl w-full">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">Hata Oluştu</p>
                <p className="text-sm opacity-90">{state.error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {state.loading && <SkeletonLoader />}

          {/* Empty State (Before Search) */}
          {!state.hasSearched && !state.loading && (
            <div className="text-center text-gray-500 mt-10 animate-fade-in max-w-lg">
              <div className="inline-block p-4 rounded-full bg-gray-800/50 mb-4">
                <Terminal className="w-12 h-12 opacity-50" />
              </div>
              <p className="text-lg">Aramaya başlamak için bir konu veya anahtar kelime girin.</p>
              <p className="text-sm mt-2 opacity-60">"Yazılım", "İkinci El Araba", "Kripto Sohbet" gibi terimler deneyebilirsiniz.</p>
            </div>
          )}

          {/* Empty State (No Results) */}
          {state.hasSearched && !state.loading && state.results.length === 0 && !state.error && (
            <div className="text-center text-gray-400 mt-10 animate-fade-in">
              <p className="text-xl font-medium">Sonuç bulunamadı.</p>
              <p className="mt-2">Lütfen farklı anahtar kelimeler deneyin.</p>
            </div>
          )}

          {/* Results Grid */}
          {!state.loading && state.results.length > 0 && (
            <div className="w-full max-w-7xl mx-auto animate-fade-in">
                <div className="flex justify-between items-center mb-6 px-2">
                    <h2 className="text-xl font-semibold text-white">
                        "{state.query}" için sonuçlar
                        <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                            {state.results.length}
                        </span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.results.map((group, index) => (
                    <GroupCard key={`${group.name}-${index}`} group={group} index={index} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <p className="text-xs text-gray-600">
                        Not: Listelenen gruplar yapay zeka tarafından önerilmiştir. Bağlantıların güncelliği garanti edilemez.
                        <br/>Güvenliğiniz için tanımadığınız gruplara katılırken dikkatli olun.
                    </p>
                </div>
            </div>
          )}
        </main>

        <footer className="mt-16 py-6 border-t border-gray-800 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} TeleBul. Gemini AI tarafından desteklenmektedir.</p>
        </footer>
      </div>

      {/* Info / Setup Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#182333] border border-gray-700 rounded-2xl max-w-2xl w-full shadow-2xl relative animate-slide-up flex flex-col my-8">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-telegram-darker/50 rounded-t-2xl">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Settings className="text-telegram" />
                Kurulum Rehberi
              </h3>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh]">
              
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                <p className="text-sm text-blue-300">
                  <span className="font-bold">Önemli:</span> Bu dosyalar doğrudan (kopyala-yapıştır ile) klasik hostinglerde çalışmaz. Tarayıcıların anlayacağı formata çevrilmesi (Build edilmesi) gerekir.
                </p>
              </div>

              {/* Bölüm 1: Klasik Hosting */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-purple-400" />
                  Klasik Hosting (cPanel / FTP) Kurulumu
                </h4>
                <div className="bg-gray-800/50 p-4 rounded-xl text-sm text-gray-300 space-y-3">
                  <div className="flex gap-3">
                    <span className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">1</span>
                    <p>Dosyaları bilgisayarınıza indirin ve bir klasöre koyun.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">2</span>
                    <p>
                      <strong>API Anahtarı Ayarı:</strong> <code>services/geminiService.ts</code> dosyasını not defteri ile açın. 
                      En üstteki <code>MANUAL_KEY = ""</code> satırını bulun ve anahtarınızı tırnak içine yazın.
                      <br/><span className="text-gray-500 text-xs">(Örn: MANUAL_KEY = "AIzaSy...")</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">3</span>
                    <p>Terminali açıp sırasıyla şu komutları yazın (Node.js kurulu olmalı):</p>
                  </div>
                  <div className="ml-9 bg-black/30 p-2 rounded font-mono text-green-400 text-xs">
                    npm install<br/>
                    npm run build
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-gray-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">4</span>
                    <p>Oluşan <strong>dist</strong> klasörünün içindeki tüm dosyaları hostinginize (public_html) yükleyin.</p>
                  </div>
                </div>
              </div>

              {/* Bölüm 2: Kolay Yöntem */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-400" />
                  Kolay Yöntem (Vercel/Netlify)
                </h4>
                <div className="bg-gray-800/50 p-4 rounded-xl text-sm text-gray-300">
                  <p className="mb-2">Build ile uğraşmak istemiyorsanız:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-1 text-gray-400">
                    <li>Kodları GitHub'a yükleyin.</li>
                    <li>Vercel.com'a gidip projeyi seçin.</li>
                    <li>Ayarlardan <strong>Environment Variables</strong> kısmına <code>API_KEY</code> ekleyin.</li>
                    <li>Vercel otomatik build alıp yayınlayacaktır.</li>
                  </ol>
                </div>
              </div>

              {/* API Key Bilgisi */}
              <div className="bg-telegram/10 border border-telegram/20 p-4 rounded-xl flex gap-3">
                <Key className="w-5 h-5 text-telegram flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-gray-200 font-medium">API Anahtarı Nedir?</p>
                  <p className="text-gray-400 mt-1">
                    Google AI Studio (aistudio.google.com) adresinden alacağınız "Gemini API Key"dir. Uygulamanın yapay zekayı kullanabilmesi için şarttır.
                  </p>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-700 bg-gray-800/30 rounded-b-2xl">
              <button 
                onClick={() => setShowInfo(false)}
                className="w-full bg-telegram hover:bg-telegram-dark text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-telegram/20"
              >
                Anlaşıldı
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;