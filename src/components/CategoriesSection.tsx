import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Layers } from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const { categories, openCategory } = useApp();

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 font-mono mb-2">
              <Layers className="w-4 h-4" />
              <span>Categorias Especializadas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              ENCONTRE A SOLUÇÃO IDEAL PARA SUA OPERAÇÃO
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Navegue pelas principais linhas de balanças e equipamentos fabricados com alto rigor metrológico e conformidade técnica.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => openCategory(category.slug)}
              className="group relative bg-white border border-slate-200 hover:border-orange-500 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Background Thumbnail Image with Gradient */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>

                {/* Badge count */}
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-mono font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {category.itemCount} modelos
                </span>
              </div>

              {/* Content Box */}
              <div className="p-5 flex-1 flex flex-col justify-between -mt-6 relative z-10 bg-white">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {category.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-orange-600 group-hover:text-orange-700">
                  <span>VER PRODUTOS</span>
                  <div className="w-7 h-7 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
