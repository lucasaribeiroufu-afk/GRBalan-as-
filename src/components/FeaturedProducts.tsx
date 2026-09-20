import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, navigateTo } = useApp();
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'Todos os Destaques' },
    { id: 'plataforma', label: 'Plataformas e Piso' },
    { id: 'sapatas', label: 'Sapatas e Eixos' },
    { id: 'gado', label: 'Pecuária & Gado' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedTab === 'all') return p.isFeatured || p.isOffer;
    if (selectedTab === 'plataforma') return p.category.includes('Plataforma');
    if (selectedTab === 'sapatas') return p.category.includes('Sapata');
    if (selectedTab === 'gado') return p.category.includes('Gado') || p.category.includes('Paleteira');
    return true;
  });

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 font-mono mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Equipamentos em Destaque</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              BALANÇAS COM SELO INMETRO E ALTA CAPACIDADE
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Modelos com pronta entrega ou fabricação sob encomenda, com estrutura reforçada e calibração oficial.
            </p>
          </div>

          <button
            onClick={() => navigateTo('products')}
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors self-start md:self-auto"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedTab === tab.id
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
