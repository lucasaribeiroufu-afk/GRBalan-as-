import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, FileText, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { navigateTo, openWhatsApp, settings } = useApp();

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 relative overflow-hidden" id="final-cta-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-bold uppercase tracking-wider mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
          <span>Atendimento Comercial e Técnico Especializado</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          PRECISA DE UMA SOLUÇÃO EM PESAGEM?
        </h2>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Fale com nossa equipe e encontre o equipamento com as especificações técnicas adequadas para sua necessidade. Atendimento ágil e cotações personalizadas.
        </p>

        {/* CTAs */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('quote')}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-md transition-all transform active:scale-95"
            id="final-cta-btn-quote"
          >
            <FileText className="w-4 h-4" />
            <span>SOLICITAR ORÇAMENTO</span>
          </button>

          <button
            onClick={() => openWhatsApp('Olá! Gostaria de falar com um especialista sobre um projeto de pesagem na GR Instrumentos de Pesagem.')}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-md transition-all"
            id="final-cta-btn-whatsapp"
          >
            <Phone className="w-4 h-4" />
            <span>CHAMAR NO WHATSAPP</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 font-mono mt-6">
          WhatsApp direto: <strong className="text-slate-700">{settings.whatsappFormatted}</strong> • Entregamos para todo o Brasil
        </p>

      </div>
    </section>
  );
};
