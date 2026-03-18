import React from 'react';
import { 
  DocumentTextIcon, 
  ChartBarIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Instant Invoicing',
    description: 'Generate and send professional invoices in seconds. Impress your clients with sleek, modern designs.',
    icon: DocumentTextIcon,
    color: 'from-green-400 to-emerald-500'
  },
  {
    name: 'Expense Tracking',
    description: 'Monitor your spending with real-time analytics. Visualize your cash flow with intuitive dashboards.',
    icon: ChartBarIcon,
    color: 'from-purple-400 to-indigo-500'
  },
  {
    name: 'Global Payments',
    description: 'Accept payments in multiple currencies. Scale your business globally without worrying about conversion.',
    icon: GlobeAltIcon,
    color: 'from-blue-400 to-cyan-500'
  },
  {
    name: 'Tax Compliance',
    description: 'Built-in tax calculations and reporting. Stay compliant and ready for tax season with ease.',
    icon: ShieldCheckIcon,
    color: 'from-orange-400 to-red-500'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-black relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-green-400 text-sm font-bold uppercase tracking-widest mb-3">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Everything you need to <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">master your finances.</span>
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            HisabKitab provides a comprehensive suite of tools designed to simplify your billing process and give you total control over your business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{feature.name}</h4>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
