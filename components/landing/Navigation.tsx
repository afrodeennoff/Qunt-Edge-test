
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
    onAccessPortal: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onAccessPortal }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Futures', href: '#futures' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Prop Firms', href: '#prop-firms' },
        { name: 'About', href: '#about' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-teal-500 transition-transform duration-500 group-hover:rotate-180">
                            <path d="M16 2L2 9V23L16 30L30 23V9L16 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                            <circle cx="16" cy="16" r="4" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </svg>
                        <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <span className="text-lg font-bold tracking-tighter text-white group-hover:text-teal-400 transition-colors">Deltalytix</span>
                </div>

                <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="hover:text-white transition-colors relative group py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={onAccessPortal}
                        className="hidden md:block text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={onAccessPortal}
                        className="bg-white text-black px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-teal-500 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    >
                        Get Access
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navigation;
