import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import PlayerBar from "./components/PlayerBar";

// Pages
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import FAQ from "./pages/FAQ";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 12, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.99 },
  };

  const pageTransition = { duration: 0.35, ease: "easeInOut" };

  const wrap = (children) => (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="w-full h-full"
    >
      {children}
    </motion.main>
  );

  return (
    <div className="w-full flex flex-col bg-black text-white">
      <Header />
      
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={wrap(<Home />)} />
            <Route path="/discover" element={wrap(<Discover />)} />
            <Route path="/faq" element={wrap(<FAQ />)} />
            <Route path="/coming" element={wrap(<ComingSoon />)} />
          </Routes>
        </AnimatePresence>
      </div>
      
      <PlayerBar />
    </div>
  );
}
