import React from 'react';
import { Target, Headphones, Layers, Zap } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const items = [
    {
      icon: <Target className="w-6 h-6 text-orange-500 flex-shrink-0" />,
      title: 'PRECISÃO',
      description: 'Equipamentos calibrados para diferentes aplicações industriais e agrícolas',
    },
    {
      icon: <Headphones className="w-6 h-6 text-orange-500 flex-shrink-0" />,
      title: 'ATENDIMENTO',
      description: 'Suporte especializado com consultoria técnica direta',
    },
    {
      icon: <Layers className="w-6 h-6 text-orange-500 flex-shrink-0" />,
      title: 'SOLUÇÕES',
      description: 'Equipamentos adequados exatamente à necessidade da sua operação',
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-500 flex-shrink-0" />,
      title: 'ORÇAMENTO ÁGIL',
      description: 'Atendimento comercial rápido e cotação direta pelo WhatsApp',
    },
  ];

  return (
    <div className="w-full bg-slate-50 border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-4 pt-4 sm:pt-0 ${idx !== 0 ? 'sm:pl-6' : ''}`}
            >
              <div className="p-2.5 rounded-xl bg-orange-100 border border-orange-200">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase font-mono">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
