
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const mockData = [
    { name: 'S1', eqs: 82, discipline: 90, pnl: 400 },
    { name: 'S2', eqs: 95, discipline: 98, pnl: -210 },
    { name: 'S3', eqs: 42, discipline: 30, pnl: 1400 },
    { name: 'S4', eqs: 88, discipline: 85, pnl: -150 },
    { name: 'S5', eqs: 92, discipline: 95, pnl: 650 },
    { name: 'S6', eqs: 96, discipline: 94, pnl: 800 },
];

const logs = [
    "Initializing neural handshake with Broker API...",
    "Parsing last 50 execution ticks...",
    "Analysis: Entry slippage > 2.5s detected on Trade #491.",
    "Pattern Match: 'Revenge Tilt' detected (Confidence: 94%).",
    "Warning: Position size deviation +150% from baseline.",
    "Intervention: Locking terminal for 15m cooling period...",
    "Optimizing: Risk parameters adjusted for next session."
];

const AnalysisDemo: React.FC = () => {
    const [logIndex, setLogIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : 0));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-32 px-6 relative overflow-hidden bg-[#030303]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-teal-500 mono">AI Core Active</h2>
                        </div>
                        <h3 className="text-5xl font-bold tracking-tight text-white">
                            The Neural Interceptor.
                        </h3>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-zinc-500 text-sm max-w-sm leading-relaxed border-l border-teal-500/20 pl-6"
                    >
                        Our AI models don't just record your trades. They <strong className="text-teal-500">predict</strong> failure points before they happen and intervene in real-time.
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid lg:grid-cols-3 gap-1 px-1 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm"
                >
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 bg-[#050505]/80 p-10 relative">
                        {/* Scanning Line Effect */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="w-[1px] h-full bg-teal-500/20 absolute top-0 left-0 animate-[scan_4s_linear_infinite] shadow-[0_0_20px_rgba(45,212,191,0.2)]"></div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 relative z-10">
                            <div className="space-y-1">
                                <h4 className="mono text-[10px] uppercase text-zinc-500 tracking-[0.2em]">Live Prediction Model</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold tracking-tighter text-white">94.2%</span>
                                    <span className="text-xs text-teal-400 mono font-bold">Accuracy</span>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_10px_#2dd4bf]"></div>
                                    <span className="text-[10px] uppercase mono text-zinc-400">Neural Index</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[360px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockData}>
                                    <defs>
                                        <linearGradient id="eqsGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                    <XAxis dataKey="name" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                                    <YAxis stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                                    <Tooltip
                                        cursor={{ stroke: '#2dd4bf', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', fontSize: '10px', borderRadius: '4px', color: '#f4f4f5' }}
                                    />
                                    <Area type="monotone" dataKey="eqs" stroke="#2dd4bf" strokeWidth={2} fill="url(#eqsGradient)" animationDuration={2000} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* AI Terminal Sidebar */}
                    <div className="bg-[#080808] p-8 flex flex-col gap-8 border-l border-white/5 font-mono relative">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <h4 className="text-[10px] uppercase text-teal-500 tracking-[0.2em] font-bold">Neural Log</h4>
                                <div className="flex gap-1">
                                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                </div>
                            </div>

                            <div className="h-[200px] overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-20"></div>
                                <div className="flex flex-col justify-end h-full gap-3 text-[10px] leading-relaxed">
                                    <AnimatePresence mode="popLayout">
                                        {logs.slice(0, logIndex + 1).slice(-5).map((log, i) => (
                                            <motion.div
                                                key={`${logIndex}-${i}`}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`border-l-2 pl-3 ${log.includes("Warning") ? 'border-yellow-500 text-yellow-500' : log.includes("Intervention") ? 'border-red-500 text-red-500' : 'border-teal-500/50 text-zinc-400'}`}
                                            >
                                                <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                                {log}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto space-y-4 relative z-10">
                            <div className="bg-zinc-900/50 p-4 rounded border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] uppercase text-zinc-500">Anomaly Probability</span>
                                    <span className="text-xs font-bold text-red-400">High (89%)</span>
                                </div>
                                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '89%' }}
                                        className="h-full bg-red-500"
                                    ></motion.div>
                                </div>
                            </div>
                            <button className="w-full bg-teal-500 text-black py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                                Access Neural Dashboard
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AnalysisDemo;
