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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
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
            y: -10,
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          viewport={{ once: false }}
          transition={{ 
            duration: 0.6,
            delay: index * 0.1
          }}
          className={`${bank.bgColor} dark:bg-slate-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-700`}
        >
          <div className="mb-3 h-20 flex items-center justify-center p-2">
            <img 
              src={bank.logo} 
              alt={`${bank.name} logo`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
            {bank.name}
          </h3>
        </motion.div>
      ))}
    </div>
  );
}