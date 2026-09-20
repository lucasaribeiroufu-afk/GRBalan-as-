import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ShoppingCart, 
  Phone, 
  Instagram, 
  Menu, 
  X, 
  ChevronDown, 
  Layers, 
  SlidersHorizontal,
  Scale, 
  ShieldCheck, 
  Package, 
  Anchor, 
  Cpu, 
  Settings as SettingsIcon,
  MessageCircle,
  Clock,
  MapPin
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    settings, 
    cartCount, 
    setIsCartOpen, 
    compareList, 
    navigateTo, 
    openCategory, 
    categories,
    products,
    openProductDetail,
    openWhatsApp,
    openInstagram,
    currentView
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const q = searchTerm.toLowerCase();
      const matched = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.capacity.toLowerCase().includes(q) ||
          p.dimensions.toLowerCase().includes(q)
      );
      setSearchResults(matched.slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-4 h-4 text-orange-500" />;
      case 'Truck': return <Scale className="w-4 h-4 text-orange-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-orange-500" />;
      case 'Package': return <Package className="w-4 h-4 text-orange-500" />;
      case 'Anchor': return <Anchor className="w-4 h-4 text-orange-500" />;
      default: return <Cpu className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top utility bar */}
      {settings.noticeBar.enabled && (
        <div className="bg-slate-100 border-b border-slate-200 text-xs text-slate-700 px-4 py-1.5 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-orange-600 font-semibold tracking-wide uppercase text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                Certificação INMETRO
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {settings.cityState} • Atendimento em todo o Brasil
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Seg a Sex: 07:30 às 18:00
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={openInstagram}
                className="flex items-center gap-1.5 hover:text-pink-600 transition-colors text-slate-700 font-medium"
                title="Acessar Instagram Oficial"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>{settings.instagramHandle}</span>
              </button>

              <span className="text-slate-300">|</span>

              <button
                onClick={() => openWhatsApp('Olá! Gostaria de falar com um especialista em pesagem da GR.')}
                className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
                title="Falar no WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600/20 text-emerald-600" />
                <span>{settings.whatsappFormatted}</span>
              </button>

              <span className="text-slate-300">|</span>

              <button
                onClick={() => navigateTo('admin')}
                className={`text-[11px] px-2.5 py-0.5 rounded border transition-colors ${
                  currentView === 'admin' 
                    ? 'bg-orange-600 text-white border-orange-500 font-bold' 
                    : 'bg-white text-slate-700 hover:text-orange-600 border-slate-300 hover:border-orange-500'
                }`}
              >
                Painel Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main navigation header */}
      <div className={`w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all ${
        isScrolled ? 'py-2.5 shadow-md' : 'py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Logo GR */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            {/* Visual Custom GR Logo */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-11 h-11 bg-slate-900 border border-slate-800 rounded-lg shadow-sm group-hover:border-orange-500 transition-all">
                <span className="font-extrabold text-2xl tracking-tighter text-white font-mono">G</span>
                <span className="font-extrabold text-2xl tracking-tighter text-orange-500 font-mono -ml-0.5">R</span>
                <div className="absolute -bottom-1 w-4 h-1 bg-orange-500 rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none group-hover:text-orange-600 transition-colors">
                  GR
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-500 leading-tight">
                  Instrumentos de Pesagem
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'home' ? 'text-orange-600 bg-orange-50 font-bold' : 'hover:text-orange-600 hover:bg-slate-100'
              }`}
            >
              Início
            </button>

            {/* Products with Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('products')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                  currentView === 'products' || currentView === 'category'
                    ? 'text-orange-600 bg-orange-50 font-bold'
                    : 'hover:text-orange-600 hover:bg-slate-100'
                }`}
              >
                <span>Produtos</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-orange-600' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-bold text-slate-500 uppercase px-3 py-1.5 border-b border-slate-100 tracking-wider flex justify-between items-center">
                    <span>Categorias de Balanças</span>
                    <button 
                      onClick={() => navigateTo('products')}
                      className="text-orange-600 hover:underline normal-case text-xs font-semibold"
                    >
                      Ver todas
                    </button>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          openCategory(cat.slug);
                          setProductsDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-slate-800 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          {getCategoryIcon(cat.iconName)}
                          <span className="text-xs font-semibold">{cat.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {cat.itemCount}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('solutions')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'solutions' ? 'text-orange-600 bg-orange-50 font-bold' : 'hover:text-orange-600 hover:bg-slate-100'
              }`}
            >
              Soluções
            </button>

            <button
              onClick={() => navigateTo('services')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'services' ? 'text-orange-600 bg-orange-50 font-bold' : 'hover:text-orange-600 hover:bg-slate-100'
              }`}
            >
              Serviços
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'about' ? 'text-orange-600 bg-orange-50 font-bold' : 'hover:text-orange-600 hover:bg-slate-100'
              }`}
            >
              Empresa
            </button>

            <button
              onClick={() => navigateTo('blog')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'blog' || currentView === 'blog-post' ? 'text-orange-600 bg-orange-50 font-bold' : 'hover:text-orange-600 hover:bg-slate-100'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => navigateTo('quote')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                currentView === 'quote' ? 'text-orange-600 bg-orange-50 font-bold' : 'hover:text-orange-600 hover:bg-slate-100'
              }`}
            >
              Orçamento
            </button>
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Buscar balanças e modelos"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Popover Live Search */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in duration-150">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Pesquise por 3000 kg, plataforma, sapata..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white"
                      autoFocus
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => setSearchTerm('')} 
                        className="absolute right-2.5 text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Results list */}
                  {searchResults.length > 0 ? (
                    <div className="mt-2.5 max-h-64 overflow-y-auto space-y-1 divide-y divide-slate-100">
                      {searchResults.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            openProductDetail(prod);
                            setSearchOpen(false);
                            setSearchTerm('');
                          }}
                          className="pt-1.5 first:pt-0 flex items-center gap-3 p-1.5 rounded-md hover:bg-slate-50 cursor-pointer"
                        >
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            className="w-10 h-10 object-cover rounded bg-slate-100 border border-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-800 truncate">{prod.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-orange-600 font-mono font-medium">{prod.capacity}</span>
                              <span className="text-[10px] text-slate-500">R$ {prod.price.toLocaleString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchTerm.trim().length > 1 ? (
                    <p className="text-xs text-slate-500 py-3 text-center">Nenhum equipamento encontrado com "{searchTerm}".</p>
                  ) : (
                    <p className="text-[11px] text-slate-400 pt-2 px-1">Dica: Digite modelo, capacidade em kg ou tipo de balança.</p>
                  )}
                </div>
              )}
            </div>

            {/* Compare Trigger */}
            {compareList.length > 0 && (
              <button
                onClick={() => navigateTo('compare')}
                className="relative p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
                title="Comparador Técnico de Balanças"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Carrinho e Pedidos"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Instagram Quick Link */}
            <button
              onClick={openInstagram}
              className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors hidden sm:flex items-center justify-center border border-pink-100"
              title="Acessar Instagram Oficial @grinstrumentosdepesagem"
            >
              <Instagram className="w-5 h-5" />
            </button>

            {/* WhatsApp CTA Button: Falar com Especialista */}
            <button
              onClick={() => openWhatsApp('Olá! Preciso de ajuda para escolher o modelo ideal de balança para minha operação.')}
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-slate-800 hover:bg-slate-100 rounded font-medium"
            >
              Início
            </button>
            <button
              onClick={() => { navigateTo('products'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-slate-800 hover:bg-slate-100 rounded font-medium flex justify-between items-center"
            >
              <span>Todos os Produtos</span>
              <span className="text-xs text-orange-600 font-bold">{products.length} itens</span>
            </button>
            
            {/* Category list in mobile */}
            <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-orange-500/30 my-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { openCategory(cat.slug); setMobileMenuOpen(false); }}
                  className="w-full text-left text-xs text-slate-600 hover:text-orange-600 py-1 flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">{cat.itemCount}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => { navigateTo('solutions'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-slate-800 hover:bg-slate-100 rounded font-medium"
            >
              Soluções por Segmento
            </button>
            <button
              onClick={() => { navigateTo('services'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-slate-800 hover:bg-slate-100 rounded font-medium"
            >
              Serviços & Assistência
            </button>
            <button
              onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-slate-800 hover:bg-slate-100 rounded font-medium"
            >
              Sobre a GR
            </button>
            <button
              onClick={() => { navigateTo('quote'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-slate-800 hover:bg-slate-100 rounded font-medium text-orange-600 font-bold"
            >
              Solicitar Orçamento
            </button>
            <button
              onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded font-medium flex items-center gap-2"
            >
              <SettingsIcon className="w-4 h-4 text-orange-600" />
              <span>Painel de Administração</span>
            </button>

            {/* Mobile CTAs */}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  openWhatsApp('Olá! Estou navegando pelo celular e gostaria de atendimento comercial.');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Atendimento WhatsApp ({settings.whatsappFormatted})</span>
              </button>
              
              <button
                onClick={() => {
                  openInstagram();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-2 rounded-lg font-semibold text-xs shadow-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir no Instagram @grinstrumentosdepesagem</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
