import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BankPartners } from '../../components/common/BankPartners';
import { Cog, Clock, BookOpen, ArrowLeft, Rocket, TrendingUp, Target, Layers, Settings, Wrench } from 'lucide-react';

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
              Comprehensive technical education in design, manufacturing, thermodynamics, and mechanical systems with integration of theory and practical applications
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Affiliated under Assam Science and Technology University (ASTU)
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
                The Mechanical Engineering program provides comprehensive technical education in the areas of design, manufacturing, thermodynamics, and mechanical systems. The department emphasizes the integration of theoretical knowledge with practical applications, enabling students to work on real-world mechanical engineering problems through laboratory work, industrial visits, and project-based learning.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Faculty members with academic and industry experience contribute to a learning environment that promotes research, innovation, and skill development in core mechanical domains and interdisciplinary areas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-sitm-maroon/5 to-sitm-navy/5 dark:from-sitm-maroon/10 dark:to-sitm-navy/10 rounded-2xl p-8 border border-sitm-maroon/20 dark:border-sitm-gold/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Specializations Available:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Thermal Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Manufacturing Technology
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Design Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                  Mechatronics
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Building Strong Mechanical & Engineering Fundamentals</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Engineering mechanics, materials science, and basic thermodynamics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Engineering graphics, mechanical drawing, and design basics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Workshop practices, fitting, machining, and fabrication fundamentals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Introduction to CAD tools and technical documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Engineering mathematics, physics, and problem-solving skills</span>
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Developing Applied Mechanical Engineering Capability</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>CAD & Product Design:</strong> 2D & 3D modelling, assemblies, detailing, and design for manufacturing (DFM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Manufacturing & Production:</strong> Conventional and advanced processes, CNC machining, casting, welding, forming, and additive manufacturing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Thermal & Energy Systems:</strong> IC engines, refrigeration, air-conditioning, heat transfer, and HVAC systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Quality & Metrology:</strong> Dimensional measurement tools, inspection methods, and Statistical Quality Control (SQC)</span>
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Applying Skills to Real Industrial Environments</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Industrial Safety & Standards:</strong> Workplace safety practices, compliance, and mechanical design codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Automation & Smart Manufacturing:</strong> Sensors, actuators, industrial instrumentation, PLC concepts, and Industry 4.0</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Production Planning & Reliability:</strong> Lean manufacturing principles and maintenance planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Industry Exposure:</strong> Live industry projects, plant-based learning, and paid internships</span>
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Preparing for Professional Roles & Advanced Opportunities</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-100 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Advanced Mechanical Systems:</strong> Power plants, renewable energy systems, sustainable engineering, and system optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Sustainable & Green Manufacturing:</strong> Energy efficiency, waste reduction, eco-friendly processes, and lifecycle thinking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Professional Readiness:</strong> Major capstone design projects and 3–4 paid industry immersion internships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sitm-maroon rounded-full mt-2 flex-shrink-0"></span>
                  <span>Exposure to real workflows in manufacturing plants, workshops, and projects</span>
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
                  <Settings className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Advanced Laboratories</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fluid mechanics, thermal engineering, manufacturing processes, and material testing labs replicating real industrial environments</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Hands-on Training</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CAD/CAM, CNC machining, and additive manufacturing (3D printing) for design, production, and fabrication skills</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Industrial Visits & Workshops</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Regular technical workshops and expert-led seminars by professionals from manufacturing, energy, and engineering sectors</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Project-Based Learning</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Design-focused assignments strengthening problem-solving ability, system thinking, and engineering creativity</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-sitm-maroon/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-sitm-maroon" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Modern Industry Focus</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Energy efficiency, automation, smart manufacturing, and sustainable mechanical systems aligned with future needs</p>
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
              Engineering education designed for real machines, real systems, and real impact
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-700">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Strong grounding in mechanical engineering fundamentals and design principles, enabling graduates to understand, analyze, and develop efficient mechanical systems</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Proficiency in modern engineering tools and technologies for design, analysis, simulation, manufacturing, and production environments</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Industry readiness across manufacturing, energy, automotive, and infrastructure sectors, supported by hands-on training and multiple paid internships</p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 bg-sitm-maroon/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-2 h-2 bg-sitm-maroon rounded-full"></span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Awareness of professional ethics, safety standards, and sustainable engineering practices, essential for responsible and future-focused mechanical solutions</p>
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
