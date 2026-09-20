import React from 'react';
import { useApp } from '../context/AppContext';
import { Wrench, CheckCircle, Shield, Cog, FileCheck, PhoneCall } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { openWhatsApp } = useApp();

  const services = [
    {
      icon: <FileCheck className="w-6 h-6 text-orange-600" />,
      title: 'Aferição & Calibração Metrológica',
      description: 'Testes de excentricidade, repetibilidade e linearidade com pesos padrão rastreados e emissão de laudo técnico de conformidade.',
    },
    {
      icon: <Wrench className="w-6 h-6 text-orange-600" />,
      title: 'Manutenção Preventiva e Corretiva',
      description: 'Inspeção de células de carga, substituição de cabos blindados, caixas de junção e reparos eletrônicos em indicadores.',
    },
    {
      icon: <Cog className="w-6 h-6 text-orange-600" />,
      title: 'Projetos e Dimensões Especiais',
      description: 'Fabricação sob medida de plataformas com chapas reforçadas, rampas de acesso personalizadas e estruturas sob encomenda.',
    },
    {
      icon: <Shield className="w-6 h-6 text-orange-600" />,
      title: 'Orientação Técnica & Instalação',
      description: 'Acompanhamento na preparação do piso nivelado, montagem e teste de carga em fábrica ou local de operação.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Suporte de Engenharia
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              SERVIÇOS & ASSISTÊNCIA TÉCNICA
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Garantia de operação ininterrupta e confiabilidade metrológica permanente para os seus equipamentos de pesagem.
            </p>
          </div>

          <button
            onClick={() => openWhatsApp('Olá! Gostaria de solicitar atendimento de assistência técnica ou calibração de balanças.')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all self-start md:self-auto shadow-xs"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Falar com Assistência Técnica</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-orange-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all shadow-xs hover:shadow-md"
            >
              <div>
                <div className="p-3 w-fit rounded-xl bg-orange-100 border border-orange-200 mb-4">
                  {srv.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => openWhatsApp(`Olá! Preciso de atendimento para o serviço: ${srv.title}.`)}
                  className="text-xs text-orange-600 hover:text-orange-700 font-bold"
                >
                  Consultar Disponibilidade →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
