import React from 'react';
import { useApp } from '../context/AppContext';
import { Factory, Wheat, Truck, Warehouse, Beef, ArrowRight, CheckCircle } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const { navigateTo, openWhatsApp } = useApp();

  const solutions = [
    {
      id: 'agronegocio',
      icon: <Wheat className="w-6 h-6 text-orange-600" />,
      name: 'AGRONEGÓCIO & SAFRA',
      problem: 'Dificuldade de controle de peso na colheita e custos proibitivos de balanças rodoviárias de concreto fixas.',
      solution: 'Sapatas pesadoras móveis de 32 a 40 toneladas para pesagem de eixos em caminhões e implementos agrícolas diretamente na lavoura ou silo.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      actionQuery: 'sapatas',
    },
    {
      id: 'industria',
      icon: <Factory className="w-6 h-6 text-orange-600" />,
      name: 'INDÚSTRIA PESADA & MANUFATURA',
      problem: 'Empenamento de chapas sob tráfego de empilhadeiras e falta de conformidade metrológica em auditorias.',
      solution: 'Balanças de plataforma com chapa xadrez antiderrapante de 3 mm, 4 células de carga blindadas IP67 e selo do INMETRO.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      actionQuery: 'plataforma',
    },
    {
      id: 'pecuaria',
      icon: <Beef className="w-6 h-6 text-orange-600" />,
      name: 'PECUÁRIA & MANEJO BOVINO',
      problem: 'Estresse animal durante a pesagem e leituras oscilantes no tronco de contenção.',
      solution: 'Barras de pesagem eletrônica com algoritmo de estabilização rápida para animais inquietos e conexão a baterias de alta autonomia.',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
      actionQuery: 'gado',
    },
    {
      id: 'logistica',
      icon: <Warehouse className="w-6 h-6 text-orange-600" />,
      name: 'LOGÍSTICA & ARMAZENAGEM',
      problem: 'Gargalos no cross-docking e tempo perdido levando pallets até balanças distantes.',
      solution: 'Balanças paleteiras de até 3.000 kg para conferência instantânea na doca no ato da movimentação.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      actionQuery: 'paleteira',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200" id="solutions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
            Aplicações Especializadas
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            SOLUÇÕES PARA SUA OPERAÇÃO
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Equipamentos de alta tecnologia desenvolvidos para os desafios específicos de cada setor produtivo.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-200 hover:border-orange-500/50 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all group hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-orange-100 border border-orange-200">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide font-mono">
                    {item.name}
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="text-orange-700 font-bold block text-[11px] uppercase tracking-wider">Desafio:</span>
                    <p className="text-slate-700 mt-0.5">{item.problem}</p>
                  </div>

                  <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                    <span className="text-emerald-800 font-bold block text-[11px] uppercase tracking-wider">Solução GR:</span>
                    <p className="text-emerald-950 mt-0.5">{item.solution}</p>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => navigateTo('products')}
                  className="text-xs font-bold text-orange-600 group-hover:text-orange-700 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Ver Balanças Deste Setor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openWhatsApp(`Olá! Gostaria de entender mais sobre as soluções de pesagem da GR para o segmento de ${item.name}.`)}
                  className="text-xs text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors font-medium shadow-xs"
                >
                  Consultar Engenharia
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
