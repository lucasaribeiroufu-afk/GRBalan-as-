import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, ShoppingCart, ArrowLeft, MessageCircle, CreditCard, QrCode, FileText, Phone } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { cart, cartTotal, createOrder, navigateTo, openWhatsApp } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    document: '',
    company: '',
    email: '',
    whatsapp: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: 'MG',
    zipCode: '',
    paymentMethod: 'pix' as 'pix' | 'credit_card' | 'bank_slip',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const order = await createOrder({
        customerName: formData.customerName,
        document: formData.document,
        company: formData.company,
        email: formData.email,
        whatsapp: formData.whatsapp,
        phone: formData.phone,
        address: {
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        items: cart.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          quantity: i.quantity,
          unitPrice: i.product.promotionalPrice || i.product.price,
          subtotal: (i.product.promotionalPrice || i.product.price) * i.quantity,
        })),
        subtotal: cartTotal,
        shippingCost: 0,
        total: cartTotal,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      });

      setCompletedOrder(order);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="py-16 bg-slate-50 min-h-screen text-slate-800" id="checkout-completed">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pedido Registrado com Sucesso!
            </h1>

            <p className="text-sm text-slate-600">
              Número do Pedido: <strong className="text-orange-600 font-mono text-base">{completedOrder.code}</strong>
            </p>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Cliente:</span>
                <span className="text-slate-900 font-bold">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total:</span>
                <span className="text-emerald-700 font-bold">{formatCurrency(completedOrder.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Forma de Pagamento:</span>
                <span className="text-slate-900 uppercase font-semibold">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-amber-700 font-bold">Aguardando Pagamento / Confirmação</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Um representante da GR Instrumentos de Pesagem entrará em contato pelo WhatsApp informado para emissão de Nota Fiscal e despacho com transportadora.
            </p>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => openWhatsApp(`Olá! Acabei de finalizar o pedido ${completedOrder.code} no valor de ${formatCurrency(completedOrder.total)} e gostaria de agilizar o faturamento/pagamento.`)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-xs transition-all"
                id="checkout-whatsapp-btn"
              >
                <Phone className="w-4 h-4" />
                <span>Confirmar Pedido pelo WhatsApp</span>
              </button>

              <button
                onClick={() => navigateTo('home')}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Voltar à Página Inicial
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen text-center text-slate-800">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Não há itens para finalizar compra</h2>
          <p className="text-xs text-slate-500">
            Adicione uma balança ao carrinho para preencher seus dados de faturamento e entrega.
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            Ver Balanças no Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen text-slate-800" id="checkout-view-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <button
          onClick={() => navigateTo('products')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-orange-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continuar Comprando</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Finalização de Pedido • GR Instrumentos de Pesagem
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT 7 COLS: Form details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Buyer info */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider border-b border-slate-100 pb-2">
                  1. Dados do Cliente / Faturamento
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">CPF ou CNPJ *</label>
                    <input
                      type="text"
                      required
                      value={formData.document}
                      onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Empresa / Razão Social</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">E-mail para NFe *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">WhatsApp de Contato *</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Telefone Fixo</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider border-b border-slate-100 pb-2">
                  2. Endereço de Entrega / Despacho
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">CEP *</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Rua / Rodovia / Logradouro *</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Número *</label>
                    <input
                      type="text"
                      required
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Bairro *</label>
                    <input
                      type="text"
                      required
                      value={formData.neighborhood}
                      onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Complemento</label>
                    <input
                      type="text"
                      value={formData.complement}
                      onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Cidade *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Estado *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    >
                      {['MG', 'SP', 'GO', 'MT', 'MS', 'PR', 'RS', 'SC', 'BA', 'RJ', 'ES', 'DF', 'TO', 'PA', 'MA'].map((uf) => (
                        <option key={uf} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider border-b border-slate-100 pb-2">
                  3. Modalidade de Pagamento
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'pix'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <QrCode className="w-5 h-5 text-emerald-600" />
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">5% OFF</span>
                    </div>
                    <span className="text-xs font-bold block">PIX Instantâneo</span>
                    <span className="text-[11px] text-slate-500 mt-1">Aprovação imediata</span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'credit_card'
                        ? 'bg-orange-50 border-orange-500 text-orange-950 ring-1 ring-orange-500'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-orange-600" />
                      <span className="text-[10px] text-slate-500 font-mono">12x</span>
                    </div>
                    <span className="text-xs font-bold block">Cartão de Crédito</span>
                    <span className="text-[11px] text-slate-500 mt-1">Parcelamento até 12x</span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'bank_slip' })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'bank_slip'
                        ? 'bg-blue-50 border-blue-500 text-blue-950 ring-1 ring-blue-500'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">PJ</span>
                    </div>
                    <span className="text-xs font-bold block">Boleto Faturado</span>
                    <span className="text-[11px] text-slate-500 mt-1">Para empresas com CNPJ</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-mono mb-1">Observações para Transporte ou Faturamento</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Instruções de descarga, contato na obra/fazenda, etc."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                  ></textarea>
                </div>
              </div>

            </div>

            {/* RIGHT 5 COLS: Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-28 space-y-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider border-b border-slate-100 pb-2">
                  Resumo do Pedido
                </h3>

                {/* Items */}
                <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block truncate max-w-[200px]">{item.product.name}</span>
                        <span className="text-slate-500">{item.quantity} un. x {formatCurrency(item.product.promotionalPrice || item.product.price)}</span>
                      </div>
                      <span className="font-bold text-slate-900 font-mono">
                        {formatCurrency((item.product.promotionalPrice || item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-slate-200 pt-4 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="text-slate-900 font-bold">{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Frete / Transporte:</span>
                    <span className="text-emerald-700 font-bold">A combinar (Sob consulta)</span>
                  </div>
                  <div className="flex justify-between text-base text-slate-900 font-bold pt-2 border-t border-slate-100">
                    <span>Total:</span>
                    <span className="text-orange-600 text-xl">{formatCurrency(cartTotal)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all text-sm disabled:opacity-50"
                  id="checkout-confirm-btn"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>{isSubmitting ? 'REGISTRANDO PEDIDO...' : 'CONFIRMAR E GERAR PEDIDO'}</span>
                </button>

                <div className="text-[11px] text-slate-500 text-center space-y-1">
                  <p>Equipamentos calibrados com certificado de fábrica.</p>
                  <p className="text-emerald-700 font-medium">Nota Fiscal Eletrônica e Garantia Inclusas.</p>
                </div>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
