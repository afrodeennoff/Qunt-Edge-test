
import React from 'react';
import { motion } from 'framer-motion';

const ProblemStatement: React.FC = () => {
    return (
        <section id="problem" className="py-32 px-6 bg-[#080808]/50 border-y border-white/5 relative">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Critical Failure</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-[0.95]">
                        PnL is a <br />
                        <span className="text-teal-500">Lagging Indicator.</span>
                    </h2>
                    <div className="space-y-8 text-zinc-400 text-lg leading-relaxed max-w-lg font-light">
                        <p>
                            Your bank account tells you <em>what</em> happened. It doesn't tell you <em>why</em>.
                            Legacy journals are static graveyards of data that fail to capture the most critical variable in trading: <strong className="text-white font-medium">State of Mind.</strong>
                        </p>
                        <p>
                            Profit masks incompetence. You can violate every rule in your system, get lucky, and book a win. This reinforcement loop is the silent killer of careers.
                        </p>
                        <div className="pt-8 border-t border-white/10 mt-10">
                            <p className="text-teal-500 font-bold uppercase tracking-widest text-xs mono mb-2">The Paradigm Shift</p>
                            <p className="text-white font-medium text-xl tracking-tight">
                                Stop auditing the money. Audit the execution.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid gap-4">
                    {[
                        {
                            title: "Dopamine Addiction",
                            desc: "The market is a random reinforcement machine. It rewards bad behavior just often enough to keep you hooked. We break the neural link between 'bad trade' and 'made money'."
                        },
                        {
                            title: "Tilt Cascades",
                            desc: "90% of account blowups happen in 10% of sessions. We identify the micro-fractures in your discipline—heavy breathing, revenge entries—before the dam breaks."
                        },
                        {
                            title: "Recency Bias",
                            desc: "You trade based on your last 3 outcomes, not your 3-year edge. We force you to zoom out via hard data constraints, effectively acting as an algorithmic risk manager."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-8 bg-[#0a0a0a] border border-white/5 hover:border-teal-500/50 transition-all duration-500 group relative overflow-hidden rounded-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10 flex items-start gap-6">
                                <div className="text-zinc-800 font-mono text-xl font-bold mt-1 group-hover:text-teal-500 transition-colors">0{i + 1}</div>
                                <div>
                                    <h3 className="text-lg font-bold mb-3 tracking-tight text-zinc-200 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
