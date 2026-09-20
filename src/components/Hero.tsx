import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, MessageCircle, Scale, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo, openWhatsApp } = useApp();

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-8 pb-16 lg:pt-14 lg:pb-20">
      
      {/* Subtle Engineering Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>GR Instrumentos de Pesagem • Uberlândia - MG</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                PRECISÃO PARA PESAR.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600">
                  ROBUSTEZ PARA PRODUZIR.
                </span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed pt-2">
                Soluções em instrumentos de pesagem para indústria, agronegócio, logística, comércio e operações profissionais com certificação e selo do INMETRO.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={() => navigateTo('products')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                <span>VER PRODUTOS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openWhatsApp('Olá! Gostaria de falar com um especialista sobre os equipamentos de pesagem da GR.')}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-5 py-3.5 rounded-xl transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>FALAR NO WHATSAPP</span>
              </button>
            </div>

            {/* Sub-bullet as instructed */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
              <span className="text-orange-600 font-bold">Equipamentos</span>
              <span>•</span>
              <span className="text-slate-700">Soluções Industriais</span>
              <span>•</span>
              <span className="text-slate-700">Atendimento Especializado</span>
            </div>

            {/* Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 w-full">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">Aprovação INMETRO</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">Chapa xadrez 3 mm</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-medium">Até 40 Toneladas</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Equipment Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-white border border-slate-200 p-3 shadow-xl overflow-hidden group">
              
              {/* Top technical header bar on visual */}
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 mb-3 text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1.5 text-orange-600 font-semibold">
                  <Activity className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                  SÉRIE INDUSTRIAL GR
                </span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300 font-semibold">
                  CALIBRADA & SELADA
                </span>
              </div>

              {/* Main equipment imagery */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <img
                  src="/images/balanca-plataforma-150.jpg"
                  alt="Balança de Plataforma e Piso Industrial GR"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Tech overlay card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Floating telemetry tags */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-lg flex items-center justify-between text-xs shadow-md">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-orange-600 block font-mono">
                      Balança de Plataforma / Piso
                    </span>
                    <span className="font-bold text-slate-900 text-sm">3.000 Kg • 150x150 cm</span>
                  </div>
                  <button
                    onClick={() => navigateTo('products')}
                    className="bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
                  >
                    <span>Conferir</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Secondary micro specs */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center font-mono">
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-500 block uppercase">Capacidade</span>
                  <span className="text-xs font-bold text-slate-900">Até 40 Ton</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-500 block uppercase">Estrutura</span>
                  <span className="text-xs font-bold text-orange-600">Aço Carbono</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-500 block uppercase">Metrologia</span>
                  <span className="text-xs font-bold text-emerald-700">INMETRO</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
