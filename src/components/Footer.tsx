import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Clock,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, categories, navigateTo, openCategory, openWhatsApp, openInstagram } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 text-slate-600 text-xs border-t border-slate-200" id="main-footer">
      
      {/* Top Banner inside Footer */}
      <div className="border-b border-slate-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl shadow-xs">
              <span className="font-extrabold text-xl tracking-tighter text-white font-mono">G</span>
              <span className="font-extrabold text-xl tracking-tighter text-orange-500 font-mono -ml-0.5">R</span>
            </div>
            <div>
              <span className="text-sm font-extrabold text-slate-900 uppercase tracking-wider block">
                GR Instrumentos de Pesagem
              </span>
              <span className="text-[11px] text-slate-500">
                Precisão e robustez metrológica para indústria e agronegócio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openInstagram}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors font-medium shadow-2xs"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>{settings.instagramHandle}</span>
            </button>

            <button
              onClick={() => openWhatsApp('Olá! Gostaria de atendimento comercial na GR Instrumentos de Pesagem.')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors font-semibold shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{settings.whatsappFormatted}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 5-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: About GR */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
              GR INSTRUMENTOS DE PESAGEM
            </h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Especializada em soluções de pesagem industrial, agrícola, pecuária e comercial com produtos de excelência e certificação do INMETRO.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Aprovação INMETRO</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              Fábrica & Logística: {settings.cityState}
            </p>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
              Linha de Produtos
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => openCategory(c.slug)}
                    className="hover:text-orange-600 transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('products')}
                  className="text-orange-600 font-bold hover:underline"
                >
                  Ver Catálogo Geral →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
              Soluções por Setor
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => navigateTo('solutions')} className="hover:text-orange-600">Agronegócio & Safra de Grãos</button></li>
              <li><button onClick={() => navigateTo('solutions')} className="hover:text-orange-600">Indústria Pesada & Metalúrgica</button></li>
              <li><button onClick={() => navigateTo('solutions')} className="hover:text-orange-600">Pecuária & Confinamento Bovino</button></li>
              <li><button onClick={() => navigateTo('solutions')} className="hover:text-orange-600">Centros de Distribuição & Logística</button></li>
              <li><button onClick={() => navigateTo('solutions')} className="hover:text-orange-600">Pesagem de Eixos Rodoviários</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-orange-600">Calibração e Manutenção</button></li>
            </ul>
          </div>

          {/* Col 4: Institutional & Help */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
              Institucional
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => navigateTo('about')} className="hover:text-orange-600">Quem Somos</button></li>
              <li><button onClick={() => navigateTo('quote')} className="hover:text-orange-600">Solicitar Orçamento</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-orange-600">Assistência Técnica</button></li>
              <li><button onClick={() => navigateTo('blog')} className="hover:text-orange-600">Artigos & Dicas Técnicas</button></li>
              <li><button onClick={() => navigateTo('privacy')} className="hover:text-orange-600">Política de Privacidade (LGPD)</button></li>
              <li><button onClick={() => navigateTo('terms')} className="hover:text-orange-600">Termos de Compra & Garantia</button></li>
              <li><button onClick={() => navigateTo('admin')} className="text-slate-500 hover:text-slate-900 font-semibold">Painel Administrativo</button></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
              Fale Conosco
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <span>{settings.whatsappFormatted}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-orange-600" />
                <span className="truncate">{settings.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>{settings.cityState}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Seg a Sex: 07:30h às 18:00h</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp('Olá! Gostaria de suporte via WhatsApp na GR Instrumentos de Pesagem.')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-center transition-colors shadow-xs"
                >
                  Chamar no WhatsApp
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright and Legal Bar */}
      <div className="border-t border-slate-200 py-4 bg-slate-200/60 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-500">
            © {new Date().getFullYear()} GR Instrumentos de Pesagem. Todos os direitos reservados. CNPJ: {settings.cnpj}.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Segurança & Privacidade LGPD</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
