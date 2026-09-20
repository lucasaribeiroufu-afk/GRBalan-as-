import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  ShoppingCart, 
  MessageCircle, 
  FileText, 
  ArrowLeft, 
  Scale, 
  Maximize2, 
  Layers, 
  Truck, 
  Check, 
  SlidersHorizontal,
  Share2,
  Heart,
  Star
} from 'lucide-react';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const { 
    products, 
    addToCart, 
    openWhatsApp, 
    openQuickQuote, 
    navigateTo, 
    openProductDetail,
    toggleCompare,
    isInCompare,
    toggleWishlist,
    isInWishlist 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'apps'>('specs');
  const [copied, setCopied] = useState(false);

  const isCompare = isInCompare(product.id);
  const isWishlist = isInWishlist(product.id);

  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.imageUrl];

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.capacity === product.capacity))
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigateTo('products')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Catálogo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isWishlist
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlist ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isWishlist ? 'Favoritado' : 'Favoritar'}</span>
            </button>

            <button
              onClick={() => toggleCompare(product.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isCompare
                  ? 'bg-orange-600 text-white border-orange-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">{isCompare ? 'No Comparador' : 'Comparar'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Copiar link do produto"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>
          </div>
        </div>

        {/* Main Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center group">
              <img
                src={images[activeImageIndex] || product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.inmetroCertified && (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                    <ShieldCheck className="w-4 h-4" />
                    INMETRO HOMOLOGADA
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md uppercase font-mono">
                    Linha Pesada
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx 
                        ? 'border-orange-500 scale-105 shadow-md' 
                        : 'border-slate-200 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Inmetro reassurance box */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Certificação e Selo Oficial INMETRO</span>
                <p className="text-slate-600 mt-0.5">
                  Equipamento rigorosamente calibrado e em conformidade metrológica com as normas fiscais e de auditoria industrial vigentes no Brasil.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Product Commercial Information */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-100 pb-2">
                <span className="text-orange-600 font-bold uppercase">{product.category}</span>
                <span>CÓDIGO: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating & Sold count badge */}
              {product.rating && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  {product.reviewsCount && (
                    <span className="text-slate-500 text-xs">
                      ({product.reviewsCount} {product.reviewsCount === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  )}
                  {product.soldCount && (
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                      {product.soldCount}
                    </span>
                  )}
                </div>
              )}

              {/* Short description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Key Quick Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 font-mono">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 block uppercase">Capacidade</span>
                  <span className="text-xs sm:text-sm font-bold text-orange-600">{product.capacity}</span>
                </div>

                {product.dimensions && (
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase">Dimensões</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">{product.dimensions}</span>
                  </div>
                )}

                {product.plateThickness && (
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block uppercase">Chapa</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{product.plateThickness}</span>
                  </div>
                )}
              </div>

              {/* Price block */}
              <div className="pt-4 border-t border-slate-200">
                {product.saleModel === 'direct' && product.price > 0 ? (
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                        {formatCurrency(product.promotionalPrice || product.price)}
                      </span>
                      {product.promotionalPrice && product.promotionalPrice < product.price && (
                        <span className="text-sm sm:text-base text-slate-400 line-through font-mono">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="text-emerald-700 font-bold text-sm">
                        em 10x de {formatCurrency((product.promotionalPrice || product.price) / 10)} sem juros no cartão
                      </p>
                      <p className="text-slate-600">
                        ✓ Desconto de 5% à vista no PIX | Faturamento via Boleto PJ sob consulta
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-2xl font-bold text-orange-600 font-mono">
                      EQUIPAMENTO SOB ORÇAMENTO
                    </span>
                    <p className="text-xs text-slate-600 mt-1">
                      Projeto e configuração sob medida com consultoria técnica de nossa engenharia.
                    </p>
                  </div>
                )}
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-700">
                  {product.inStock ? `Disponibilidade imediata (Estoque de fábrica: ${product.stockQuantity} unidades)` : 'Fabricação sob encomenda rápida'}
                </span>
              </div>

            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.saleModel === 'direct' ? (
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all transform active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADICIONAR AO CARRINHO</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openQuickQuote(product)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>SOLICITAR ORÇAMENTO</span>
                  </button>
                )}

                <button
                  onClick={() => openWhatsApp(`Olá! Gostaria de negociar a compra da ${product.name} (SKU: ${product.sku}). Poderiam me passar mais informações?`)}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>FALAR NO WHATSAPP</span>
                </button>
              </div>

              {/* Extra button if direct sale, can also request quote */}
              {product.saleModel === 'direct' && (
                <button
                  onClick={() => openQuickQuote(product)}
                  className="w-full text-center py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Precisa de proposta formal para compras PJ? <span className="text-orange-600 underline">Gerar Orçamento Técnico</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Tabs: Technical Specifications, Full Description, Applications */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          
          <div className="flex border-b border-slate-200 mb-6 gap-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold tracking-wider uppercase font-mono transition-colors border-b-2 -mb-[2px] ${
                activeTab === 'specs'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Especificações Técnicas
            </button>

            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-sm font-bold tracking-wider uppercase font-mono transition-colors border-b-2 -mb-[2px] ${
                activeTab === 'desc'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Descrição Completa
            </button>

            <button
              onClick={() => setActiveTab('apps')}
              className={`pb-3 text-sm font-bold tracking-wider uppercase font-mono transition-colors border-b-2 -mb-[2px] ${
                activeTab === 'apps'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Aplicações Recomendadas
            </button>
          </div>

          {/* TAB 1: SPECS TABLE */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Ficha Técnica Homologada do Equipamento
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
                  <tbody className="divide-y divide-slate-200 font-mono">
                    <tr className="bg-slate-50">
                      <td className="py-3 px-4 text-slate-600 font-semibold w-1/3">Modelo / Nome Comercial</td>
                      <td className="py-3 px-4 text-slate-900 font-bold">{product.name}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-600 font-semibold">Código SKU</td>
                      <td className="py-3 px-4 text-orange-600 font-bold">{product.sku}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-3 px-4 text-slate-600 font-semibold">Capacidade Máxima</td>
                      <td className="py-3 px-4 text-slate-900 font-bold">{product.capacity}</td>
                    </tr>
                    {product.minWeight && (
                      <tr>
                        <td className="py-3 px-4 text-slate-600 font-semibold">Carga Mínima Suportada</td>
                        <td className="py-3 px-4 text-slate-800">{product.minWeight}</td>
                      </tr>
                    )}
                    {product.dimensions && (
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 text-slate-600 font-semibold">Dimensões da Plataforma / Apoio</td>
                        <td className="py-3 px-4 text-slate-800">{product.dimensions}</td>
                      </tr>
                    )}
                    {product.plateThickness && (
                      <tr>
                        <td className="py-3 px-4 text-slate-600 font-semibold">Espessura e Tipo da Chapa</td>
                        <td className="py-3 px-4 text-slate-800">{product.plateThickness}</td>
                      </tr>
                    )}
                    {product.division && (
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 text-slate-600 font-semibold">Divisão de Escala / Precisão</td>
                        <td className="py-3 px-4 text-slate-800">{product.division}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-3 px-4 text-slate-600 font-semibold">Conformidade Metrológica</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">
                        {product.inmetroCertified ? 'Aprovado pelo INMETRO com Selo e Lacre Oficial' : 'Calibração Padrão Rastreada'}
                      </td>
                    </tr>
                    {product.indicator && (
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 text-slate-600 font-semibold">Indicador Digital</td>
                        <td className="py-3 px-4 text-slate-800">{product.indicator}</td>
                      </tr>
                    )}
                    {product.material && (
                      <tr>
                        <td className="py-3 px-4 text-slate-600 font-semibold">Estrutura e Material</td>
                        <td className="py-3 px-4 text-slate-800">{product.material}</td>
                      </tr>
                    )}
                    {product.powerSupply && (
                      <tr className="bg-slate-50">
                        <td className="py-3 px-4 text-slate-600 font-semibold">Alimentação Elétrica</td>
                        <td className="py-3 px-4 text-slate-800">{product.powerSupply}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-3 px-4 text-slate-600 font-semibold">Garantia de Fábrica</td>
                      <td className="py-3 px-4 text-slate-800">{product.warranty}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Dynamic specs if registered */}
              {product.specs && product.specs.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase font-mono mb-2">
                    Características Construtivas Adicionais:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {product.specs.map((s, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between">
                        <span className="text-slate-600">{s.label}:</span>
                        <span className="text-slate-900 font-bold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FULL DESCRIPTION */}
          {activeTab === 'desc' && (
            <div className="space-y-4 text-slate-700 text-sm leading-relaxed max-w-4xl">
              <h3 className="text-base font-bold text-slate-900">
                Visão Geral do Produto
              </h3>
              <p className="whitespace-pre-line">
                {product.fullDescription}
              </p>
            </div>
          )}

          {/* TAB 3: APPLICATIONS */}
          {activeTab === 'apps' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Segmentos e Operações Recomendadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium">
                    <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              VOCÊ TAMBÉM PODE PRECISAR
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
