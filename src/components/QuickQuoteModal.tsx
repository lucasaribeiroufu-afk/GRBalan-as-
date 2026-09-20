import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileText, MessageCircle, CheckCircle, ShieldCheck, Phone } from 'lucide-react';

export const QuickQuoteModal: React.FC = () => {
  const { isQuickQuoteOpen, quickQuoteProduct, closeQuickQuote, submitQuote, openWhatsApp } = useApp();

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isQuickQuoteOpen || !quickQuoteProduct) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitQuote({
        name,
        company,
        whatsapp,
        email,
        city,
        state: 'MG',
        productId: quickQuoteProduct.id,
        productName: quickQuoteProduct.name,
        category: quickQuoteProduct.category,
        quantity,
        desiredCapacity: quickQuoteProduct.capacity,
        message: message || `Solicito cotação comercial para ${quantity}x ${quickQuoteProduct.name}.`,
      });
      setIsDone(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsDone(false);
    closeQuickQuote();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-4 flex items-center justify-center" id="quick-quote-modal">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative text-slate-800">
        
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Cotação Solicitada!
            </h3>
            
            <p className="text-xs text-slate-600">
              Recebemos seu pedido de proposta para <strong className="text-slate-900">{quickQuoteProduct.name}</strong>. Nossa equipe técnica entrará em contato em instantes.
            </p>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  handleClose();
                  openWhatsApp(`Olá! Acabei de solicitar cotação no site para ${quantity}x ${quickQuoteProduct.name} (${quickQuoteProduct.sku}) e gostaria de agilizar pelo WhatsApp.`);
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Agilizar Atendimento no WhatsApp</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full text-xs text-slate-500 hover:text-slate-800 py-2 font-medium"
              >
                Fechar janela
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <img
                src={quickQuoteProduct.imageUrl}
                alt={quickQuoteProduct.name}
                className="w-14 h-14 object-cover rounded-xl bg-slate-50 border border-slate-200"
              />
              <div>
                <span className="text-[10px] text-orange-600 font-mono font-bold uppercase">
                  Cotação Comercial Direta
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {quickQuoteProduct.name}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {quickQuoteProduct.capacity} • SKU: {quickQuoteProduct.sku}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 font-mono mb-1">Seu Nome / Responsável *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 font-mono mb-1">WhatsApp com DDD *</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(34) 99815-XXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 font-mono mb-1">E-mail Corporativo *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@empresa.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 font-mono mb-1">Empresa / Cidade</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Cidade - UF"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 font-mono mb-1">Quantidade</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-mono focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 font-mono mb-1">Observações ou Necessidades Específicas</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: preciso com rampa de acesso, piso embutido, etc."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FileText className="w-4 h-4" />
                <span>{isSubmitting ? 'ENVIANDO...' : 'SOLICITAR PROPOSTA TÉCNICA'}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Atendimento rápido pela equipe da GR Instrumentos de Pesagem</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
