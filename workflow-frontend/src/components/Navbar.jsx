import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-purple-300 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-purple-900 text-3xl font-bold tracking-wide ">FlowForge🎈</div>
        <div className="flex gap-8">
          <Link 
            to="/" 
            className="text-purple-800 hover:text-white font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/20"
          >
            Home
          </Link>
          <Link 
            to="/history" 
            className="text-purple-800 hover:text-white font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/20"
          >
            History
          </Link>
          <Link 
            to="/status" 
            className="text-purple-800 hover:text-white font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/20"
          >
            Status
          </Link>
        </div>
      </div>

      {/* Paint Drip SVG Section */}
      <div className="absolute left-0 w-full overflow-hidden line-height-0">
        <svg 
          viewBox="0 0 500 150" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px]"
        >
          <path 
            d="M0,0 L500,0 L500,20 C450,50 430,10 380,30 C330,50 310,120 250,120 C190,120 170,40 120,60 C70,80 50,20 0,50 Z" 
            className="fill-purple-300"
          ></path>
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;