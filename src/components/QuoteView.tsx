import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { FileText, MessageCircle, CheckCircle2, ShieldCheck, ArrowRight, Phone } from 'lucide-react';

interface QuoteViewProps {
  preselectedProduct?: Product | null;
}

export const QuoteView: React.FC<QuoteViewProps> = ({ preselectedProduct }) => {
  const { submitQuote, openWhatsApp, products, categories, settings } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    email: '',
    city: '',
    state: 'MG',
    productId: preselectedProduct ? preselectedProduct.id : '',
    productName: preselectedProduct ? preselectedProduct.name : '',
    category: preselectedProduct ? preselectedProduct.category : 'Balanças de Plataforma',
    quantity: 1,
    desiredCapacity: preselectedProduct ? preselectedProduct.capacity : '3.000 kg',
    message: preselectedProduct ? `Olá, gostaria de cotação e prazo de entrega para a ${preselectedProduct.name}.` : '',
  });

  const [submittedQuote, setSubmittedQuote] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const created = await submitQuote(formData);
      setSubmittedQuote(created);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = e.target.value;
    const selected = products.find((p) => p.id === pId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        productId: selected.id,
        productName: selected.name,
        category: selected.category,
        desiredCapacity: selected.capacity,
        message: `Olá, gostaria de cotação para a ${selected.name} (${selected.sku}).`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        productId: '',
        productName: '',
      }));
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen text-slate-800" id="quote-view-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-orange-600" />
            <span>Proposta Comercial e Técnica</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SOLICITE UM ORÇAMENTO
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Conte o que sua operação precisa e nossa equipe técnica poderá avaliar e indicar a melhor solução em pesagem.
          </p>
        </div>

        {/* Confirmation Screen */}
        {submittedQuote ? (
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Orçamento Enviado com Sucesso!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Obrigado, <strong className="text-slate-900">{submittedQuote.name}</strong>. Nossa equipe técnica já recebeu a solicitação referente a <strong className="text-orange-600">{submittedQuote.productName || submittedQuote.category}</strong>.
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Protocolo: #{submittedQuote.id.replace('quote-', 'GR-')}
              </p>
            </div>

            {/* WhatsApp follow-up CTA */}
            <div className="pt-4 border-t border-slate-100 max-w-md mx-auto space-y-3">
              <p className="text-xs text-slate-600">
                Deseja prioridade e resposta em tempo real pelo WhatsApp?
              </p>
              <button
                onClick={() => openWhatsApp(`Olá! Acabei de enviar um pedido de orçamento no site (Protocolo #${submittedQuote.id.replace('quote-', 'GR-')}) para ${submittedQuote.productName || submittedQuote.category} e gostaria de agilizar o atendimento.`)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>CONTINUAR PELO WHATSAPP</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome ou responsável"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                    Empresa / Fazenda / CNPJ
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Razão Social ou Nome Fantasia"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp & E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="(34) 99815-XXXX"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="compras@suaempresa.com.br"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 3: City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ex: Uberlândia, Araguari, Uberaba..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                    Estado *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  >
                    {['MG', 'SP', 'GO', 'MT', 'MS', 'PR', 'RS', 'SC', 'BA', 'RJ', 'ES', 'DF', 'TO', 'PA', 'MA', 'Outro'].map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Product of Interest & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                    Equipamento de Interesse
                  </label>
                  <select
                    value={formData.productId}
                    onChange={handleProductSelectChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                  >
                    <option value="">Selecione um equipamento (ou descreva na mensagem)</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} - {p.capacity}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-mono focus:bg-white"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase font-mono mb-1.5">
                  Detalhes da Operação ou Dimensões Desejadas
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Informe detalhes sobre o tipo de material a ser pesado, local de instalação, necessidade de rampa de acesso, etc."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                ></textarea>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all text-sm sm:text-base disabled:opacity-50"
                  id="quote-submit-btn"
                >
                  <FileText className="w-5 h-5" />
                  <span>{isSubmitting ? 'ENVIANDO SOLICITAÇÃO...' : 'ENVIAR SOLICITAÇÃO DE ORÇAMENTO'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Seus dados são protegidos conforme a LGPD e usados exclusivamente para contato comercial da GR.</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
