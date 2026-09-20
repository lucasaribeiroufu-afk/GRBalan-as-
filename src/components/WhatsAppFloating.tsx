import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const { openWhatsApp, settings } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2" id="whatsapp-floating-container">
      {/* Balloon popup */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-white border border-emerald-200 text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <div>
            <p className="font-bold text-emerald-800">Atendimento Técnico Online</p>
            <p className="text-slate-500 text-[11px]">Tire dúvidas sobre modelos e capacidades</p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            className="text-slate-400 hover:text-slate-700 ml-1 p-0.5"
            title="Fechar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => openWhatsApp('Olá! Estou no site da GR Instrumentos de Pesagem e gostaria de falar com um especialista sobre orçamentos.')}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white"
        title={`Chamar no WhatsApp: ${settings.whatsappFormatted}`}
        id="btn-floating-whatsapp"
      >
        <span className="sr-only">WhatsApp GR Instrumentos de Pesagem</span>
        <MessageCircle className="w-7 h-7 fill-white/20" />
        
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-pulse pointer-events-none"></span>
      </button>
    </div>
  );
};
