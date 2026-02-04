import { motion } from "framer-motion";
import { Users, Briefcase, Sparkles } from "lucide-react";


const mentors = [
  {
    name: "Amit Sharma",
    role: "Product Manager",
    company: "Google",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Bhavya Singh",
    role: "Software Engineer",
    company: "Microsoft",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Chetan Das",
    role: "UX Designer",
    company: "Amazon",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Divya Patel",
    role: "Data Scientist",
    company: "Meta",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Eshan Roy",
    role: "Cloud Architect",
    company: "AWS",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Farhan Khan",
    role: "Tech Lead",
    company: "Netflix",
    photo: "https://randomuser.me/api/portraits/men/81.jpg",
  },
];

export default function Mentors() {
  return (
    <section
      className="relative py-24 transition-colors duration-300

      bg-linear-to-b
      from-[#7b2d2d]/20
      via-white
      to-[#7b2d2d]/20

      dark:bg-slate-950 
      overflow-hidden"
      
    >
      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />

      
          {/* <motion.div
              animate={{ 
                rotate: [0, -6, 6, 0],
                y: [0, -15, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[5%] opacity-[0.07] dark:opacity-[0.3] pointer-events-none"
            >
              <Users
                className="w-72 h-72 text-indigo-600 dark:text-sitm-gold"
                strokeWidth={1}
              />
            </motion.div>
            <motion.div
              animate={{ 
                rotate: [0, 6, -6, 0],
                y: [0, -15, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] right-[5%] opacity-[0.07] dark:opacity-[0.3] pointer-events-none"
            >
              <Briefcase
                className="w-72 h-72 text-purple-600 dark:text-sitm-gold"
                strokeWidth={1}
              />
            </motion.div>

            <motion.div
              animate={{ 
                rotate: [0, 6, -6, 0],
                y: [0, 15, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[10%] right-[5%] opacity-[0.07] dark:opacity-[0.3] pointer-events-none"
            >
              <Users
                className="w-72 h-72 text-purple-600 dark:text-sitm-gold"
                strokeWidth={1}
              />
            </motion.div>
 */}

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-sitm-navy dark:text-white mt-2 mb-6 font-serif tracking-tight">
        Meet Our<span className="text-transparent bg-clip-text bg-linear-to-r from-sitm-navy to-indigo-600 dark:from-white dark:to-sitm-gold"> Mentors</span>
        </h2>
        {/* <div className="w-24 h-1.5 bg-linear-to-r from-sitm-maroon to-sitm-gold mx-auto rounded-full"></div> */}
        <p className="mt-4 text-lg text-blue-600 dark:text-gray-100">
          100+ mentors from top corporates delivering masterclasses, expert
          sessions, 1-to-1 resume preparation and more.
        </p>
      </div>

      {/* Mentor Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mentors.map((mentor, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="group relative rounded-2xl p-px 
                       bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500"
          >
            <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-xl p-6 h-full">
              
              {/* Avatar Image */}
              <div
                className="w-20 h-20 mx-auto rounded-full overflow-hidden
                           ring-2 ring-indigo-500/50
                           group-hover:ring-indigo-400 transition"
              >
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="mt-6 text-center">
                <h3 className="text-xl text-white font-semibold">
                  {mentor.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{mentor.role}</p>
                <p className="text-sm text-indigo-400 mt-1">
                  {mentor.company}
                </p>
              </div>

              {/* Hover Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 
                           group-hover:opacity-100 transition duration-500 
                           bg-indigo-500/10 blur-xl"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
