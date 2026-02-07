import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BankPartners } from '../../components/common/BankPartners';
import { Cog, Clock, Users, DollarSign, CreditCard, BookOpen, ArrowLeft } from 'lucide-react';

export function ME() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />

      <section className="pt-32 pb-4 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Link to="/programs/engineering" className="inline-flex items-center gap-2 text-sitm-maroon dark:text-sitm-gold hover:underline mb-4">
            <ArrowLeft size={16} />
            Back to Engineering Programs
          </Link>
        </div>
      </section>

      <section className="pb-12 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-sitm-maroon to-sitm-navy rounded-2xl flex items-center justify-center shadow-xl">
                <Cog className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Mechanical Engineering
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive program in mechanical design, manufacturing, thermodynamics, and automation with hands-on laboratory experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative h-96 bg-gradient-to-br from-sitm-navy/10 to-sitm-maroon/10 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-slate-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Cog className="w-24 h-24 text-sitm-maroon/30 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Mechanical Engineering Program Image</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center">
              <Clock className="w-8 h-8 text-sitm-maroon mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4 Years</div>
              <div className="text-gray-600 dark:text-gray-400">Duration (8 Semesters)</div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center">
              <BookOpen className="w-8 h-8 text-sitm-maroon mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">AICTE</div>
              <div className="text-gray-600 dark:text-gray-400">Approved Program</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Curriculum
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sitm-maroon to-sitm-gold mx-auto mb-6"></div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-12 border border-gray-200 dark:border-slate-700">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Curriculum details coming soon</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Fee Structure
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sitm-maroon to-sitm-gold mx-auto"></div>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border-2 border-sitm-maroon/20 dark:border-sitm-gold/20 shadow-lg">
              {/* Header */}
              <div className="bg-gradient-to-r from-sitm-navy to-sitm-maroon p-4">
                <h3 className="text-lg font-bold text-white">Per Semester Fee Breakdown</h3>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Tuition Fee */}
                <div className="flex justify-between items-center pb-6 border-b border-gray-200 dark:border-slate-700">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Tuition Fee</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">₹91,812</span>
                </div>

                {/* Hostel Fee */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Hostel Fee (Optional)</span>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">₹47,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Partners */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <BankPartners />
        </div>
      </section>

      <Footer />
    </div>
  );
}
