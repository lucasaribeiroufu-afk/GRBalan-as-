import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, Check, ArrowRight, RotateCcw, MessageCircle, Scale } from 'lucide-react';

export const ScaleFinderWizard: React.FC = () => {
  const { products, openProductDetail, openWhatsApp } = useApp();

  const [step, setStep] = useState(1);
  const [itemType, setItemType] = useState<string>('');
  const [weightRange, setWeightRange] = useState<string>('');
  const [mobility, setMobility] = useState<string>('');
  const [environment, setEnvironment] = useState<string>('');

  const restart = () => {
    setStep(1);
    setItemType('');
    setWeightRange('');
    setMobility('');
    setEnvironment('');
  };

  // Recommendations matching
  const getRecommendedProducts = () => {
    return products.filter((p) => {
      if (itemType === 'veiculos' || itemType === 'caminhoes') {
        return p.category.includes('Sapata');
      }
      if (itemType === 'animais' || itemType === 'gado') {
        return p.category.includes('Gado');
      }
      if (itemType === 'pallets' && mobility === 'movel') {
        return p.category.includes('Paleteira');
      }
      if (weightRange === '300kg') {
        return p.capacity.includes('300 kg');
      }
      if (weightRange === '40t' || weightRange === '32t') {
        return p.category.includes('Sapata');
      }
      if (weightRange === '3000kg') {
        return p.category.includes('Plataforma') || p.category.includes('Paleteira');
      }
      return p.isFeatured;
    }).slice(0, 3);
  };

  return (
    <section className="py-16 bg-slate-50/80 border-b border-slate-200 relative overflow-hidden" id="scale-finder-wizard">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 font-mono mb-2 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>Consultor Virtual de Pesagem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            QUAL BALANÇA VOCÊ PRECISA?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Responda 3 perguntas rápidas e nosso sistema indicará o equipamento com a configuração técnica ideal.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
              <span className="text-orange-600">ETAPA {step} DE 4</span>
              <span>•</span>
              <span>{step === 1 ? 'Tipo de Carga' : step === 2 ? 'Faixa de Peso' : step === 3 ? 'Mobilidade' : 'Recomendações'}</span>
            </div>

            {step > 1 && (
              <button
                onClick={restart}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-orange-600 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recomeçar</span>
              </button>
            )}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                1. O que você precisa pesar na sua rotina?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { id: 'pallets', label: 'Pallets e Big Bags industriais' },
                  { id: 'veiculos', label: 'Caminhões, carretas e eixos rodoviários' },
                  { id: 'animais', label: 'Gado, bovinos, equinos ou rebanho' },
                  { id: 'cargas', label: 'Volumes médios, caixas e tambores' },
                  { id: 'suspensa', label: 'Cargas suspensas por guindaste / talha' },
                  { id: 'pequenos', label: 'Volumes menores até 300 kg' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setItemType(opt.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl text-left border text-sm font-semibold transition-all flex items-center justify-between ${
                      itemType === opt.id
                        ? 'bg-orange-50 border-orange-500 text-orange-950 ring-1 ring-orange-500'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-orange-600 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                2. Qual o peso máximo aproximado das suas cargas?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: '300kg', label: 'Até 300 kg (Bancada ou expedição rápida)' },
                  { id: '3000kg', label: 'Até 3.000 kg (3 Toneladas - Pallets, Big Bags ou Gado)' },
                  { id: '32t', label: 'Até 32 Toneladas (Tratores, caminhões toco e truck)' },
                  { id: '40t', label: 'Até 40 Toneladas (Caminhões pesados, bitrens e carretas)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setWeightRange(opt.id);
                      setStep(3);
                    }}
                    className={`p-4 rounded-xl text-left border text-sm font-semibold transition-all flex items-center justify-between ${
                      weightRange === opt.id
                        ? 'bg-orange-50 border-orange-500 text-orange-950 ring-1 ring-orange-500'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-orange-600 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                3. A balança ficará em local fixo ou precisará de mobilidade?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'fixa', label: 'Fixa no chão (Plataforma instalada no galpão ou pátio)' },
                  { id: 'movel', label: 'Móvel / Portátil (Transportar entre lavouras, docas ou fazendas)' },
                  { id: 'paleteira', label: 'Integrada à paleteira hidráulica (pese enquanto desloca)' },
                  { id: 'suspensa', label: 'Suspensa em gancho para içamento de carga' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setMobility(opt.id);
                      setStep(4);
                    }}
                    className={`p-4 rounded-xl text-left border text-sm font-semibold transition-all flex items-center justify-between ${
                      mobility === opt.id
                        ? 'bg-orange-50 border-orange-500 text-orange-950 ring-1 ring-orange-500'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <Check className="w-4 h-4 text-orange-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATIONS */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    Diagnóstico Concluído com Sucesso!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Com base nas especificações da sua carga e rotina, selecionamos as soluções mais recomendadas:
                  </p>
                </div>
              </div>

              {/* Recommended products list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getRecommendedProducts().map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-orange-500/50 hover:shadow-md transition-all"
                  >
                    <div>
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-full h-36 object-cover rounded-lg bg-slate-100 mb-3 border border-slate-200"
                      />
                      <span className="text-[10px] text-orange-600 font-mono font-bold block">
                        {prod.capacity} • {prod.dimensions}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">
                        {prod.name}
                      </h5>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-slate-900 font-mono">
                          R$ {prod.price.toLocaleString('pt-BR')}
                        </span>
                        {prod.inmetroCertified && (
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold border border-emerald-200">
                            INMETRO
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => openProductDetail(prod)}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold py-2 rounded-lg transition-colors"
                      >
                        Ver Detalhes do Modelo
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom consult action */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-600 text-center sm:text-left">
                  Deseja validar esta recomendação com a equipe técnica da GR Instrumentos de Pesagem?
                </p>

                <button
                  onClick={() => openWhatsApp(`Olá! Realizei o diagnóstico no site: Preciso pesar ${itemType} na faixa de ${weightRange} (${mobility}). Gostaria da indicação técnica de vocês.`)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Validar com Especialista no WhatsApp</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
