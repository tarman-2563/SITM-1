import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export function AboutSidebar({ isOpen, onClose }) {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white dark:bg-slate-900 z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-8 pb-20">
              {/* Header */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Content */}
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-sitm-maroon dark:text-sitm-gold font-serif mb-6 leading-tight">
                  From a Small Room to a Larger Responsibility
                </h2>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                  <p>
                    The story of Scholars Institute of Technology and Management does not begin with buildings, approvals, or degrees. It begins with a quiet resolve formed under financial constraint, shaped by self reliance, and tested repeatedly by uncertainty.
                  </p>
                  
                  <p>
                    Dr. Sudip Lodh was born into a modest household in a small village. His father was a physics teacher in a government school, respected for his integrity but limited by his means. His mother was a homemaker, holding together a family of seven with patience and discipline. With five siblings to support, ambition had to coexist with responsibility, and education was never taken for granted.
                  </p>

                  <p>
                    From his early student years, Dr. Lodh supported himself through home tuitions. Teaching was not an afterthought. It was survival, training, and purpose rolled into one. There was no patron, no inherited network, no institutional backing. Every step forward was earned independently.
                  </p>

                  <p>
                    His academic journey took him from Gurucharan College, Silchar to Gauhati University, where he completed his MSc and MPhil. Later came an <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-yellow-200 to-amber-400 text-border-black">honorary doctorate from Ballbridge University</span>, but long before titles arrived, the identity of a teacher had already taken root.
                  </p>

                  <h3 className="text-xl font-bold text-sitm-navy dark:text-white mt-8 mb-4">The Birth of Scholars Academy</h3>
                  
                  <p>
                    After completing his formal education, Dr. Lodh felt drawn to teaching, but not within the rigid confines of traditional schools and colleges. He sensed a gap between classroom education and the competitive reality students faced outside. This curiosity led him to Delhi, where he closely observed the emerging ecosystem of organized coaching for engineering and medical entrance examinations.
                  </p>

                  <p>
                    What he saw was striking. Students were not just taught subjects. They were trained to think differently, to solve under pressure, to compete nationally. Returning to Guwahati, the contrast was stark. Assam lacked structured coaching facilities. Students ran from one college teacher to another, gathering fragments of guidance that rarely translated into success in national level entrance exams. The format, difficulty, and mindset required were entirely different from annual school or college examinations.
                  </p>

                  <p>
                    To bridge this gap, Scholars Academy was born in 1994, operating out of a small Assam type rented house in Rehabari. There was nothing grand about the beginning. No banners, no air conditioned classrooms, no brand recognition. Just one teacher, handwritten notes, long hours, and belief.
                  </p>

                  <p>
                    Convincing parents and students was the first challenge. How could a single individual, without institutional backing or flashy infrastructure, promise success in the toughest examinations in the country. That skepticism softened when fourteen students enrolled for IIT entrance preparation. That year, eleven of them qualified for various IITs.
                  </p>

                  <p>
                    Trust followed results. The next year saw enrollment rise to 108 students, with over sixty five qualifying in engineering and medical entrance examinations. From that point onward, the journey never truly paused.
                  </p>

                  <h3 className="text-xl font-bold text-sitm-navy dark:text-white mt-8 mb-4">Growth, Pressure, and a Defining Crisis</h3>
                  
                  <p>
                    As word spread, the small house in Rehabari began to overflow. Students sat wherever space allowed. Teaching extended late into the evening. Then came one of the most frightening moments in the academy’s early life. The owner of the rented house issued a one month notice to vacate the premises.
                  </p>

                  <p>
                    With hundreds of students dependent on the academy, the situation was alarming. Classes could not stop. Trust could not be broken. For weeks, the team searched relentlessly for an alternative. That pressure finally gave way to relief when a newly constructed building near Cotton College in Panbazar became available. In August 2001, Scholars Academy shifted to its own dedicated premises.
                  </p>

                  <p>
                    From there, growth accelerated. A second branch opened in Bhangagarh in 2004. Centers followed in Silchar, Shillong, and other locations. Scholars Academy became a household name across the region. At its peak, individual programs such as the droppers batch alone attracted five to six thousand students. Courses expanded to include early bird programs for Higher Secondary first year students and intensive crash courses for passed out students.
                  </p>

                  <h3 className="text-xl font-bold text-sitm-navy dark:text-white mt-8 mb-4">A Larger Question Emerges</h3>
                  
                  <p>
                    While the academy flourished, a deeper concern surfaced. Engineering education in Assam lagged behind demand. With only three government engineering colleges, students were forced to migrate to other parts of India, often at enormous financial cost. Families paid heavily, emotionally and economically, to secure opportunities elsewhere.
                  </p>
                  <p>
                    Dr. Lodh began to ask a difficult question. If students could be trained locally to crack national entrance examinations, why could they not pursue quality engineering education at home, at an affordable cost, without leaving the region.
                  </p>
                  <p>
                    That question marked the transition from coaching to institution building.
                  </p>

                  <h3 className="text-xl font-bold text-sitm-navy dark:text-white mt-8 mb-4">The Birth of SITM</h3>
                  
                  <p>
                    On 8 May 2010, Scholars Institute of Technology and Management came into being in Guwahati, envisioned as a private engineering institution rooted in access, value, and social responsibility. The shift was not easy. Regulatory processes, infrastructure development, and financial risk brought new pressures. The fear of failure was real, but so was the conviction built over sixteen years of educational service.
                  </p>

                  <p>
                    The philosophy remained consistent. Education should empower. Engineers should be technically competent, ethically grounded, and socially conscious. Degrees were not the goal. Capability was.
                  </p>

                  <p>
                    Over the next fifteen years, SITM navigated the challenges faced by every young institution, while steadily producing engineers who came from humble backgrounds and went on to build meaningful careers. The legacy of personal attention, discipline, and academic rigor carried forward from the academy years into the institute’s culture.
                  </p>

                  <h3 className="text-xl font-bold text-sitm-navy dark:text-white mt-8 mb-4">Continuing the Legacy</h3>
                  
                  <p>
                    In recent years, SITM has expanded its academic offerings to include BCA, BBA, and BS in Data Science, responding to the changing landscape of technology and management education. The form has evolved, but the core remains unchanged.
                  </p>

                  <p className="font-medium text-sitm-maroon dark:text-sitm-gold">
                    From a small rented house to a multidisciplinary institute, the journey of SITM is a story of self made vision, persistence under pressure, and an unwavering belief in the transformative power of education. It stands as proof that institutions, like individuals, grow strongest when built without shortcuts and sustained by purpose.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
