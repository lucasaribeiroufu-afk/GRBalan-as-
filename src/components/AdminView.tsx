import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  Package, 
  FileText, 
  ShoppingCart, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  CheckCircle, 
  ShieldCheck, 
  MessageCircle, 
  Instagram, 
  Search, 
  X, 
  ArrowLeft,
  DollarSign,
  Layers,
  Phone,
  ExternalLink,
  Eye,
  Check,
  ImageIcon
} from 'lucide-react';

const PRESET_SCALE_IMAGES = [
  { name: 'Plataforma 150x150cm (3000kg)', url: '/images/balanca-plataforma-150.jpg' },
  { name: 'Plataforma 120x120cm (3000kg)', url: '/images/balanca-plataforma-120.jpg' },
  { name: 'Sapatas Móveis 40T / 32T', url: '/images/balanca-sapata-40t.jpg' },
  { name: 'Digital Bancada 300kg (40x50)', url: '/images/balanca-bancada-300kg.jpg' },
  { name: 'Paleteira Balança 3000kg', url: '/images/balanca-paleteira-3000kg.jpg' },
  { name: 'Barras de Pesagem para Gado', url: '/images/balanca-gado-barras.jpg' },
  { name: 'Gancho / Guindaste 5T', url: '/images/balanca-gancho-5t.jpg' },
];

