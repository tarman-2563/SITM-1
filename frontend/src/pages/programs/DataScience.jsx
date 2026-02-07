import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BankPartners } from '../../components/common/BankPartners';
import { 
  BookOpen, 
  DollarSign, 
  CreditCard,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  BarChart3,
  ArrowLeft
} from 'lucide-react';

export function DataScience() {
  const [expandedSemester, setExpandedSemester] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const programData = {
    title: 'Data Science',
    shortTitle: 'Data Science',
    duration: '3 Years',
    intake: 40,
    description: 'Deep dive into statistical modeling, big data analytics, and machine learning with hands-on experience in modern data science tools and techniques.',
    fees: {
      tuitionFee: '₹1,83,625',
      hostelFeePerSemester: '₹47,500',
      examFee: '₹5,000',
      totalPerYear: '₹2,78,625'
    },
    syllabus: [
      {
        semester: 'Semester 1',
        subjects: [
          'Mathematics for Data Science',
          'Programming in Python',
          'Statistics and Probability',
          'Data Structures & Algorithms',
          'Database Management Systems',
          'Communication Skills'
        ]
      },
      {
        semester: 'Semester 2',
        subjects: [
          'Advanced Statistics',
          'Data Visualization',
          'Machine Learning Fundamentals',
          'SQL and NoSQL Databases',
          'Linear Algebra',
          'Research Methodology'
        ]
      },
      {
        semester: 'Semester 3',
        subjects: [
          'Machine Learning Algorithms',
          'Big Data Analytics',
          'Data Mining Techniques',
          'Web Scraping & APIs',
          'Business Intelligence',
          'Ethics in Data Science'
        ]
      },
      {
        semester: 'Semester 4',
        subjects: [
          'Deep Learning',
          'Natural Language Processing',
          'Time Series Analysis',
          'Cloud Computing for Data Science',
          'A/B Testing',
          'Mini Project'
        ]
      },
      {
        semester: 'Semester 5',
        subjects: [
          'Advanced Deep Learning',
          'Computer Vision',
          'Reinforcement Learning',
          'MLOps and Model Deployment',
          'Elective I',
          'Industry Internship'
        ]
      },
      {
        semester: 'Semester 6',
        subjects: [
          'Advanced Analytics',
          'Data Science Capstone',
          'Entrepreneurship in Tech',
          'Industry Applications',
          'Elective II',
          'Major Project'
        ]
      }
    ]
  };

  const toggleSemester = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      
      {/* Back Link */}
      <section className="pt-32 pb-4 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Link to="/#programs" className="inline-flex items-center gap-2 text-sitm-maroon dark:text-sitm-gold hover:underline mb-4">
            <ArrowLeft size={16} />
            Back to Programs
          </Link>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="relative pb-16 bg-gray-50 dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.1]"
            style={{ 
              backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
              backgroundSize: "30px 30px"
            }}
          ></div>

          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] right-[5%] opacity-[0.08] dark:opacity-[0.05]"
          >
            <BarChart3 className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
          </motion.div>

          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#F6E294]/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              x: [0, 70, 0],
              y: [0, -100, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] -left-[15%] w-[60%] h-[60%] bg-[#D56B6F]/20 rounded-full blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-sitm-maroon/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-sitm-maroon" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {programData.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {programData.description}
            </p>

            {/* Program Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <Clock className="w-6 h-6 text-sitm-maroon mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{programData.duration}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Duration</div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <Users className="w-6 h-6 text-sitm-maroon mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{programData.intake}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Seats Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-24 relative bg-gray-50 dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.1]"
            style={{ 
              backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
              backgroundSize: "30px 30px"
            }}
          ></div>

          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] right-[5%] opacity-[0.08] dark:opacity-[0.05]"
          >
            <BookOpen className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
          </motion.div>

          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#F6E294]/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              x: [0, 70, 0],
              y: [0, -100, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] -left-[15%] w-[60%] h-[60%] bg-[#D56B6F]/20 rounded-full blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-sitm-maroon dark:text-sitm-gold font-bold uppercase tracking-widest text-sm">
              Academic Excellence
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-sitm-navy dark:text-white mt-4">
              Course Syllabus
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Comprehensive curriculum designed for industry readiness
            </p>
          </motion.div>
            
          <div className="space-y-4">
            {programData.syllabus.map((semester, index) => (
              <motion.div 
                key={index} 
                initial={{ 
                  x: index % 2 === 0 ? -100 : 100, 
                  opacity: 0 
                }}
                whileInView={{ 
                  x: 0, 
                  opacity: 1 
                }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.1
                }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-white/20 shadow-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSemester(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                    {semester.semester}
                  </h3>
                  {expandedSemester === index ? (
                    <ChevronUp className="w-6 h-6 text-sitm-maroon" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-sitm-maroon" />
                  )}
                </button>
                
                {expandedSemester === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-8 pb-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {semester.subjects.map((subject, subIndex) => (
                        <motion.div 
                          key={subIndex} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: subIndex * 0.05 }}
                          className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700"
                        >
                          <BookOpen className="w-5 h-5 text-sitm-maroon flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{subject}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className="py-24 relative bg-white dark:bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, 0],
              x: [0, 10, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] opacity-[0.06] dark:opacity-[0.04]"
          >
            <DollarSign className="w-72 h-72 text-sitm-maroon dark:text-sitm-gold" strokeWidth={1} />
          </motion.div>

          <motion.div 
            animate={{ 
              x: [0, 80, 0],
              y: [0, -60, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[5%] -left-[10%] w-[45%] h-[45%] bg-[#D56B6F]/15 rounded-full blur-[90px]"
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-sitm-maroon dark:text-sitm-gold font-bold uppercase tracking-widest text-sm">
              Investment in Future
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-sitm-navy dark:text-white mt-4">
              Fee Structure
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Transparent and affordable education investment
            </p>
          </motion.div>
            
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-sitm-navy to-sitm-maroon text-white px-8 py-6">
                <h3 className="text-2xl font-serif font-bold">Annual Fee Breakdown</h3>
              </div>
              
              <div className="p-8 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-slate-700"
                >
                  <span className="text-gray-700 dark:text-gray-300 text-lg">Yearly Fee</span>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">{programData.fees.tuitionFee}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Hostel Fee Per Semester</span>
                  <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{programData.fees.hostelFeePerSemester}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bank Partners Section */}
      <section className="py-24 relative bg-gray-50 dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.1]"
            style={{ 
              backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
              backgroundSize: "30px 30px"
            }}
          ></div>

          <motion.div
            animate={{ 
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[5%] opacity-[0.06] dark:opacity-[0.04]"
          >
            <CreditCard className="w-64 h-64 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
          </motion.div>

          <motion.div 
            animate={{ 
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] -left-[8%] w-[45%] h-[45%] bg-[#F6E294]/15 rounded-full blur-[100px]"
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-sitm-maroon dark:text-sitm-gold font-bold uppercase tracking-widest text-sm">
              Financial Support
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-sitm-navy dark:text-white mt-4">
              Bank Partners
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Education loan facilities available through our banking partners
            </p>
          </motion.div>
            
          <BankPartners />
        </div>
      </section>

      <Footer />
    </div>
  );
}