
import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
    onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Use transforms for performant parallax
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const item: Variants = {
        hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
        show: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            }
        },
    };

    return (
        <section ref={ref} className="relative pt-44 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center items-center">
            {/* Background Ambience - Parallax Enabled */}
            <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] mix-blend-screen will-change-transform"
                />
                <motion.div
                    style={{ y: y2 }}
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] mix-blend-screen will-change-transform"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div
                        variants={item}
                        className="flex justify-center mb-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-900/50 border border-teal-500/20 rounded-full text-teal-400 text-[11px] uppercase tracking-[0.25em] font-bold backdrop-blur-md shadow-[0_0_20px_-5px_rgba(45,212,191,0.2)] cursor-default select-none transition-colors hover:border-teal-500/40"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            Neural Engine: Online
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-white"
                    >
                        Silence the Noise. <br />
                        <span className="text-zinc-600">Execute the Edge.</span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
                    >
                        The <span className="text-teal-500 font-medium">AI-powered</span> enforcement layer for discretionary minds. <br className="hidden md:block" />
                        We replace willpower with predictive clinical data architecture.
                    </motion.p>

                    <motion.div
                        variants={item}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <motion.button
                            onClick={onStart}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:bg-zinc-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] overflow-hidden"
                        >
                            <span className="relative z-10">Initialize Audit</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shine"></div>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all font-bold text-sm uppercase tracking-widest"
                        >
                            <span>View Demo</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        variants={item}
                        className="mt-16 flex flex-col items-center gap-6"
                    >
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                            Trusted by traders at
                        </div>
                        <div className="flex gap-10 opacity-30 grayscale mix-blend-screen">
                            <span className="font-bold text-lg text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">PROP.OS</span>
                            <span className="font-bold text-lg text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">FTMO</span>
                            <span className="font-bold text-lg text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">APEX</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Grid Lines */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent"></div>
            <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-800/50 to-transparent hidden md:block"></div>
        </section>
    );
};

export default Hero;
