
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '@/components/landing/ui/Card';

const pieData = [{ name: 'Winning', value: 43 }, { name: 'Losing', value: 29 }];
const PIE_COLORS = ['#2dd4bf', '#18181b'];

export const ExecutionScore = () => (
    <Card className="h-full flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-zinc-400">Execution Score</h3>
            <div className="flex gap-2">
                <span className="p-1 hover:bg-white/10 rounded cursor-pointer text-zinc-500">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" /></svg>
                </span>
            </div>
        </div>
        <div className="flex items-center gap-4 flex-grow">
            <div className="relative w-24 h-24 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={pieData} innerRadius={35} outerRadius={45} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-xl font-bold text-white tracking-tighter">58%</span>
                </div>
            </div>
            <div className="space-y-2 flex-grow">
                <div>
                    <div className="text-[10px] text-zinc-500 mb-0.5 font-medium">Clean Sessions</div>
                    <div className="text-lg font-bold text-white tracking-tight">43</div>
                </div>
                <div>
                    <div className="text-[10px] text-zinc-500 mb-0.5 font-medium">Violations</div>
                    <div className="text-lg font-bold text-white tracking-tight">29</div>
                </div>
            </div>
        </div>
        <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-zinc-500 flex justify-between font-medium">
            <span>Monthly Trend</span>
            <span className="text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">+8%</span>
        </div>
    </Card>
);

export const PsychologyMonitor = () => (
    <Card className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Psychological State</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2 py-1 rounded">Optimal</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center flex-grow items-center">
            <div className="p-2 bg-zinc-900/50 rounded-xl border border-white/5 h-full flex flex-col justify-center">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Tilt</div>
                <div className="text-base font-bold text-white">4%</div>
            </div>
            <div className="p-2 bg-zinc-900/50 rounded-xl border border-white/5 h-full flex flex-col justify-center">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Focus</div>
                <div className="text-base font-bold text-white">9.2</div>
            </div>
            <div className="p-2 bg-zinc-900/50 rounded-xl border border-white/5 h-full flex flex-col justify-center">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Fatigue</div>
                <div className="text-base font-bold text-teal-400">Low</div>
            </div>
        </div>
    </Card>
);
