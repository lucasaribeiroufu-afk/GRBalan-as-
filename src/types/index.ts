export type SaleModel = 'direct' | 'quote';

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  promotionalPrice?: number;
  saleModel: SaleModel; // 'direct' = purchase button with price, 'quote' = sob consulta
  inStock: boolean;
  stockQuantity: number;
  capacity: string;
  minWeight?: string;
  maxWeight?: string;
  dimensions: string;
  plateThickness?: string;
  inmetroCertified: boolean;
  inmetroSealNumber?: string;
  indicator: string;
  material: string;
  division?: string;
  warranty: string;
  imageUrl: string;
  gallery: string[];
  applications: string[];
  specs: TechnicalSpec[];
  isFeatured?: boolean;
  isOffer?: boolean;
  isNew?: boolean;
  shippingType: 'calculated' | 'consult';
  powerSupply?: string;
  rating?: number;
  reviewsCount?: number;
  soldCount?: string;
  mercadoLivreUrl?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  itemCount: number;
  iconName: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  productId?: string;
  productName?: string;
  category: string;
  quantity: number;
  desiredCapacity: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'closed';
}

export interface Order {
  id: string;
  code: string;
  createdAt: string;
  customerName: string;
  document: string; // CPF or CNPJ
  company?: string;
  email: string;
  whatsapp: string;
  phone?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: 'pix' | 'credit_card' | 'bank_slip';
  status: 'novo' | 'aguardando_pagamento' | 'pagamento_aprovado' | 'em_preparacao' | 'enviado' | 'entregue' | 'cancelado';
  notes?: string;
}

export interface SiteSettings {
  companyName: string;
  whatsappNumber: string; // e.g. 5534998153792
  whatsappFormatted: string; // e.g. (34) 99815-3792
  instagramUrl: string;
  instagramHandle: string;
  contactEmail: string;
  address: string;
  cityState: string;
  cnpj?: string;
  noticeBar: {
    enabled: boolean;
    text: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}
