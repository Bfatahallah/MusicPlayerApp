import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import FAQ from "./pages/FAQ";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <div className="w-full flex flex-col bg-[#111] text-white">
      <Header />
      
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/coming" element={<ComingSoon />} />
        </Routes>
      </div>
    </div>
  );
}
