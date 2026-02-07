import { motion } from 'framer-motion';

export function BankPartners() {
  const bankPartners = [
    {
      name: 'State Bank of India',
      bgColor: 'bg-blue-50',
      logo: '/images/banks/sbi.png',
      color: 'blue'
    },
    {
      name: 'HDFC Bank',
      bgColor: 'bg-red-50',
      logo: '/images/banks/hdfc.png',
      color: 'red'
    },
    {
      name: 'ICICI Bank',
      bgColor: 'bg-orange-50',
      logo: '/images/banks/icici.png',
      color: 'orange'
    },
    {
      name: 'Punjab National Bank',
      bgColor: 'bg-green-50',
      logo: '/images/banks/pnb.png',
      color: 'green'
    },
    {
      name: 'Bank of Baroda',
      bgColor: 'bg-indigo-50',
      logo: '/images/banks/bob.png',
      color: 'indigo'
    },
    {
      name: 'Canara Bank',
      bgColor: 'bg-yellow-50',
      logo: '/images/banks/canara.png',
      color: 'yellow'
    },
    {
      name: 'Union Bank',
      bgColor: 'bg-pink-50',
      logo: '/images/banks/ub.png',
      color: 'pink'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-8">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm text-sitm-maroon dark:text-sitm-gold font-semibold uppercase tracking-wider mb-3">
          Financial Support
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-sitm-navy dark:text-white mb-4">
          Bank Partners
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Education loan facilities available through our banking partners
        </p>
      </div>

      {/* Bank Logos Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
        {bankPartners.map((bank, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              y: 50
            }}
            whileInView={{ 
              opacity: 1,
              y: 0
            }}
            whileHover={{ 
              y: -8,
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            viewport={{ once: false }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1
            }}
            className="relative group"
          >
            {/* Light glow in light mode, pinkish-red glow in dark mode */}
            <div className="absolute -inset-0.5 bg-gray-300/30 dark:bg-rose-400/30 rounded-xl blur-sm group-hover:bg-gray-400/50 dark:group-hover:bg-rose-500/50 transition-all duration-300"></div>
            
            {/* Main card with increased height and colored background */}
            <div className={`relative ${bank.bgColor} dark:bg-slate-800 rounded-xl p-4 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-300 dark:border-rose-400 min-h-[140px] flex flex-col justify-between overflow-hidden`}>
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/60 dark:via-rose-400/40 to-transparent"></div>
              
              <div className="mb-2 h-16 flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-lg relative z-10">
              <img 
                src={bank.logo} 
                alt={`${bank.name} logo`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center w-full h-full">
                <span className={`text-lg font-bold text-${bank.color}-600`}>
                  {bank.name.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
            </div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-tight relative z-10 mt-auto">
              {bank.name}
            </h3>
          </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}