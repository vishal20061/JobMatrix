import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CategoryCarousel from '../components/CategoryCarousel'
import LatestJobs from '../components/LatestJobs'
import Footer from '../components/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AnimatedCursor from '../components/AnimatedCursor'
import FuturisticBackground from '../components/FuturisticBackground'
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  React.useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6A38C2] to-[#F83002] z-[100] origin-left"
        style={{ scaleX }}
      />
      <AnimatedCursor />
      <FuturisticBackground />
      <Navbar />
      <main className="relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <CategoryCarousel />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <LatestJobs />
        </motion.section>
      </main>
      <Footer />
      <ScrollToTop />
    </motion.div>
  )
}

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] p-4 bg-[#6A38C2] text-white rounded-2xl shadow-2xl shadow-[#6A38C2]/40 hover:bg-[#5b30a6] transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Home