export const AdminView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    quotes, 
    updateQuoteStatus, 
    orders, 
    updateOrderStatus,
    settings,
    updateSettings,
    categories,
    navigateTo,
    openWhatsApp,
    openInstagram,
    openProductDetail
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'quotes' | 'orders' | 'settings'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [viewingProductSpecs, setViewingProductSpecs] = useState<Product | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Product form state
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: 'Balanças de Plataforma',
    price: 0,
    promotionalPrice: 0,
    saleModel: 'direct',
    capacity: '',
    dimensions: '',
    plateThickness: '3 mm (Chapa Xadrez Antiderrapante)',
    division: '',
    inmetroCertified: true,
    inStock: true,
    stockQuantity: 5,
    imageUrl: '/images/balanca-plataforma-150.jpg',
    shortDescription: '',
    fullDescription: '',
    warranty: '12 meses contra defeitos de fabricação',
    isFeatured: false,
    isOffer: false,
    applications: ['Indústria', 'Agronegócio', 'Logística'],
  });

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setIsCreatingNew(false);
  };

  const handleStartCreate = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      sku: `GR-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Balanças de Plataforma',
      price: 2500,
      promotionalPrice: 0,
      saleModel: 'direct',
      capacity: '3.000 kg',
      dimensions: '150 x 150 cm',
      plateThickness: '3 mm (Chapa Xadrez Antiderrapante)',
      division: '1 kg',
      inmetroCertified: true,
      inStock: true,
      stockQuantity: 5,
      imageUrl: '/images/balanca-plataforma-150.jpg',
      shortDescription: 'Balança industrial com estrutura reforçada e selo INMETRO.',
      fullDescription: 'Equipamento de pesagem projetado para operações severas de carga e descarga.',
      warranty: '12 meses contra defeitos de fabricação',
      isFeatured: true,
      isOffer: false,
      applications: ['Indústria', 'Agronegócio', 'Almoxarifado'],
    });
    setIsCreatingNew(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingNew) {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: productForm.name || 'Nova Balança GR',
        slug: (productForm.name || 'balanca').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku: productForm.sku || 'GR-000',
        category: productForm.category || 'Balanças de Plataforma',
        price: Number(productForm.price) || 0,
        promotionalPrice: Number(productForm.promotionalPrice) || undefined,
        saleModel: (productForm.saleModel as 'direct' | 'quote') || 'direct',
        capacity: productForm.capacity || '3.000 kg',
        dimensions: productForm.dimensions || 'Dimensões padrão de fábrica',
        plateThickness: productForm.plateThickness,
        division: productForm.division,
        inmetroCertified: !!productForm.inmetroCertified,
        inStock: !!productForm.inStock,
        stockQuantity: Number(productForm.stockQuantity) || 1,
        indicator: productForm.indicator || 'Indicador Digital LED com Bateria Recarregável',
        material: productForm.material || 'Aço carbono de alta resistência com chapa antiderrapante',
        imageUrl: productForm.imageUrl || '/images/balanca-plataforma-150.jpg',
        gallery: productForm.gallery || [productForm.imageUrl || '/images/balanca-plataforma-150.jpg'],
        shortDescription: productForm.shortDescription || '',
        fullDescription: productForm.fullDescription || '',
        warranty: productForm.warranty || '12 meses contra defeitos de fabricação',
        isFeatured: !!productForm.isFeatured,
        isOffer: !!productForm.isOffer,
        applications: productForm.applications || ['Indústria', 'Agronegócio'],
        specs: productForm.specs || [
          { label: 'Capacidade Máxima', value: productForm.capacity || '3.000 kg' },
          { label: 'Dimensões da Plataforma', value: productForm.dimensions || 'Padrão' },
          { label: 'Espessura da Chapa', value: productForm.plateThickness || '3 mm chapa xadrez' },
          { label: 'Certificação', value: productForm.inmetroCertified ? 'Homologada pelo INMETRO' : 'Industrial' },
        ],
        shippingType: (productForm.shippingType as 'calculated' | 'consult') || 'consult',
      };
      addProduct(newProd);
      setIsCreatingNew(false);
    } else if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        shortDescription: productForm.shortDescription || '',
        fullDescription: productForm.fullDescription || '',
        warranty: productForm.warranty || '12 meses contra defeitos de fabricação',
        applications: productForm.applications || ['Indústria', 'Agronegócio'],
        price: Number(productForm.price) || 0,
        promotionalPrice: Number(productForm.promotionalPrice) || undefined,
        stockQuantity: Number(productForm.stockQuantity) || 1,
      });
      setEditingProduct(null);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.capacity.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 bg-white p-6 rounded-2xl border shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-orange-100 text-orange-700 font-mono text-[11px] font-bold uppercase tracking-wider">
                Painel Administrativo
              </span>
              <span className="text-xs text-slate-500 font-mono">GR Instrumentos de Pesagem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              GESTÃO DO E-COMMERCE & BALANÇAS
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Catálogo de balanças com fotos, preços atualizados e especificações técnicas de engenharia
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
              id="admin-btn-store-view"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ver Loja Virtual</span>
            </button>

            {/* Instagram Access Button */}
            <button
              onClick={openInstagram}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold border border-pink-200 transition-colors shadow-sm"
              title="Acessar Instagram Oficial"
              id="admin-btn-instagram"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 text-pink-400" />
            </button>

            {/* WhatsApp Call Button */}
            <button
              onClick={() => openWhatsApp('Olá! Atendimento administrativo GR Instrumentos de Pesagem.')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
              title="Chamar pelo WhatsApp"
              id="admin-btn-whatsapp"
            >
              <Phone className="w-4 h-4" />
              <span>Chamar WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6 font-mono">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Balanças no Catálogo</span>
              <Package className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{products.length}</span>
            <span className="text-[11px] text-emerald-600 block mt-1 font-semibold">
              {products.filter((p) => p.inmetroCertified).length} com Selo INMETRO
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Orçamentos Recebidos</span>
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{quotes.length}</span>
            <span className="text-[11px] text-amber-600 block mt-1 font-semibold">
              {quotes.filter((q) => q.status === 'new').length} pendentes de resposta
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Pedidos Registrados</span>
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{orders.length}</span>
            <span className="text-[11px] text-slate-500 block mt-1">
              Direto pelo carrinho
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span>Canais Integrados</span>
              <MessageCircle className="w-4 h-4 text-pink-600" />
            </div>
            <span className="text-xs font-bold text-slate-900 block mt-1 truncate">{settings.whatsappFormatted}</span>
            <span className="text-[11px] text-pink-600 block mt-0.5 truncate font-sans">{settings.instagramHandle}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
            id="admin-tab-products"
          >
            <Package className="w-4 h-4" />
            <span>Balanças & Especificações Técnicas ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quotes'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
            id="admin-tab-quotes"
          >
            <FileText className="w-4 h-4" />
            <span>Orçamentos B2B ({quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
            id="admin-tab-orders"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Pedidos & Vendas ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
            id="admin-tab-settings"
          >
            <Settings className="w-4 h-4" />
            <span>Configurações & Contatos</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS & SPECS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Toolbar: Search and Add New */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filtrar por nome, SKU, capacidade, chapa..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  id="admin-search-input"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleStartCreate}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
                  id="admin-btn-new-product"
                >
                  <Plus className="w-4 h-4" />
                  <span>CADASTRAR NOVA BALANÇA</span>
                </button>
              </div>
            </div>

            {/* Products Table with Complete Technical Specs */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-mono font-bold">
                      <th className="py-3.5 px-4">Equipamento & Imagem</th>
                      <th className="py-3.5 px-4">Código SKU</th>
                      <th className="py-3.5 px-4">Capacidade</th>
                      <th className="py-3.5 px-4">Dimensões / Chapa</th>
                      <th className="py-3.5 px-4">INMETRO</th>
                      <th className="py-3.5 px-4">Preço (R$)</th>
                      <th className="py-3.5 px-4">Estoque</th>
                      <th className="py-3.5 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* Equipment Thumbnail + Title */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              className="w-14 h-14 object-cover rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0 shadow-xs"
                            />
                            <div>
                              <button
                                onClick={() => openProductDetail(p)}
                                className="font-bold text-slate-900 text-left hover:text-orange-600 block max-w-xs truncate font-sans text-xs transition-colors"
                                title="Ver página do produto na loja"
                              >
                                {p.name}
                              </button>
                              <span className="text-[11px] text-slate-500 block font-sans">
                                {p.category}
                              </span>
                              {p.isFeatured && (
                                <span className="inline-block mt-0.5 text-[9px] bg-orange-100 text-orange-700 px-1.5 py-0.2 rounded font-bold uppercase">
                                  Destaque
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* SKU */}
                        <td className="py-3.5 px-4 text-orange-600 font-bold">
                          {p.sku}
                        </td>

                        {/* Capacity */}
                        <td className="py-3.5 px-4 text-slate-900 font-bold">
                          {p.capacity}
                        </td>

                        {/* Dimensions & Plate Thickness */}
                        <td className="py-3.5 px-4 text-slate-700">
                          <div className="font-semibold text-slate-900">{p.dimensions || 'Sob medida'}</div>
                          <span className="text-[11px] text-slate-500 block">
                            {p.plateThickness || 'Chapa xadrez antiderrapante'}
                          </span>
                        </td>

                        {/* INMETRO Badge */}
                        <td className="py-3.5 px-4">
                          {p.inmetroCertified ? (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              SIM
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              NÃO
                            </span>
                          )}
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4">
                          {p.promotionalPrice && p.promotionalPrice < p.price ? (
                            <div>
                              <span className="font-bold text-slate-900 block">
                                R$ {p.promotionalPrice.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[10px] text-slate-400 line-through block">
                                R$ {p.price.toLocaleString('pt-BR')}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-slate-900">
                              {p.price > 0 ? `R$ ${p.price.toLocaleString('pt-BR')}` : 'Sob Consulta'}
                            </span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="py-3.5 px-4">
                          <span className={`text-[11px] font-semibold ${p.inStock ? 'text-emerald-700' : 'text-amber-600'}`}>
                            {p.inStock ? `${p.stockQuantity} un.` : 'Sob encomenda'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setViewingProductSpecs(p)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
                              title="Ver ficha técnica completa"
                              id={`admin-view-specs-${p.id}`}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStartEdit(p)}
                              className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 transition-colors"
                              title="Editar balança e dados"
                              id={`admin-edit-prod-${p.id}`}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Deseja realmente remover a balança ${p.name}?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                              title="Remover balança"
                              id={`admin-del-prod-${p.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* MODAL: VIEW FULL TECHNICAL SPECS */}
        {viewingProductSpecs && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs p-4 flex items-center justify-center">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setViewingProductSpecs(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                <img
                  src={viewingProductSpecs.imageUrl}
                  alt={viewingProductSpecs.name}
                  className="w-20 h-20 object-cover rounded-xl border border-slate-200 bg-slate-50 flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] text-orange-600 font-mono font-bold uppercase tracking-wider">
                    Ficha Técnica de Engenharia • SKU: {viewingProductSpecs.sku}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {viewingProductSpecs.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-extrabold text-orange-600 font-mono">
                      {viewingProductSpecs.price > 0 ? `R$ ${viewingProductSpecs.price.toLocaleString('pt-BR')}` : 'Sob Consulta'}
                    </span>
                    {viewingProductSpecs.inmetroCertified && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" />
                        Homologada INMETRO
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="my-5 space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] mb-2 text-orange-600">
                    Especificações Técnicas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Capacidade:</span>
                      <strong className="text-slate-900">{viewingProductSpecs.capacity}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Dimensões da Plataforma:</span>
                      <strong className="text-slate-900">{viewingProductSpecs.dimensions || 'Conforme projeto'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Chapa / Tampo:</span>
                      <strong className="text-slate-900">{viewingProductSpecs.plateThickness || '3 mm xadrez antiderrapante'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Divisão de Escala:</span>
                      <strong className="text-slate-900">{viewingProductSpecs.division || 'Padrão metrológico'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Garantia:</span>
                      <strong className="text-slate-900">{viewingProductSpecs.warranty || '12 meses'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Estoque Disponível:</span>
                      <strong className="text-emerald-700">{viewingProductSpecs.stockQuantity} unidades</strong>
                    </div>
                  </div>
                </div>

                {viewingProductSpecs.specs && viewingProductSpecs.specs.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] mb-2 text-orange-600">
                      Tabela de Parâmetros
                    </h4>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs font-mono">
                        <tbody className="divide-y divide-slate-100">
                          {viewingProductSpecs.specs.map((s, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                              <td className="py-2 px-3 text-slate-500 font-medium">{s.label}</td>
                              <td className="py-2 px-3 text-slate-900 font-bold">{s.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] mb-1 text-orange-600">
                    Descrição Completa
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-sans">
                    {viewingProductSpecs.fullDescription}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => openProductDetail(viewingProductSpecs)}
                  className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold"
                >
                  <span>Abrir na loja</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    const prod = viewingProductSpecs;
                    setViewingProductSpecs(null);
                    handleStartEdit(prod);
                  }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold"
                >
                  Editar Dados
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT SPECS */}
        {(editingProduct || isCreatingNew) && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-4 flex items-center justify-center">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
              
              <button
                onClick={() => { setEditingProduct(null); setIsCreatingNew(false); }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pb-3 border-b border-slate-200">
                <span className="text-[10px] text-orange-600 font-mono font-bold uppercase tracking-wider">
                  {isCreatingNew ? 'Novo Cadastro de Balança' : 'Edição de Especificações'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {isCreatingNew ? 'Cadastrar Balança Industrial / Agrícola' : `Editar: ${editingProduct?.name}`}
                </h3>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
                
                {/* Row 1: Name & SKU */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">Nome Completo do Equipamento *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="Ex: Balança de Plataforma 150x150cm 3000kg"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white font-sans text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Código SKU *</label>
                    <input
                      type="text"
                      required
                      value={productForm.sku}
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-orange-600 font-bold focus:outline-none focus:border-orange-500 focus:bg-white text-xs"
                    />
                  </div>
                </div>

                {/* Row 2: Category & Sale Model */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-bold mb-1">Categoria Principal *</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white text-xs"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Modelo Comercial *</label>
                    <select
                      value={productForm.saleModel}
                      onChange={(e) => setProductForm({ ...productForm, saleModel: e.target.value as 'direct' | 'quote' })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white text-xs"
                    >
                      <option value="direct">Venda Direta (Carrinho)</option>
                      <option value="quote">Sob Orçamento (Engenharia)</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Technical Specifications (Capacity, Dimensions, Plate Thickness, Division) */}
                <div className="p-4 bg-orange-50/50 border border-orange-200/70 rounded-2xl space-y-3">
                  <h4 className="text-[11px] font-bold text-orange-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Especificações Técnicas de Pesagem</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-slate-700 mb-1 font-semibold">Capacidade *</label>
                      <input
                        type="text"
                        required
                        value={productForm.capacity}
                        onChange={(e) => setProductForm({ ...productForm, capacity: e.target.value })}
                        placeholder="Ex: 3.000 kg"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-semibold">Dimensões</label>
                      <input
                        type="text"
                        value={productForm.dimensions}
                        onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                        placeholder="Ex: 150 x 150 cm"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-semibold">Chapa / Perfil</label>
                      <input
                        type="text"
                        value={productForm.plateThickness}
                        onChange={(e) => setProductForm({ ...productForm, plateThickness: e.target.value })}
                        placeholder="Ex: 3 mm Xadrez"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-semibold">Divisão / Escala</label>
                      <input
                        type="text"
                        value={productForm.division}
                        onChange={(e) => setProductForm({ ...productForm, division: e.target.value })}
                        placeholder="Ex: 1 kg ou 500 g"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-800">
                      <input
                        type="checkbox"
                        checked={productForm.inmetroCertified}
                        onChange={(e) => setProductForm({ ...productForm, inmetroCertified: e.target.checked })}
                        className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
                      />
                      <span className="flex items-center gap-1 font-bold text-emerald-700">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Homologada pelo INMETRO
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-800">
                      <input
                        type="checkbox"
                        checked={productForm.isFeatured}
                        onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                        className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
                      />
                      <span>Destacar na Página Inicial</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-800">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
                      />
                      <span>Disponível em Estoque</span>
                    </label>
                  </div>
                </div>

                {/* Quick Visual Image Selector from Project Scales */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-slate-800 font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
                      <span>Selecionar Imagem das Balanças Anexadas</span>
                    </label>
                    <span className="text-[10px] text-slate-500">Clique para aplicar</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRESET_SCALE_IMAGES.map((imgItem) => (
                      <button
                        key={imgItem.url}
                        type="button"
                        onClick={() => setProductForm({ ...productForm, imageUrl: imgItem.url })}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          productForm.imageUrl === imgItem.url 
                            ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-500/20' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img 
                          src={imgItem.url} 
                          alt={imgItem.name} 
                          className="w-10 h-10 object-cover rounded-lg bg-slate-100 flex-shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] text-slate-900 font-medium block truncate font-sans">
                            {imgItem.name}
                          </span>
                          {productForm.imageUrl === imgItem.url && (
                            <span className="text-[9px] text-orange-600 font-bold flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" /> Selecionada
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-slate-500 text-[11px] mb-1">Ou informe a URL / Caminho da Imagem:</label>
                    <input
                      type="text"
                      value={productForm.imageUrl}
                      onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                      placeholder="/images/balanca-plataforma-150.jpg"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-sans"
                    />
                  </div>
                </div>

                {/* Row 4: Pricing and Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Preço Normal (R$)</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Preço Promocional (R$)</label>
                    <input
                      type="number"
                      value={productForm.promotionalPrice || ''}
                      onChange={(e) => setProductForm({ ...productForm, promotionalPrice: parseFloat(e.target.value) || 0 })}
                      placeholder="Opcional"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Qtd. em Estoque</label>
                    <input
                      type="number"
                      value={productForm.stockQuantity}
                      onChange={(e) => setProductForm({ ...productForm, stockQuantity: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Descrição Curta (Catálogo)</label>
                  <input
                    type="text"
                    value={productForm.shortDescription}
                    onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Descrição Técnica Detalhada</label>
                  <textarea
                    rows={3}
                    value={productForm.fullDescription}
                    onChange={(e) => setProductForm({ ...productForm, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans text-xs"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => { setEditingProduct(null); setIsCreatingNew(false); }}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Balança</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* TAB 2: QUOTES MANAGEMENT (B2B LEADS) */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">
                Solicitações de Orçamento B2B Recebidas
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                Total: {quotes.length} solicitações registradas
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold">
                      <th className="py-3 px-4">Data / ID</th>
                      <th className="py-3 px-4">Cliente / Empresa</th>
                      <th className="py-3 px-4">Equipamento Cotado</th>
                      <th className="py-3 px-4">Qtd.</th>
                      <th className="py-3 px-4">Localização</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Ação WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {quotes.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-500">
                          <div>{new Date(q.createdAt).toLocaleDateString('pt-BR')}</div>
                          <span className="text-[10px] text-orange-600 font-bold">#{q.id.replace('quote-', '')}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block font-sans">{q.name}</span>
                          <span className="text-slate-500 text-[11px] block">{q.company || 'Pessoa Física'}</span>
                          <span className="text-slate-600 text-[10px] block">{q.whatsapp}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          <span className="font-bold text-orange-600 block">{q.productName || q.category}</span>
                          <span className="text-[11px] text-slate-500">{q.desiredCapacity}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-900 font-bold">
                          {q.quantity} un.
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {q.city} - {q.state}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={q.status}
                            onChange={(e) => updateQuoteStatus(q.id, e.target.value as any)}
                            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[11px] text-slate-800 focus:outline-none focus:border-orange-500"
                          >
                            <option value="new">Novo / Pendente</option>
                            <option value="contacted">Em Negociação</option>
                            <option value="proposal_sent">Proposta Enviada</option>
                            <option value="closed">Fechado / Concluído</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => openWhatsApp(`Olá ${q.name}! Aqui é da GR Instrumentos de Pesagem. Recebemos sua solicitação para a ${q.productName || q.category} e já temos a proposta comercial pronta.`)}
                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Responder</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">
                Pedidos de Compra Registrados no E-commerce
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                Total: {orders.length} pedidos
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold">
                      <th className="py-3 px-4">Pedido / Data</th>
                      <th className="py-3 px-4">Cliente / CPF-CNPJ</th>
                      <th className="py-3 px-4">Itens</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Pagamento</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <span className="text-orange-600 font-bold block">{o.code}</span>
                          <span className="text-slate-500 text-[10px]">{new Date(o.createdAt).toLocaleDateString('pt-BR')}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-900 font-bold block">{o.customerName}</span>
                          <span className="text-slate-500 text-[10px]">{o.document}</span>
                          <span className="text-emerald-700 text-[10px] block font-semibold">{o.whatsapp}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {o.items.map((i, idx) => (
                            <div key={idx} className="text-[11px]">
                              {i.quantity}x {i.name}
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">
                          R$ {o.total.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 uppercase text-slate-600">
                          {o.paymentMethod}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[11px] text-slate-800 focus:outline-none focus:border-orange-500"
                          >
                            <option value="pending">Aguardando Pagamento</option>
                            <option value="paid">Pago / Aprovado</option>
                            <option value="shipped">Despachado</option>
                            <option value="delivered">Entregue</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS & SOCIAL CHANNELS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 uppercase font-mono mb-4 border-b border-slate-200 pb-2">
              Configurações de Contato & Redes Sociais
            </h3>

            {settingsSaved && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Configurações salvas e aplicadas em todo o site!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-mono">
              
              {/* WhatsApp Number & Display */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Integração WhatsApp Oficial GR</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Número com DDI e DDD (Apenas números) *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      placeholder="5534998153792"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Texto Exibido no Site *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsappFormatted}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappFormatted: e.target.value })}
                      placeholder="(34) 99815-3792"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Instagram URL & Handle */}
              <div className="p-4 bg-pink-50/70 border border-pink-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-pink-800 font-bold text-sm">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram Oficial GR</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Link Completo do Perfil *</label>
                    <input
                      type="url"
                      required
                      value={settingsForm.instagramUrl}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                      placeholder="https://www.instagram.com/grinstrumentosdepesagem/"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-sans text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Identificador / Handle *</label>
                    <input
                      type="text"
                      required
                      value={settingsForm.instagramHandle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagramHandle: e.target.value })}
                      placeholder="@grinstrumentosdepesagem"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-sans text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* General Business Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">E-mail Comercial</label>
                  <input
                    type="email"
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Cidade / Estado</label>
                  <input
                    type="text"
                    value={settingsForm.cityState}
                    onChange={(e) => setSettingsForm({ ...settingsForm, cityState: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>SALVAR CONFIGURAÇÕES DO E-COMMERCE</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
