import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  X, 
  ArrowUpDown,
  Grid3X3,
  Layers
} from 'lucide-react';

interface CatalogViewProps {
  initialCategorySlug?: string | null;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ initialCategorySlug }) => {
  const { products, categories, navigateTo } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [selectedCapacityFilter, setSelectedCapacityFilter] = useState<string>('all');
  const [onlyInmetro, setOnlyInmetro] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('relevant');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Find category name if slug selected
  const activeCategoryObj = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return categories.find((c) => c.slug === selectedCategory || c.name.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [selectedCategory, categories]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (activeCategoryObj && !p.category.toLowerCase().includes(activeCategoryObj.name.toLowerCase()) && p.category !== activeCategoryObj.name) {
          return false;
        }
      }

      // Capacity filter
      if (selectedCapacityFilter === '300kg' && !p.capacity.includes('300 kg')) return false;
      if (selectedCapacityFilter === '3000kg' && !p.capacity.includes('3.000') && !p.capacity.includes('3000')) return false;
      if (selectedCapacityFilter === 'toneladas' && !p.capacity.includes('Tonelada') && !p.capacity.includes('Ton')) return false;

      // Inmetro filter
      if (onlyInmetro && !p.inmetroCertified) return false;

      // Search keyword filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const match = 
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.capacity.toLowerCase().includes(q) ||
          p.dimensions.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.promotionalPrice || a.price) - (b.promotionalPrice || b.price);
      if (sortBy === 'price-desc') return (b.promotionalPrice || b.price) - (a.promotionalPrice || a.price);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // default relevant
    });
  }, [products, selectedCategory, activeCategoryObj, selectedCapacityFilter, onlyInmetro, searchFilter, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCapacityFilter('all');
    setOnlyInmetro(false);
    setSearchFilter('');
    setSortBy('relevant');
  };

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumbs & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-slate-900">Início</button>
            <span>/</span>
            <button onClick={() => setSelectedCategory('all')} className="hover:text-slate-900">Produtos</button>
            {activeCategoryObj && (
              <>
                <span>/</span>
                <span className="text-orange-600 font-bold">{activeCategoryObj.name}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {activeCategoryObj ? activeCategoryObj.name : 'Catálogo de Balanças Industriais e Agrícolas'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
            {activeCategoryObj 
              ? activeCategoryObj.shortDescription 
              : 'Equipamentos de alta precisão com estrutura reforçada em chapa xadrez, células de carga blindadas e aprovação metrológica INMETRO.'}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input inside Catalog */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por 3000 kg, 150x150, truck..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 shadow-sm"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-orange-500 shadow-sm"
              >
                <option value="all">Todas as Categorias</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Capacity Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedCapacityFilter}
                onChange={(e) => setSelectedCapacityFilter(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-orange-500 shadow-sm"
              >
                <option value="all">Qualquer Capacidade</option>
                <option value="300kg">Até 300 kg</option>
                <option value="3000kg">Até 3.000 kg (3T)</option>
                <option value="toneladas">Grandes Cargas (32T a 40T)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3 flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-orange-500 shadow-sm"
                >
                  <option value="relevant">Mais Relevantes</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name">Ordem Alfabética</option>
                </select>
              </div>
            </div>

          </div>

          {/* Secondary Quick Toggles & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 select-none font-medium">
                <input
                  type="checkbox"
                  checked={onlyInmetro}
                  onChange={(e) => setOnlyInmetro(e.target.checked)}
                  className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Somente com Selo INMETRO
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-mono">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}
              </span>

              {(selectedCategory !== 'all' || selectedCapacityFilter !== 'all' || onlyInmetro || searchFilter) && (
                <button
                  onClick={clearAllFilters}
                  className="text-orange-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Limpar Filtros</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">Nenhum equipamento encontrado</h3>
            <p className="text-xs text-slate-600 mt-1">
              Tente ajustar os filtros de capacidade ou remover termos da busca para ver mais modelos.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Ver Todos os Produtos
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
