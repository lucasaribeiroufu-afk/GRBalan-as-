import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Eye, 
  ShoppingCart, 
  MessageCircle, 
  SlidersHorizontal, 
  Heart,
  Scale,
  Maximize2,
  Star
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openProductDetail, 
    addToCart, 
    openWhatsApp, 
    openQuickQuote, 
    toggleCompare, 
    isInCompare, 
    toggleWishlist, 
    isInWishlist 
  } = useApp();

  const isCompare = isInCompare(product.id);
  const isWishlist = isInWishlist(product.id);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-orange-500 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media & Badges */}
      <div className="relative w-full pt-[75%] bg-slate-50 overflow-hidden border-b border-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.inmetroCertified && (
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              <ShieldCheck className="w-3 h-3" />
              INMETRO
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">
              Destaque
            </span>
          )}
          {product.isOffer && (
            <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase">
              Oferta
            </span>
          )}
        </div>

        {/* Quick actions top right (Compare & Wishlist) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`p-1.5 rounded-full backdrop-blur-md shadow-sm border transition-colors ${
              isWishlist 
                ? 'bg-rose-600 text-white border-rose-600' 
                : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white border-slate-200'
            }`}
            title={isWishlist ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlist ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); toggleCompare(product.id); }}
            className={`p-1.5 rounded-full backdrop-blur-md shadow-sm border transition-colors ${
              isCompare 
                ? 'bg-orange-600 text-white border-orange-600' 
                : 'bg-white/90 text-slate-600 hover:text-orange-600 hover:bg-white border-slate-200'
            }`}
            title={isCompare ? 'Remover do comparador' : 'Comparar especificações'}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={() => openProductDetail(product)}
          className="absolute inset-0 m-auto w-32 h-10 bg-slate-900/90 hover:bg-orange-600 text-white text-xs font-bold rounded-lg border border-white/20 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
        >
          <Eye className="w-4 h-4" />
          <span>Ver Detalhes</span>
        </button>
      </div>

      {/* Product Body Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
            <span className="text-orange-600 font-semibold truncate max-w-[150px]">{product.category}</span>
            <span>{product.sku}</span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => openProductDetail(product)}
            className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating & Sold count badge if available */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <span className="inline-flex items-center gap-0.5 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)}
              </span>
              {product.soldCount && (
                <span className="text-[11px] text-slate-500 font-medium">
                  • {product.soldCount}
                </span>
              )}
            </div>
          )}

          {/* Key specs highlight */}
          <div className="mt-3 py-2 px-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1">
                <Scale className="w-3 h-3 text-orange-600" />
                Capacidade:
              </span>
              <span className="font-bold text-slate-900 font-mono">{product.capacity}</span>
            </div>

            {product.dimensions && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-slate-400" />
                  Dimensões:
                </span>
                <span className="font-medium text-slate-800 font-mono text-[11px] truncate max-w-[140px]">
                  {product.dimensions}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing and CTAs */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          
          {product.saleModel === 'direct' && product.price > 0 ? (
            <div className="mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-slate-900 font-mono">
                  {formatCurrency(product.promotionalPrice || product.price)}
                </span>
                {product.promotionalPrice && product.promotionalPrice < product.price && (
                  <span className="text-xs text-slate-400 line-through font-mono">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">
                em 10x de {formatCurrency((product.promotionalPrice || product.price) / 10)} sem juros
              </p>
            </div>
          ) : (
            <div className="mb-3">
              <span className="text-base font-bold text-orange-600 font-mono">
                CONSULTE O PREÇO
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Orçamento consultivo sob medida
              </p>
            </div>
          )}

          {/* Action Button Row */}
          <div className="grid grid-cols-2 gap-2">
            {product.saleModel === 'direct' ? (
              <button
                onClick={() => addToCart(product, 1)}
                className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-2.5 px-2 rounded-lg transition-colors shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>COMPRAR</span>
              </button>
            ) : (
              <button
                onClick={() => openQuickQuote(product)}
                className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-2.5 px-2 rounded-lg transition-colors shadow-sm"
              >
                <span>ORÇAMENTO</span>
              </button>
            )}

            <button
              onClick={() => openWhatsApp(`Olá! Gostaria de informações e cotação sobre a ${product.name} (SKU: ${product.sku}).`)}
              className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 border border-emerald-200 font-bold text-xs py-2.5 px-2 rounded-lg transition-colors shadow-sm"
              title="Falar no WhatsApp sobre este equipamento"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WHATSAPP</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
