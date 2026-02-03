import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { 
  Award, 
  Users, 
  Shield, 
  BookOpen, 
  ArrowRight,
  Star,
  GraduationCap,
  Heart
} from 'lucide-react';

export function Scholarships() {
  const { openApplyNowModal } = useLeadCapture();

  const scholarships = [
    {
      id: 1,
      name: 'SITM Academic Excellence Scholarship',
      icon: <Award className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      description: 'Recognizing outstanding academic achievements'
    },
    {
      id: 2,
      name: 'SITM Women of Excellence Scholarship',
      icon: <Users className="w-8 h-8" />,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800',
      description: 'Empowering women in technology and innovation'
    },
    {
      id: 3,
      name: 'SITM Defence Services Scholarship',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      description: 'Honoring our defense personnel and their families'
    },
    {
      id: 4,
      name: 'Scholars Legacy Scholarship',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      description: 'Building a legacy of academic excellence'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-sitm-navy via-sitm-maroon to-sitm-navy overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ 
              rotate: -360,
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ 
              rotate: 360,
              x: [0, 15, 0]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-white rounded-full"
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.5 }}
              className="flex justify-center mb-6"
            >
              <motion.div 
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 40px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Award className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                SITM 
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {" "}Scholarships
              </motion.span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Empowering Dreams, Enabling Excellence
            </p>

            {/* Stats integrated into hero */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 cursor-pointer"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-3xl font-bold text-white mb-1"
                >
                  ₹2Cr+
                </motion.div>
                <div className="text-white/80 text-sm">Scholarships Awarded</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 cursor-pointer"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-3xl font-bold text-white mb-1"
                >
                  500+
                </motion.div>
                <div className="text-white/80 text-sm">Students Benefited</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 cursor-pointer"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="text-3xl font-bold text-white mb-1"
                >
                  4
                </motion.div>
                <div className="text-white/80 text-sm">Scholarship Programs</div>
              </motion.div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
            >
              At SITM, we believe that financial constraints should never be a barrier to quality education. 
              Discover our scholarship programs designed to support deserving students.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={openApplyNowModal}
                  size="lg"
                  className="bg-white text-sitm-navy hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                >
                  Apply for Scholarships
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="ml-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Remove the separate stats section */}

      {/* Scholarships Grid */}
      <section className="py-20 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Available Scholarship Programs
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Choose from our diverse range of scholarship opportunities designed to support students from all backgrounds.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`${scholarship.bgColor} ${scholarship.borderColor} border rounded-2xl p-8 hover:shadow-2xl hover:shadow-sitm-maroon/20 hover:-translate-y-2 hover:scale-105 transition-all duration-300 group cursor-pointer transform`}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${scholarship.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {scholarship.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sitm-maroon dark:group-hover:text-sitm-gold transition-colors">
                      {scholarship.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {scholarship.description}
                    </p>
                    
                    <div className="flex items-center text-sitm-maroon dark:text-sitm-gold font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm">Learn More</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sitm-navy to-sitm-maroon">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Your Dreams Matter to Us
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-white/90 mb-8"
            >
              Don't let financial barriers stop you from achieving excellence. 
              Apply now and take the first step towards your bright future.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={openApplyNowModal}
                  size="lg"
                  className="bg-white text-sitm-navy hover:bg-gray-100 font-semibold px-8 py-4"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mr-2"
                  >
                    <GraduationCap className="w-5 h-5" />
                  </motion.div>
                  Start Your Application
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-sitm-navy font-semibold px-8 py-4"
                  onClick={() => window.location.href = 'mailto:scholarships@sitm.ac.in'}
                >
                  Contact Scholarship Office
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* White space before footer */}
      <section className="py-16 bg-white dark:bg-slate-900">
      </section>

      <Footer />
    </div>
  );
}