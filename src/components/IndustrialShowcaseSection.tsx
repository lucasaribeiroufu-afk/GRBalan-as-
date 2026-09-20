import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Gauge, Layers } from 'lucide-react';

export const IndustrialShowcaseSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="relative py-20 bg-slate-900 border-b border-slate-800 overflow-hidden text-white" id="industrial-showcase">
      {/* Background Cinematic Visual with dark contrast to showcase industrial scales */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/balanca-plataforma-150.jpg"
          alt="Balança Industrial em Operação GR"
          className="w-full h-full object-cover object-center opacity-15 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-widest mb-6">
            <Gauge className="w-3.5 h-3.5" />
            <span>Engenharia de Pesagem de Alta Performance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            MAIS DO QUE UMA BALANÇA.<br />
            <span className="text-orange-500">
              UMA SOLUÇÃO PARA SUA OPERAÇÃO.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mt-4 font-normal leading-relaxed">
            Equipamentos de pesagem adequados às necessidades do seu processo produtivo com suporte metrológico completo, chapas xadrez de 3 mm e conformidade INMETRO garantida.
          </p>

          <div className="pt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('products')}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>ENCONTRAR MINHA SOLUÇÃO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => navigateTo('quote')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all"
            >
              Solicitar Proposta Comercial
            </button>
          </div>

          {/* Key Metric indicators */}
          <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-slate-800">
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-white font-mono">100%</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Padrão Metrológico</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-orange-400 font-mono">3mm</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Chapa Xadrez</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">40T</span>
              <span className="text-xs text-slate-400 uppercase tracking-wide">Capacidade Máxima</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
