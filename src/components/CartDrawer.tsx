import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartTotal, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    navigateTo,
    openWhatsApp 
  } = useApp();

  if (!isCartOpen) return null;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-modal">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between text-slate-800">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-orange-600" />
              <h2 className="text-base font-bold text-slate-900 uppercase font-mono">
                Carrinho de Compras
              </h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-mono font-bold">
                {cart.length}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex gap-3 relative"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-white border border-slate-200 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] text-orange-600 font-mono block">
                      {item.product.capacity} • {item.product.sku}
                    </span>
                    <span className="text-xs font-bold text-slate-900 font-mono mt-1 block">
                      {formatCurrency(item.product.promotionalPrice || item.product.price)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="text-slate-500 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 font-mono px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="text-slate-500 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 text-xs transition-colors p-1"
                        title="Remover produto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">Seu carrinho está vazio</h3>
                <p className="text-xs text-slate-500">
                  Navegue pelo catálogo e adicione os equipamentos de pesagem desejados.
                </p>
                <button
                  onClick={() => { setIsCartOpen(false); navigateTo('products'); }}
                  className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs"
                >
                  Ver Balanças no Catálogo
                </button>
              </div>
            )}
          </div>

          {/* Footer: Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Frete / Logística:</span>
                  <span className="text-orange-600 font-medium">Sob consulta (Transportadora)</span>
                </div>
                <div className="flex justify-between text-sm text-slate-900 pt-2 border-t border-slate-200 font-bold">
                  <span>Total Estimado:</span>
                  <span className="text-orange-600 text-base">{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-xl shadow-xs transition-all text-sm"
                  id="cart-btn-checkout"
                >
                  <span>FINALIZAR PEDIDO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const itemsDesc = cart.map((i) => `${i.quantity}x ${i.product.name}`).join('; ');
                    openWhatsApp(`Olá! Gostaria de negociar os itens do meu carrinho: ${itemsDesc}. Total: ${formatCurrency(cartTotal)}.`);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-700 border border-emerald-300 font-semibold py-2.5 px-4 rounded-xl transition-all text-xs shadow-2xs"
                  id="cart-btn-whatsapp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Comprar Diretamente no WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra protegida com garantia de fábrica GR</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
