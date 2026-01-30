
import React from 'react';
import { Card } from '@/components/landing/ui/Card';

export const CalendarWidget = () => {
    const days = Array.from({ length: 31 }, (_, i) => {
        const date = i + 1;
        const state = Math.random() > 0.7 ? 0 : Math.random() > 0.5 ? 1 : 2;
        const pnl = state === 1 ? Math.floor(Math.random() * 800) + 100 : state === 2 ? -Math.floor(Math.random() * 400) - 50 : 0;
        return { date, state, pnl };
    });

    return (
        <Card className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-medium text-zinc-400">Execution Calendar</h3>
                <div className="flex gap-3 text-[9px] uppercase font-bold tracking-wider text-zinc-600">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_5px_#2dd4bf]"></span>Win</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]"></span>Loss</span>
                </div>
            </div>
            <div className="flex-grow grid grid-cols-7 gap-2 auto-rows-fr h-full overflow-y-auto custom-scrollbar pr-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
                    <div key={day} className="text-center text-[10px] text-zinc-600 font-bold">{day}</div>
                ))}
                <div className="col-span-2"></div>
                {days.map((d) => (
                    <div key={d.date} className={`
             rounded-lg border flex flex-col items-center justify-center relative group transition-all duration-300 hover:scale-105 min-h-[40px]
             ${d.state === 1 ? 'bg-teal-500/5 border-teal-500/20 hover:bg-teal-500/10' : d.state === 2 ? 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10' : 'bg-zinc-900/30 border-white/5 hover:bg-zinc-800/50'}
           `}>
                        <span className={`text-[9px] font-bold ${d.state === 0 ? 'text-zinc-700' : 'text-zinc-300'}`}>{d.date}</span>
                        {d.state !== 0 && (
                            <span className={`text-[8px] font-mono font-bold mt-0.5 ${d.state === 1 ? 'text-teal-400' : 'text-red-400'}`}>
                                {d.state === 1 ? '+' : ''}{Math.abs(d.pnl) >= 1000 ? (d.pnl / 1000).toFixed(1) + 'k' : d.pnl}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export const QuickJournalWidget = () => (
    <Card className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Quick Journal</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-teal-500 hover:text-teal-400 border border-teal-500/20 px-2 py-1 rounded hover:bg-teal-500/10 transition-colors">Save</button>
        </div>
        <textarea
            className="w-full flex-grow bg-zinc-900/50 border border-white/5 rounded-xl p-3 text-xs text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-teal-500/50 resize-none font-mono mb-3 min-h-[60px]"
            placeholder="Log execution notes..."
        ></textarea>
        <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-zinc-800/50 border border-white/5 rounded text-[9px] text-zinc-400 hover:text-white cursor-pointer transition-colors hover:border-teal-500/30">#fomo</span>
            <span className="px-2 py-1 bg-zinc-800/50 border border-white/5 rounded text-[9px] text-zinc-400 hover:text-white cursor-pointer transition-colors hover:border-teal-500/30">#discipline</span>
        </div>
    </Card>
);
