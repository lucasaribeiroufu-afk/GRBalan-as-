import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings, openWhatsApp } = useApp();

  return (
    <section className="py-16 bg-white border-b border-slate-200" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-5 shadow-sm overflow-hidden">
              
              {/* Logo recreation badge */}
              <div className="flex items-center justify-center p-8 bg-white rounded-xl border border-slate-200 mb-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-16 h-16 bg-slate-900 border border-slate-800 rounded-xl shadow-md">
                    <span className="font-extrabold text-4xl tracking-tighter text-white font-mono">G</span>
                    <span className="font-extrabold text-4xl tracking-tighter text-orange-500 font-mono -ml-1">R</span>
                    <div className="absolute -bottom-1 w-6 h-1 bg-orange-500 rounded-full"></div>
                  </div>
                  <div>
                    <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 block">
                      GR
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-slate-500">
                      Instrumentos de Pesagem
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider font-mono">
                    Conformidade Metrológica
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    Equipamentos aprovados e certificados com selo do INMETRO para atender as exigências técnicas da sua empresa.
                  </p>
                </div>
              </div>

              {/* Location pin */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600 px-3.5 py-2.5 bg-white rounded-lg border border-slate-200 font-mono">
                <span className="flex items-center gap-1.5 text-slate-800 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  {settings.cityState}
                </span>
                <span className="text-slate-500">Fábrica & Atendimento</span>
              </div>

            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
                Institucional & Histórico
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                QUEM SOMOS
              </h2>
            </div>

            {/* Official copy from original company website */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Uma empresa especializada em soluções de pesagem agrícola, industrial e comercial, primando pela excelência e qualidade de nossos produtos. Possuímos uma variedade de produtos aprovados e certificados com selo do INMETRO para atender sua melhor escolha e necessidade.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900">Atuação Técnica:</strong> Fornecimento de balanças de plataforma de 300kg a 5.000kg, sistemas móveis de pesagem por sapatas de até 40 toneladas, balanças pecuárias para gado, balanças paleteiras e balanças suspensas para guindastes.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900">Robustez Estrutural:</strong> Chapas xadrez antiderrapantes de 3 mm em aço carbono de alta durabilidade, projetadas para tráfego contínuo e ambientes severos.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-900">Atendimento Consultivo:</strong> Suporte direto com especialistas para dimensionar a capacidade, dimensões de plataforma e módulos ideais para cada cliente.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openWhatsApp('Olá! Gostaria de conversar com a equipe comercial da GR Instrumentos de Pesagem.')}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </button>

              <span className="text-xs text-slate-500 font-mono">
                {settings.whatsappFormatted} • {settings.cityState}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
