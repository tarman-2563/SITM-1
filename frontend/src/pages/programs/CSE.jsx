import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BankPartners } from '../../components/common/BankPartners';
import { Cpu, Clock, BookOpen, ArrowLeft, Rocket, TrendingUp, Target, Layers } from 'lucide-react';

export function CSE() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="pt-32 pb-4 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Link to="/programs/engineering" className="inline-flex items-center gap-2 text-sitm-maroon dark:text-sitm-gold hover:underline mb-4">
            <ArrowLeft size={16} />
            Back to Engineering Programs
          </Link>
        </div>
      </section>

      {/* Program Header */}
      <section className="pb-12 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-sitm-maroon to-sitm-navy rounded-2xl flex items-center justify-center shadow-xl">
                <Cpu className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Computer Science & Engineering
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Equipping students with knowledge and skills to excel in computing and information technology through a blend of theoretical foundations and practical experience
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Affiliated under Assam Science and Technology University (ASTU)
            </p>
          </motion.div>

          {/* Program Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative h-96 bg-gradient-to-br from-sitm-navy/10 to-sitm-maroon/10 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-slate-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Cpu className="w-24 h-24 text-sitm-maroon/30 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">CSE Program Image</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
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

      {/* Program Overview */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Program Overview
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sitm-maroon to-sitm-gold mx-auto mb-6"></div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The Computer Science and Engineering (CSE) program at Scholars Institute of Technology and Management focuses on delivering quality education through a blend of theoretical foundations and practical experience. Students are encouraged to explore innovation, software development, AI, data science, cybersecurity, and more through project-based learning and industry-oriented training.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A dedicated faculty team with both academic expertise and industry experience guides students in core computing concepts as well as emerging technologies. The department is also actively engaged in research, coding competitions, and community tech initiatives.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sitm-maroon/5 to-sitm-navy/5 dark:from-sitm-maroon/10 dark:to-sitm-navy/10 rounded-2xl p-8 border border-sitm-maroon/20 dark:border-sitm-gold/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Specializations Available:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Artificial Intelligence
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Data Science
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Cybersecurity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Cloud Computing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FGIL Learning Model */}
      <section className="py-16 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              FGIL Learning Model
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sitm-maroon to-sitm-gold mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Foundation, Growth, Impact, and Launch - A structured approach aligned with NEP 2020
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Foundation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-white/20 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Foundation</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Core Computing & Development</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Front-End & Back-End Web Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Computer Science Fundamentals (FOCP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Java Programming & Data Structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Advanced DSA & Full-Stack Development (MERN, MongoDB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Cloud Computing & DevOps</span>
                </li>
              </ul>
            </motion.div>

            {/* Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-white/20 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Growth</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Artificial Intelligence & Data Systems</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>AI & Machine Learning Fundamentals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Data Science & Analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Deep Learning & Neural Networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Natural Language Processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Generative AI & AI-Augmented Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>AI Ethics, Responsibility & Real-World Applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Build Your Own AI Models (including ChatGPT-style systems)</span>
                </li>
              </ul>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-white/20 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Impact</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Emerging & Future Technologies</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>AR/VR Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Internet of Things (IoT) & Smart Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Autonomous Robotics & Reinforcement Learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Drone Programming & Control Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Quantum Computing Exploration</span>
                </li>
              </ul>
            </motion.div>

            {/* Launch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-white/20 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Launch</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Build, Create & Apply</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Program real systems, not just simulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Build intelligent applications, devices, and platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Apply AI, data, and automation to real-world challenges</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Program Highlights
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sitm-maroon to-sitm-gold mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">State-of-the-art Labs</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Computer laboratories equipped with industry-grade development platforms and professional tools</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">1000+ Hours of Coding</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hands-on coding across the program, focused on building real applications and systems</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Practical Training</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI, Machine Learning, cloud platforms, and cybersecurity tools integrated with core computing</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Hackathons & Build Sessions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Regular coding sprints and overnight build sessions that simulate real-world tech environments</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Industry Immersion</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">From Day One, with regular interactions and mentoring by senior industry professionals</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Internship & Placement Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">With leading IT companies, startups, and technology-driven organizations</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Guest Lectures & Masterclasses</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Webinars by industry leaders, researchers, and practitioners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Outcomes */}
      <section className="py-16 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Program Outcomes
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sitm-maroon to-sitm-gold mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Graduates don't just earn a degree - they graduate with experience
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-700">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Industry-ready professionals with strong skills in programming, software design, system development, and applied problem-solving</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Hands-on experience with real-world challenges through live projects, labs, and industry exposure starting from the second year</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Multiple paid, offline internships integrated into the academic journey, enabling work with real companies and industry professionals</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Problem-solvers equipped with modern computing and engineering techniques, capable of applying knowledge beyond the classroom</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Ethical and socially responsible individuals, trained to use technology responsibly and contribute meaningfully to society</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Adaptable graduates prepared for higher studies, entrepreneurship, startups, and evolving industry demands</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Fees Section */}
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
