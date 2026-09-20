import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, SlidersHorizontal, Trash2, ShoppingCart, MessageCircle, ShieldCheck } from 'lucide-react';

export const CompareDrawer: React.FC = () => {
  const { 
    products, 
    compareList, 
    toggleCompare, 
    clearCompare, 
    addToCart, 
    openWhatsApp, 
    openProductDetail 
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  const comparedProducts = products.filter((p) => compareList.includes(p.id));

  if (compareList.length === 0) return null;

  // Floating summary bar if products are selected but modal closed
  if (!isOpen && comparedProducts.length > 0) {
    return (
      <div className="fixed bottom-6 left-6 z-40 bg-white border border-orange-300 rounded-2xl p-3 shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom-5 text-slate-800" id="compare-floating-pill">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-orange-600" />
          <span className="text-xs font-bold text-slate-900 font-mono">
            {comparedProducts.length} {comparedProducts.length === 1 ? 'balança selecionada' : 'balanças selecionadas'}
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors shadow-xs"
        >
          Comparar Agora
        </button>
        <button
          onClick={clearCompare}
          className="text-slate-400 hover:text-rose-600 p-1"
          title="Limpar comparador"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-4 sm:p-6 flex items-center justify-center" id="compare-modal">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-6xl p-6 shadow-2xl relative max-h-[90vh] flex flex-col text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-bold text-slate-900 uppercase font-mono">
              Comparativo Técnico de Balanças
            </h2>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-mono font-bold">
              {comparedProducts.length} / 4 modelos
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Todos</span>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto flex-1 pb-4">
          <table className="w-full text-left text-xs font-mono border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 text-slate-500 uppercase w-44">Especificação</th>
                {comparedProducts.map((p) => (
                  <th key={p.id} className="p-3 text-slate-900 text-center align-top relative min-w-[200px]">
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 p-1"
                      title="Remover do comparativo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-24 h-24 object-cover mx-auto rounded-xl mb-2 bg-slate-50 border border-slate-200"
                    />
                    <span className="font-bold block line-clamp-2 text-xs text-slate-900">{p.name}</span>
                    <span className="text-[10px] text-orange-600 block mt-1 font-bold">{p.sku}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {/* Price */}
              <tr className="bg-slate-50/70">
                <td className="p-3 text-slate-600 font-bold">Investimento</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    {p.price > 0 ? (
                      <span className="text-sm font-extrabold text-slate-900">
                        R$ {(p.promotionalPrice || p.price).toLocaleString('pt-BR')}
                      </span>
                    ) : (
                      <span className="text-xs text-orange-600 font-bold">Sob Orçamento</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Capacity */}
              <tr>
                <td className="p-3 text-slate-600 font-bold">Capacidade</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center text-orange-600 font-bold">
                    {p.capacity}
                  </td>
                ))}
              </tr>

              {/* Dimensions */}
              <tr className="bg-slate-50/70">
                <td className="p-3 text-slate-600 font-bold">Dimensões</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center text-slate-700">
                    {p.dimensions || 'N/D'}
                  </td>
                ))}
              </tr>

              {/* Division */}
              <tr>
                <td className="p-3 text-slate-600 font-bold">Divisão / Escala</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center text-slate-700">
                    {p.division || 'Padrão industrial'}
                  </td>
                ))}
              </tr>

              {/* Plate Thickness */}
              <tr className="bg-slate-50/70">
                <td className="p-3 text-slate-600 font-bold">Espessura da Chapa</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center text-slate-700">
                    {p.plateThickness || 'Perfil reforçado'}
                  </td>
                ))}
              </tr>

              {/* INMETRO */}
              <tr>
                <td className="p-3 text-slate-600 font-bold">Selo INMETRO</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    {p.inmetroCertified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        CERTIFICADO
                      </span>
                    ) : (
                      <span className="text-slate-400">Calibração padrão</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Indicator */}
              <tr className="bg-slate-50/70">
                <td className="p-3 text-slate-600 font-bold">Indicador Digital</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center text-slate-700 text-[11px]">
                    {p.indicator || 'Display LED'}
                  </td>
                ))}
              </tr>

              {/* Actions row */}
              <tr>
                <td className="p-3 text-slate-600 font-bold">Ações Rápidas</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <div className="space-y-1.5">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          openProductDetail(p);
                        }}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold py-1.5 rounded-lg transition-colors border border-slate-200"
                      >
                        Ver Detalhes
                      </button>

                      {p.saleModel === 'direct' ? (
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="w-full bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Comprar</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => openWhatsApp(`Olá! Gostaria de cotar a ${p.name} (${p.sku}).`)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Cotar</span>
                        </button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
