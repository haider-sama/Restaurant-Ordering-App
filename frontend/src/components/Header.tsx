import { Link } from "react-router-dom";
import MobileNav from "./nav/MobileNav";
import Navbar from "./nav/Navbar";

const Header = () => {
    
    return (
        <div className="border-b-2 border-b-slate-800 py-6">
            <div className="container mx-auto flex justify-between items-center">
                
                <Link to="/" className="text-3xl font-bold tracking-tight">
                    <div className="text-slate-800 hover:text-orange-400 transition-all">
                        DeconEats 
                        <span className="text-orange-400">.com</span>
                    </div>
                </Link>

                <div className="md:hidden">
                    <MobileNav />
                </div>

                <div className="hidden md:block">
                    <Navbar />
                </div>

            </div>
        </div>
    )
}

export default Header;