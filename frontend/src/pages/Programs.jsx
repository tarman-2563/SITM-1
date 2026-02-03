import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { 
  BookOpen, 
  DollarSign, 
  CreditCard, 
  GraduationCap,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Building,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

export function Programs() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [expandedSemester, setExpandedSemester] = useState(null);

  // Program data structure
  const programs = {
    'mechanical-engineering': {
      title: 'Mechanical Engineering',
      duration: '4 Years',
      intake: 60,
      description: 'Focuses on Robotics, Autos, Thermodynamics, and Advanced Manufacturing. Includes workshops on CNC and 3D Printing.',
      fees: {
        tuitionFee: '₹1,20,000',
        hostelFee: '₹80,000',
        examFee: '₹5,000',
        totalPerYear: '₹2,05,000'
      },
      syllabus: [
        {
          semester: 'Semester 1',
          subjects: [
            'Engineering Mathematics I',
            'Engineering Physics',
            'Engineering Chemistry',
            'Engineering Graphics',
            'Basic Electrical Engineering',
            'Workshop Practice'
          ]
        },
        {
          semester: 'Semester 2',
          subjects: [
            'Engineering Mathematics II',
            'Engineering Mechanics',
            'Material Science',
            'Thermodynamics',
            'Computer Programming',
            'Engineering Drawing'
          ]
        },
        {
          semester: 'Semester 3',
          subjects: [
            'Strength of Materials',
            'Fluid Mechanics',
            'Manufacturing Processes',
            'Machine Drawing',
            'Kinematics of Machines',
            'Heat Transfer'
          ]
        },
        {
          semester: 'Semester 4',
          subjects: [
            'Dynamics of Machines',
            'Fluid Machinery',
            'Metrology & Quality Control',
            'Automobile Engineering',
            'Industrial Engineering',
            'Mechanical Vibrations'
          ]
        }
      ]
    },
    'computer-science-engineering': {
      title: 'Computer Science Engineering',
      duration: '4 Years',
      intake: 60,
      description: 'Specialization in AI, ML, Data Science, and Software Development.',
      fees: {
        tuitionFee: '₹1,40,000',
        hostelFee: '₹80,000',
        examFee: '₹5,000',
        totalPerYear: '₹2,25,000'
      },
      syllabus: [
        {
          semester: 'Semester 1',
          subjects: [
            'Engineering Mathematics I',
            'Engineering Physics',
            'Programming in C',
            'Digital Logic Design',
            'Communication Skills',
            'Environmental Studies'
          ]
        },
        {
          semester: 'Semester 2',
          subjects: [
            'Engineering Mathematics II',
            'Data Structures',
            'Object Oriented Programming',
            'Computer Organization',
            'Discrete Mathematics',
            'Technical Writing'
          ]
        },
        {
          semester: 'Semester 3',
          subjects: [
            'Database Management Systems',
            'Computer Networks',
            'Operating Systems',
            'Software Engineering',
            'Web Technologies',
            'Algorithm Analysis'
          ]
        },
        {
          semester: 'Semester 4',
          subjects: [
            'Machine Learning',
            'Artificial Intelligence',
            'Mobile App Development',
            'Cloud Computing',
            'Cybersecurity',
            'Project Management'
          ]
        }
      ]
    }
  };

  // Bank partners for loans
  const bankPartners = [
    {
      name: 'State Bank of India',
      logo: '🏦',
      interestRate: '8.5% - 10.5%',
      maxAmount: '₹30 Lakhs',
      processingTime: '7-10 days'
    },
    {
      name: 'HDFC Bank',
      logo: '🏛️',
      interestRate: '9.0% - 11.0%',
      maxAmount: '₹25 Lakhs',
      processingTime: '5-7 days'
    },
    {
      name: 'ICICI Bank',
      logo: '🏢',
      interestRate: '8.8% - 10.8%',
      maxAmount: '₹35 Lakhs',
      processingTime: '7-14 days'
    },
    {
      name: 'Axis Bank',
      logo: '🏪',
      interestRate: '9.2% - 11.2%',
      maxAmount: '₹20 Lakhs',
      processingTime: '5-10 days'
    }
  ];

  // Get current program or default to first one
  const currentProgram = programs[programId] || programs['mechanical-engineering'];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [programId]);

  const toggleSemester = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-16 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-sitm-maroon/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-sitm-maroon" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {currentProgram.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {currentProgram.description}
            </p>

            {/* Program Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <Clock className="w-6 h-6 text-sitm-maroon mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{currentProgram.duration}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Duration</div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <Users className="w-6 h-6 text-sitm-maroon mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{currentProgram.intake}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Seats Available</div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <DollarSign className="w-6 h-6 text-sitm-maroon mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{currentProgram.fees.totalPerYear}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Per Year</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Selection Dropdown */}
      <section className="py-8 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <select
              value={programId || 'mechanical-engineering'}
              onChange={(e) => navigate(`/programs/${e.target.value}`)}
              className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-sitm-maroon"
            >
              <option value="mechanical-engineering">Mechanical Engineering</option>
              <option value="computer-science-engineering">Computer Science Engineering</option>
              <option value="civil-engineering">Civil Engineering</option>
              <option value="electrical-engineering">Electrical & Electronics Engineering</option>
              <option value="electronics-communication">Electronics & Communication Engineering</option>
              <option value="business-administration">Bachelor of Business Administration</option>
              <option value="computer-applications">Bachelor of Computer Applications</option>
              <option value="data-science">Data Science</option>
            </select>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-24 relative bg-gray-50 dark:bg-slate-950 overflow-hidden">
        {/* Background Aurora/Glow Graphics */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Subtle Geometric Dot Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.1]"
            style={{ 
              backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
              backgroundSize: "30px 30px"
            }}
          ></div>

          {/* Large Book Icon - Top Right */}
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
            {currentProgram.syllabus.map((semester, index) => (
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
        {/* Background Graphics */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Large Dollar Icon - Top Left */}
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
                  <span className="text-gray-700 dark:text-gray-300 text-lg">Tuition Fee</span>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">{currentProgram.fees.tuitionFee}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-slate-700"
                >
                  <span className="text-gray-700 dark:text-gray-300 text-lg">Hostel Fee (Optional)</span>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">{currentProgram.fees.hostelFee}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-slate-700"
                >
                  <span className="text-gray-700 dark:text-gray-300 text-lg">Examination Fee</span>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">{currentProgram.fees.examFee}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-between items-center py-6 bg-gradient-to-r from-sitm-gold/10 to-sitm-maroon/10 px-6 rounded-2xl border-2 border-sitm-gold/20"
                >
                  <span className="font-bold text-xl text-gray-900 dark:text-white">Total Per Year</span>
                  <span className="font-bold text-3xl text-sitm-maroon">{currentProgram.fees.totalPerYear}</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-8"
            >
              <h4 className="font-bold text-xl text-blue-900 dark:text-blue-300 mb-4">Payment Options</h4>
              <ul className="text-blue-800 dark:text-blue-200 space-y-2">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Annual payment with 5% discount
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Semester-wise payment available
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  EMI options through bank partners
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Scholarship opportunities available
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loans & EMI Section */}
      <section className="py-24 relative bg-gray-50 dark:bg-slate-950 overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Subtle Geometric Dot Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.1]"
            style={{ 
              backgroundImage: `radial-gradient(#D56B6F 1px, transparent 1px)`,
              backgroundSize: "30px 30px"
            }}
          ></div>

          {/* Large Credit Card Icon - Bottom Right */}
          <motion.div
            animate={{ 
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[5%] right-[5%] opacity-[0.08] dark:opacity-[0.05]"
          >
            <CreditCard className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
          </motion.div>

          <motion.div 
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[15%] -left-[10%] w-[55%] h-[55%] bg-[#F6E294]/20 rounded-full blur-[110px]"
          />
          <motion.div 
            animate={{ 
              x: [0, 90, 0],
              y: [0, -70, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -right-[12%] w-[50%] h-[50%] bg-[#D56B6F]/15 rounded-full blur-[100px]"
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
              Education Loans & EMI
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Flexible financing options to support your education journey
            </p>
          </motion.div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {bankPartners.map((bank, index) => (
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
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.1
                }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-white/20 shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{bank.logo}</div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">{bank.name}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Interest Rate</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{bank.interestRate}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Max Amount</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{bank.maxAmount}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Processing Time</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{bank.processingTime}</span>
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-sitm-maroon to-sitm-navy text-white rounded-2xl font-bold text-lg uppercase tracking-wider hover:shadow-lg transition-all duration-300"
                >
                  Apply Now
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Loan Information */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-white/20 shadow-xl p-8"
          >
            <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8 text-center">
              Education Loan Benefits
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Key Features</h4>
                <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sitm-maroon rounded-full"></div>
                    No collateral required up to ₹7.5 lakhs
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sitm-maroon rounded-full"></div>
                    Moratorium period during studies
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sitm-maroon rounded-full"></div>
                    Tax benefits under Section 80E
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sitm-maroon rounded-full"></div>
                    Flexible repayment options
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-4">Required Documents</h4>
                <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sitm-gold rounded-full"></div>
                    Admission letter from SITM
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sitm-gold rounded-full"></div>
                    Academic records
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sitm-gold rounded-full"></div>
                    Income proof of co-applicant
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sitm-gold rounded-full"></div>
                    Identity and address proof
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-sitm-navy dark:bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            Need More Information?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-white">
              <Phone className="w-5 h-5 text-sitm-gold" />
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-gray-300">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-white">
              <Mail className="w-5 h-5 text-sitm-gold" />
              <div>
                <p className="font-medium">Email Us</p>
                <p className="text-gray-300">admissions@sitm.ac.in</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-white">
              <MapPin className="w-5 h-5 text-sitm-gold" />
              <div>
                <p className="font-medium">Visit Us</p>
                <p className="text-gray-300">SITM Campus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}