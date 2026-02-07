import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BankPartners } from '../../components/common/BankPartners';
import { Building2, Clock, BookOpen, ArrowLeft, Rocket, TrendingUp, Target, Layers, HardHat, Wrench } from 'lucide-react';
import civilImage from '../../assets/civil.png';

export function CE() {
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
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Civil Engineering
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-slate-700 shadow-xl">
              <img 
                src={civilImage} 
                alt="Civil Engineering Program" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
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
                The Civil Engineering program offers comprehensive undergraduate education focusing on the principles of planning, design, construction, and maintenance of infrastructure. Students are equipped with the knowledge and skills necessary to shape the physical foundation of society.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The department is supported by a team of experienced faculty members with diverse academic and industry backgrounds. Faculty members actively engage in research and development activities and contribute to the field through publications and consultancy.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sitm-maroon/5 to-sitm-navy/5 dark:from-sitm-maroon/10 dark:to-sitm-navy/10 rounded-2xl p-8 border border-sitm-maroon/20 dark:border-sitm-gold/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Specializations Available:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Structural Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Environmental Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Transportation Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Construction Management
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Building Strong Technical & Practical Basics</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Engineering drawing, CAD drafting, and 2D–3D modelling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Fundamentals of surveying with field exposure (Total Station & GPS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Core engineering concepts and laboratory practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Introduction to digital tools and computational thinking for engineers</span>
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Developing Applied Engineering Capability</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Structural analysis and design using industry software (STAAD.Pro, ETABS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Building Information Modelling (BIM) for integrated project coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Project planning and scheduling using professional tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Lab-based experimentation and applied coursework</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Early-stage industry exposure and internships</span>
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Applying Skills to Real-World Engineering Challenges</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Bridge design and infrastructure modelling using advanced software</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Seismic analysis and disaster-resilient design concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Quantity surveying, estimation, and project management practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Live industry projects, field-based learning, and paid internships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Exposure to real construction sites and professional workflows</span>
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Preparing for Professional Practice & Career Readiness</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Major capstone and design projects addressing real engineering problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Advanced tools and standards used in industry and consulting firms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Industry immersion and project execution exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Readiness for roles in construction, infrastructure, consulting, and higher studies</span>
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
                  <HardHat className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">State-of-the-art Laboratories</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Professional field-survey equipment enabling hands-on training in design, analysis, and site-level engineering practices</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Structured Practical Learning</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Paid internships, site visits, live projects, and industry immersion integrated across the academic journey</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Expert Lectures & Workshops</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Masterclasses and technical workshops by experienced civil engineers, consultants, and industry leaders</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Sustainable Construction Focus</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Green building concepts and resilient infrastructure aligned with modern industry and environmental needs</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Active Participation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">National-level technical events, seminars, competitions, and student-led innovation projects</p>
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
              Building engineers who design, construct, and sustain the future
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-700">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Strong engineering foundations with applied expertise, enabling graduates to translate civil engineering principles into real-life design, construction, and infrastructure solutions</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Proficiency in analysis, design, and execution of civil engineering projects, supported by exposure to industry-standard software, field practices, and professional codes</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Ethical, safety-conscious, and socially responsible engineers, trained to address sustainability, environmental impact, and community needs in modern infrastructure development</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Professionally confident and adaptable individuals, capable of collaborating across multidisciplinary teams and responding to evolving technologies and industry demands</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Career-ready graduates prepared for roles in government departments, infrastructure and construction firms, design and consultancy organizations, or for pursuing higher studies and competitive examinations</p>
              </li>
            </ul>
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
