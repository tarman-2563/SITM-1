import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BankPartners } from '../../components/common/BankPartners';
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
  Layers,
  Cpu,
  Terminal,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export function Engineering() {
  const { branch } = useParams();
  const [expandedSemester, setExpandedSemester] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [branch]);

  // Engineering branches data
  const branches = {
    cse: {
      title: 'Computer Science Engineering',
      shortTitle: 'CSE',
      icon: <Cpu className="w-8 h-8" />,
      description: 'Specialization in AI, ML, Data Science, and Software Development with cutting-edge technology and industry-relevant curriculum.',
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
        },
        {
          semester: 'Semester 5',
          subjects: [
            'Advanced Data Structures',
            'Compiler Design',
            'Computer Graphics',
            'Distributed Systems',
            'Elective I',
            'Mini Project'
          ]
        },
        {
          semester: 'Semester 6',
          subjects: [
            'Big Data Analytics',
            'Internet of Things',
            'Blockchain Technology',
            'DevOps',
            'Elective II',
            'Industry Internship'
          ]
        },
        {
          semester: 'Semester 7',
          subjects: [
            'Deep Learning',
            'Natural Language Processing',
            'Advanced Cybersecurity',
            'Elective III',
            'Elective IV',
            'Major Project I'
          ]
        },
        {
          semester: 'Semester 8',
          subjects: [
            'Entrepreneurship Development',
            'Advanced AI Applications',
            'Quantum Computing',
            'Elective V',
            'Major Project II',
            'Industrial Training'
          ]
        }
      ]
    },
    ece: {
      title: 'Electronics & Communication Engineering',
      shortTitle: 'ECE',
      icon: <Terminal className="w-8 h-8" />,
      description: 'Focuses on VLSI, IoT, Embedded Systems, and Telecommunication with advanced laboratory facilities and industry partnerships.',
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
            'Engineering Mathematics I',
            'Engineering Physics',
            'Basic Electronics',
            'Circuit Analysis',
            'Communication Skills',
            'Environmental Studies'
          ]
        },
        {
          semester: 'Semester 2',
          subjects: [
            'Engineering Mathematics II',
            'Electronic Devices',
            'Digital Electronics',
            'Network Analysis',
            'Programming in C',
            'Technical Writing'
          ]
        },
        {
          semester: 'Semester 3',
          subjects: [
            'Analog Electronics',
            'Digital Signal Processing',
            'Electromagnetic Theory',
            'Control Systems',
            'Microprocessors',
            'Electronic Measurements'
          ]
        },
        {
          semester: 'Semester 4',
          subjects: [
            'Communication Systems',
            'VLSI Design',
            'Embedded Systems',
            'Antenna Theory',
            'Power Electronics',
            'Linear IC Applications'
          ]
        },
        {
          semester: 'Semester 5',
          subjects: [
            'Digital Communication',
            'Microwave Engineering',
            'Computer Networks',
            'Digital Image Processing',
            'Elective I',
            'Mini Project'
          ]
        },
        {
          semester: 'Semester 6',
          subjects: [
            'Optical Communication',
            'Internet of Things',
            'Wireless Communication',
            'Robotics',
            'Elective II',
            'Industry Internship'
          ]
        },
        {
          semester: 'Semester 7',
          subjects: [
            'Advanced VLSI Design',
            'Satellite Communication',
            'Machine Learning for ECE',
            'Elective III',
            'Elective IV',
            'Major Project I'
          ]
        },
        {
          semester: 'Semester 8',
          subjects: [
            'Entrepreneurship Development',
            '5G Technology',
            'Advanced Embedded Systems',
            'Elective V',
            'Major Project II',
            'Industrial Training'
          ]
        }
      ]
    },
    me: {
      title: 'Mechanical Engineering',
      shortTitle: 'ME',
      icon: <Layers className="w-8 h-8" />,
      description: 'Focuses on Robotics, Autos, Thermodynamics, and Advanced Manufacturing. Includes workshops on CNC and 3D Printing.',
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
        },
        {
          semester: 'Semester 5',
          subjects: [
            'Design of Machine Elements',
            'Thermal Engineering',
            'Operations Research',
            'CAD/CAM',
            'Robotics & Automation',
            'Elective I'
          ]
        },
        {
          semester: 'Semester 6',
          subjects: [
            'Advanced Manufacturing',
            'Finite Element Analysis',
            'Project Management',
            'Renewable Energy Systems',
            'Elective II',
            'Mini Project'
          ]
        },
        {
          semester: 'Semester 7',
          subjects: [
            'Advanced Materials',
            'Mechatronics',
            'Industrial Safety',
            'Elective III',
            'Elective IV',
            'Major Project I'
          ]
        },
        {
          semester: 'Semester 8',
          subjects: [
            'Entrepreneurship Development',
            'Advanced Robotics',
            'Elective V',
            'Elective VI',
            'Major Project II',
            'Industrial Training'
          ]
        }
      ]
    },
    ce: {
      title: 'Civil Engineering',
      shortTitle: 'CE',
      icon: <Building className="w-8 h-8" />,
      description: 'Studies Structural Engineering, Geotechnical Engineering, and Infrastructure Development with modern construction techniques.',
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
            'Engineering Mathematics I',
            'Engineering Physics',
            'Engineering Chemistry',
            'Engineering Graphics',
            'Basic Electrical Engineering',
            'Environmental Studies'
          ]
        },
        {
          semester: 'Semester 2',
          subjects: [
            'Engineering Mathematics II',
            'Engineering Mechanics',
            'Strength of Materials',
            'Fluid Mechanics',
            'Surveying',
            'Building Materials'
          ]
        },
        {
          semester: 'Semester 3',
          subjects: [
            'Structural Analysis',
            'Geotechnical Engineering',
            'Hydraulics',
            'Construction Technology',
            'Transportation Engineering',
            'Concrete Technology'
          ]
        },
        {
          semester: 'Semester 4',
          subjects: [
            'Design of Concrete Structures',
            'Foundation Engineering',
            'Water Resources Engineering',
            'Highway Engineering',
            'Environmental Engineering',
            'Quantity Surveying'
          ]
        },
        {
          semester: 'Semester 5',
          subjects: [
            'Design of Steel Structures',
            'Advanced Geotechnical Engineering',
            'Irrigation Engineering',
            'Traffic Engineering',
            'Elective I',
            'Mini Project'
          ]
        },
        {
          semester: 'Semester 6',
          subjects: [
            'Advanced Structural Design',
            'Construction Management',
            'Water Treatment Engineering',
            'Urban Planning',
            'Elective II',
            'Industry Internship'
          ]
        },
        {
          semester: 'Semester 7',
          subjects: [
            'Earthquake Engineering',
            'Project Management',
            'Advanced Construction Techniques',
            'Elective III',
            'Elective IV',
            'Major Project I'
          ]
        },
        {
          semester: 'Semester 8',
          subjects: [
            'Entrepreneurship Development',
            'Smart Cities',
            'Sustainable Construction',
            'Elective V',
            'Major Project II',
            'Industrial Training'
          ]
        }
      ]
    },
    eee: {
      title: 'Electrical & Electronics Engineering',
      shortTitle: 'EEE',
      icon: <Lightbulb className="w-8 h-8" />,
      description: 'Covers power systems, electrical machines, and control systems with modern lab facilities and renewable energy focus.',
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
            'Engineering Mathematics I',
            'Engineering Physics',
            'Basic Electrical Engineering',
            'Circuit Analysis',
            'Communication Skills',
            'Environmental Studies'
          ]
        },
        {
          semester: 'Semester 2',
          subjects: [
            'Engineering Mathematics II',
            'Network Analysis',
            'Electronic Devices',
            'Digital Electronics',
            'Programming in C',
            'Technical Writing'
          ]
        },
        {
          semester: 'Semester 3',
          subjects: [
            'Electrical Machines I',
            'Control Systems',
            'Power Electronics',
            'Electromagnetic Theory',
            'Measurements & Instrumentation',
            'Analog Electronics'
          ]
        },
        {
          semester: 'Semester 4',
          subjects: [
            'Electrical Machines II',
            'Power Systems I',
            'Microprocessors',
            'Digital Signal Processing',
            'Industrial Electronics',
            'Linear IC Applications'
          ]
        },
        {
          semester: 'Semester 5',
          subjects: [
            'Power Systems II',
            'Electric Drives',
            'Renewable Energy Systems',
            'HVDC Transmission',
            'Elective I',
            'Mini Project'
          ]
        },
        {
          semester: 'Semester 6',
          subjects: [
            'Power System Protection',
            'Smart Grid Technology',
            'Electric Vehicle Technology',
            'Industrial Automation',
            'Elective II',
            'Industry Internship'
          ]
        },
        {
          semester: 'Semester 7',
          subjects: [
            'Advanced Power Electronics',
            'Energy Management',
            'Power Quality',
            'Elective III',
            'Elective IV',
            'Major Project I'
          ]
        },
        {
          semester: 'Semester 8',
          subjects: [
            'Entrepreneurship Development',
            'Sustainable Energy',
            'Advanced Control Systems',
            'Elective V',
            'Major Project II',
            'Industrial Training'
          ]
        }
      ]
    }
  };













  const toggleSemester = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  // If no branch is selected, show branch selection
  if (!branch) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-36 pb-24 bg-gray-50 dark:bg-slate-950 overflow-hidden">
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
              <GraduationCap className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-sitm-maroon to-sitm-navy rounded-full flex items-center justify-center shadow-xl">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6"
              >
                Engineering Excellence
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
              >
                Discover your path in engineering with our specialized programs designed for innovation, 
                industry readiness, and technological advancement
              </motion.p>

              {/* Quick Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-8 mb-16"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-sitm-maroon mb-1">5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Branches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sitm-maroon mb-1">4</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sitm-maroon mb-1">60</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Seats Each</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sitm-maroon mb-1">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Industry Ready</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Branch Selection */}
        <section className="py-24 relative bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-sitm-maroon dark:text-sitm-gold font-bold uppercase tracking-widest text-sm">
                Choose Your Specialization
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-sitm-navy dark:text-white mt-4 mb-6">
                Engineering Branches
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-sitm-maroon to-sitm-gold mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(branches).map(([key, branchData], index) => (
                <motion.div
                  key={key}
                  initial={{ 
                    opacity: 0,
                    y: 50
                  }}
                  whileInView={{ 
                    opacity: 1,
                    y: 0
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  viewport={{ once: false }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1
                  }}
                  className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <Link to={`/programs/engineering/${key}`} className="relative block p-8 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-sitm-maroon to-sitm-navy rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <div className="text-white">
                          {branchData.icon}
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-sitm-maroon group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4 group-hover:text-sitm-maroon dark:group-hover:text-sitm-gold transition-colors duration-300">
                      {branchData.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed line-clamp-3">
                      {branchData.description}
                    </p>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sitm-maroon/5 to-sitm-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // If branch is selected, show branch details
  const currentBranch = branches[branch];
  
  if (!currentBranch) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Branch Not Found
          </h1>
          <Link to="/programs/engineering" className="text-sitm-maroon hover:underline">
            Back to Engineering Programs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="pt-32 pb-4 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600 dark:text-gray-400">
            <Link to="/programs" className="hover:text-sitm-maroon">Programs</Link>
            <span className="mx-2">/</span>
            <Link to="/programs/engineering" className="hover:text-sitm-maroon">Engineering</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{currentBranch.shortTitle}</span>
          </nav>
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
            {branch === 'cse' && <Cpu className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />}
            {branch === 'ece' && <Terminal className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />}
            {branch === 'me' && <Layers className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />}
            {branch === 'ce' && <Building className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />}
            {branch === 'eee' && <Lightbulb className="w-80 h-80 text-sitm-navy dark:text-sitm-gold" strokeWidth={1} />}
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
                {currentBranch.icon}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {currentBranch.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              {currentBranch.description}
            </p>

            {/* Program Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <Clock className="w-6 h-6 text-sitm-maroon mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">4 Years</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Duration</div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <Users className="w-6 h-6 text-sitm-maroon mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">60</div>
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
            {currentBranch.syllabus.map((semester, index) => (
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
                  <span className="font-bold text-xl text-gray-900 dark:text-white">{currentBranch.fees.tuitionFee}</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Hostel Fee Per Semester</span>
                  <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{currentBranch.fees.hostelFeePerSemester}</span>
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