import React from 'react';
import { useApp } from '../context/AppContext';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const { settings, openInstagram } = useApp();

  const posts = [
    {
      id: 1,
      image: '/images/balanca-plataforma-150.jpg',
      caption: 'Entrega técnica de Balança de Plataforma 150x150cm 3000kg com chapa xadrez 3mm e selo INMETRO para centro logístico.',
      tag: '#balancaindustrial',
    },
    {
      id: 2,
      image: '/images/balanca-sapata-40t.jpg',
      caption: 'Balança de 6 Sapatas Móveis 40 Toneladas em teste de pesagem de caminhão bitrem na safra de grãos.',
      tag: '#agronegocio',
    },
    {
      id: 3,
      image: '/images/balanca-gado-barras.jpg',
      caption: 'Barras de pesagem eletrônica instaladas sob tronco de contenção para manejo pecuário de bovinos.',
      tag: '#pecuaria',
    },
    {
      id: 4,
      image: '/images/balanca-paleteira-3000kg.jpg',
      caption: 'Balança Paleteira 3000kg em expedição: agilidade para pesar e transportar pallets na mesma operação.',
      tag: '#logistica',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="instagram-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600 font-mono mb-1">
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>{settings.instagramHandle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ACOMPANHE A GR NO INSTAGRAM
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Confira fotos de entregas, fabricação de balanças industriais, testes de carga e rotina com clientes.
            </p>
          </div>

          <button
            onClick={openInstagram}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all self-start sm:self-auto"
            id="instagram-btn-follow"
          >
            <Instagram className="w-4 h-4" />
            <span>SEGUIR NO INSTAGRAM</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={openInstagram}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-pink-400 cursor-pointer shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover overlay with Instagram icons */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                  <div className="flex items-center gap-1 text-xs font-bold bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full">
                    <Heart className="w-4 h-4 fill-white text-white" />
                    <span>Ver no Instagram</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-pink-600 font-mono font-medium">
                  <span>{post.tag}</span>
                  <span className="text-slate-400 font-sans">@grinstrumentos</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
