
import React from 'react';
import { motion, Variants } from 'framer-motion';

const Features: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const features = [
        {
            title: "Neural Pattern Recognition",
            subtitle: "Machine Learning Core",
            desc: "Our engine scans your last 1,000 trades to identify subconscious self-sabotage patterns invisible to the human eye.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            )
        },
        {
            title: "Predictive Tilt Modeling",
            subtitle: "Real-Time Intervention",
            desc: "By analyzing execution latency and size variance, the AI predicts 'tilt' events 5 minutes before they destroy your account.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            )
        },
        {
            title: "Automated Edge Validation",
            subtitle: "Strategy Drift Detection",
            desc: "The AI isolates market conditions from your performance. Are you losing because the strategy is broken, or because you are?",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
            )
        },
        {
            title: "Smart Funding Reports",
            subtitle: "Institutional Audit",
            desc: "Generate AI-verified PDF reports for prop firms that prove you are an algorithmic-grade operator, not a gambler.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            )
        },
        {
            title: "Intent Locking",
            subtitle: "Pre-Session Protocol",
            desc: "Define your setup in natural language. If you execute a trade that doesn't match your semantic intent, the AI flags it.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            )
        },
        {
            title: "Automated Ingestion",
            subtitle: "Zero Manual Entry",
            desc: "Connect MT4, MT5, or cTrader. Our algorithms pull every tick, partial, and commission automatically. The AI never sleeps.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            )
        }
    ];

    return (
        <section id="features" className="py-32 px-6 bg-[#030303] relative">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold tracking-tighter mb-6"
                    >
                        The AI Full Stack
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 max-w-2xl text-lg"
                    >
                        Everything you need to profesionalize your trading desk.
                        Built for traders who treat this as a data science problem, not a casino.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            whileHover={{ y: -5, borderColor: "rgba(45, 212, 191, 0.2)" }}
                            className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/5 transition-all group relative overflow-hidden will-change-transform"
                        >
                            {/* Hover Gradient BG */}
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <motion.div
                                whileHover={{ scale: 1.1, backgroundColor: "#2dd4bf", color: "#000" }}
                                transition={{ duration: 0.3 }}
                                className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-teal-500 mb-6 transition-colors shadow-[0_0_15px_-5px_rgba(45,212,191,0)] group-hover:shadow-[0_0_20px_-5px_rgba(45,212,191,0.6)]"
                            >
                                {f.icon}
                            </motion.div>
                            <div className="mb-4 relative z-10">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 group-hover:text-teal-500/80 transition-colors">{f.subtitle}</h4>
                                <h3 className="text-xl font-bold text-white tracking-tight">{f.title}</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed font-light relative z-10">{f.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
