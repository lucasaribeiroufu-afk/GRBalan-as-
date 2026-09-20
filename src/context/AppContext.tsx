import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, QuoteRequest, SiteSettings, BlogPost } from '../types';
import { initialProducts, initialCategories, initialSettings, initialBlogPosts } from '../data/initialData';

interface AppContextType {
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  quotes: QuoteRequest[];
  orders: Order[];
  blogPosts: BlogPost[];
  currentView: string;
  selectedProduct: Product | null;
  selectedCategorySlug: string | null;
  selectedBlogPost: BlogPost | null;
  searchQuery: string;
  isCartOpen: boolean;
  isQuickQuoteOpen: boolean;
  quickQuoteProduct: Product | null;
  
  // Navigation
  navigateTo: (view: string, payload?: any) => void;
  openProductDetail: (product: Product) => void;
  openCategory: (slug: string) => void;
  openBlogPost: (post: BlogPost) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  openQuickQuote: (product?: Product) => void;
  closeQuickQuote: () => void;
  
  // Cart
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Wishlist & Compare
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  
  // Quotes & Orders
  submitQuote: (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => Promise<QuoteRequest>;
  createOrder: (orderData: Omit<Order, 'id' | 'code' | 'createdAt' | 'status'>) => Promise<Order>;
  
  // WhatsApp & Instagram
  openWhatsApp: (customMessage?: string) => void;
  openInstagram: () => void;
  
  // Admin Operations
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence with localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gr_products_v3');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories] = useState<Category[]>(initialCategories);

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('gr_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gr_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('gr_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('gr_compare');
    return saved ? JSON.parse(saved) : [];
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('gr_quotes');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gr_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [blogPosts] = useState<BlogPost[]>(initialBlogPosts);

  // View state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState<boolean>(false);
  const [quickQuoteProduct, setQuickQuoteProduct] = useState<Product | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gr_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gr_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('gr_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('gr_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('gr_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('gr_orders', JSON.stringify(orders));
  }, [orders]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct, selectedCategorySlug, selectedBlogPost]);

  // Navigation handlers
  const navigateTo = (view: string, payload?: any) => {
    if (view === 'product' && payload) {
      setSelectedProduct(payload);
    } else if (view === 'category' && payload) {
      setSelectedCategorySlug(payload);
    } else if (view === 'blog-post' && payload) {
      setSelectedBlogPost(payload);
    }
    setCurrentView(view);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const openCategory = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentView('category');
  };

  const openBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentView('blog-post');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.product.promotionalPrice || item.product.price) * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist & Compare
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        alert('Você pode comparar no máximo 4 modelos simultaneamente.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const isInCompare = (productId: string) => compareList.includes(productId);

  const clearCompare = () => setCompareList([]);

  // Quotes & Orders
  const submitQuote = async (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setQuotes((prev) => [newQuote, ...prev]);
    return newQuote;
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'code' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      code: `GR-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'novo',
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // WhatsApp & Instagram Handlers
  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg = 'Olá! Estou no site da GR Instrumentos de Pesagem e gostaria de falar com um especialista sobre soluções de pesagem.';
    const text = encodeURIComponent(customMessage || defaultMsg);
    const cleanNumber = settings.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  const openInstagram = () => {
    window.open(settings.instagramUrl, '_blank');
  };

  const openQuickQuote = (product?: Product) => {
    setQuickQuoteProduct(product || null);
    setIsQuickQuoteOpen(true);
  };

  const closeQuickQuote = () => {
    setIsQuickQuoteOpen(false);
    setQuickQuoteProduct(null);
  };

  // Admin handlers
  const addProduct = (productData: Omit<Product, 'id' | 'slug'>) => {
    const id = `prod-${Date.now()}`;
    const slug = productData.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newProduct: Product = {
      ...productData,
      id,
      slug,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const resetAllData = () => {
    setProducts(initialProducts);
    setSettings(initialSettings);
    localStorage.removeItem('gr_products');
    localStorage.removeItem('gr_settings');
    alert('Catálogo e configurações restaurados para os padrões oficiais.');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        settings,
        cart,
        wishlist,
        compareList,
        quotes,
        orders,
        blogPosts,
        currentView,
        selectedProduct,
        selectedCategorySlug,
        selectedBlogPost,
        searchQuery,
        isCartOpen,
        isQuickQuoteOpen,
        quickQuoteProduct,
        navigateTo,
        openProductDetail,
        openCategory,
        openBlogPost,
        setSearchQuery,
        setIsCartOpen,
        openQuickQuote,
        closeQuickQuote,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        clearCompare,
        submitQuote,
        createOrder,
        openWhatsApp,
        openInstagram,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        updateQuoteStatus,
        updateOrderStatus,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
