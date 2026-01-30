
import React from 'react';
import { Card } from '@/components/landing/ui/Card';

// --- 1. Trade Table Review (Full Width) ---
export const TradeTableReview = () => (
    <Card className="h-full flex flex-col p-0 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900/40 backdrop-blur-sm sticky top-0 z-20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                Closed Trade Review
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[9px] text-zinc-500">Last 50</span>
            </h3>
            <div className="flex gap-2">
                <button className="hidden sm:block px-3 py-1 bg-teal-500/10 text-teal-400 text-[10px] font-bold uppercase tracking-wider rounded border border-teal-500/20 hover:bg-teal-500/20 transition-colors">Export CSV</button>
                <button className="px-3 py-1 bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider rounded border border-white/5 hover:text-white transition-colors">Filter</button>
            </div>
        </div>
        <div className="flex-grow overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-zinc-900/60 sticky top-0 z-10 backdrop-blur-md">
                    <tr className="text-[10px] uppercase text-zinc-500 font-bold border-b border-white/5">
                        <th className="p-4 whitespace-nowrap">Closed Date</th>
                        <th className="p-4 whitespace-nowrap">Symbol</th>
                        <th className="p-4 whitespace-nowrap">Side</th>
                        <th className="p-4 whitespace-nowrap">Entry Price</th>
                        <th className="p-4 whitespace-nowrap">Exit Price</th>
                        <th className="p-4 text-right whitespace-nowrap">Realized PnL</th>
                        <th className="p-4 text-center whitespace-nowrap">Setup Tag</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-zinc-300 font-mono">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                        <tr key={i} className="hover:bg-white/[0.03] transition-colors group">
                            <td className="p-4 text-zinc-500">2024-03-1{i} <span className="text-zinc-700 ml-1">14:30</span></td>
                            <td className="p-4 text-white font-bold group-hover:text-teal-400 transition-colors">ES_F</td>
                            <td className={`p-4 font-bold ${i % 2 === 0 ? 'text-teal-400' : 'text-red-400'}`}>{i % 2 === 0 ? 'LONG' : 'SHORT'}</td>
                            <td className="p-4">5120.50</td>
                            <td className="p-4">5135.25</td>
                            <td className={`p-4 text-right font-bold ${i % 2 === 0 ? 'text-teal-400' : 'text-red-400'}`}>{i % 2 === 0 ? '+$737.50' : '-$250.00'}</td>
                            <td className="p-4 text-center"><span className="px-2 py-0.5 rounded border border-white/5 text-[9px] text-zinc-400 bg-zinc-800/50">Pullback</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

// --- 2. Prop Firm Overview ---
export const PropFirmOverview = () => (
    <Card className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Prop Firm Accounts</h3>
        </div>
        <div className="space-y-3 overflow-y-auto custom-scrollbar flex-grow pr-1">
            {[
                { name: 'FTMO #93201', balance: 104250, target: 110000, days: 12, status: 'Active' },
                { name: 'Apex #8821', balance: 52100, target: 53000, days: 4, status: 'Review' },
                { name: 'TopStep #112', balance: 148500, target: 150000, days: 22, status: 'Funded' },
                { name: 'MFF #221', balance: 9800, target: 10000, days: 1, status: 'Active' },
            ].map((acc, i) => (
                <div key={i} className="p-3 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-teal-500/20 transition-all group">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-teal-500 transition-colors"></span>
                            <span className="font-bold text-white text-xs md:text-sm">{acc.name}</span>
                        </div>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${acc.status === 'Funded' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-zinc-800 text-zinc-500 border-transparent'}`}>{acc.status}</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-zinc-500">
                            <span>Target Progress</span>
                            <span>{Math.round((acc.balance / acc.target) * 100)}%</span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 transition-all duration-1000" style={{ width: `${Math.min((acc.balance / acc.target) * 100, 100)}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono mt-1">
                            <span className="text-white font-bold">${acc.balance.toLocaleString()}</span>
                            <span className="text-zinc-600">/ ${acc.target.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

// --- 3. Chat Widget ---
export const PremiumChatWidget = () => (
    <Card className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse shadow-[0_0_8px_#2dd4bf]"></span>
                AI Analyst
            </h3>
            <span className="text-[9px] bg-zinc-900 border border-white/5 px-2 py-1 rounded text-zinc-500">GPT-4 Turbo</span>
        </div>
        <div className="flex-grow bg-zinc-900/20 rounded-lg p-2 mb-4 overflow-y-auto custom-scrollbar space-y-4">
            <div className="flex gap-3">
                <div className="w-6 h-6 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-teal-400">AI</div>
                <div className="bg-zinc-800/40 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-zinc-300 leading-relaxed max-w-[85%]">
                    Based on your last 10 <strong>closed trades</strong> on ES, you are entering 2 minutes too early on average. Your win rate increases by 40% when you wait for the 5m candle close.
                </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
                <div className="w-6 h-6 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">ME</div>
                <div className="bg-teal-500/10 p-3 rounded-2xl rounded-tr-none border border-teal-500/20 text-xs text-teal-100 leading-relaxed max-w-[85%]">
                    Show me the chart for that correlation.
                </div>
            </div>
        </div>
        <div className="relative">
            <input type="text" placeholder="Ask about your performance..." className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-xs text-white focus:outline-none focus:border-teal-500/50 transition-colors" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-lg hover:bg-teal-500 hover:text-black transition-all">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
        </div>
    </Card>
);
