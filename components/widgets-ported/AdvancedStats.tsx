
import React from 'react';
import { Card } from '@/components/landing/ui/Card';

export const StatCard = ({ title, value, trend, label }: { title: string, value: string, trend?: string, label?: string }) => (
    <Card className="flex flex-col justify-between">
        <div>
            <h3 className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase mono mb-3">{title}</h3>
            <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white tracking-tighter">{value}</span>
                {trend && (
                    <span className={`text-[10px] font-bold mono ${trend.startsWith('+') ? 'text-teal-500' : 'text-red-500'}`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
        {label && (
            <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">{label}</p>
            </div>
        )}
    </Card>
);

export const StatisticsWidget = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
        <StatCard title="Win Rate" value="68.4%" trend="+2.3%" label="Last 100 Trades" />
        <StatCard title="Profit Factor" value="2.14" trend="+0.12" label="Risk Adjusted" />
        <StatCard title="Avg RR" value="1:2.4" trend="-0.1" label="Portfolio Mean" />
        <StatCard title="Sharpe" value="3.12" trend="+0.5" label="Alpha Generation" />
    </div>
);

export const AccountSummary = () => (
    <Card className="h-full flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase mono mb-2">Live Balance</h3>
                <p className="text-3xl font-bold text-white tracking-tighter">$142,500.00</p>
            </div>
            <div className="bg-teal-500/10 text-teal-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-teal-500/20">
                Live
            </div>
        </div>

        <div className="space-y-4 mt-8">
            <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500 mono uppercase tracking-widest">Equity Peak</span>
                <span className="text-white font-bold">$148,200.00</span>
            </div>
            <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500 mono uppercase tracking-widest">Max Drawdown</span>
                <span className="text-red-500 font-bold">-4.2%</span>
            </div>
            <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 w-[68%]" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-600 mono uppercase">
                <span>Drawdown Limit</span>
                <span>72% Margin Available</span>
            </div>
        </div>
    </Card>
);

export const RiskAlertWidget = () => (
    <Card className="h-full border-red-500/10 bg-red-500/[0.02]">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h3 className="text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase mono">Critical Risk Audit</h3>
        </div>

        <div className="space-y-4">
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                <p className="text-xs text-red-200/80 mb-1 font-bold tracking-tight">Strategy Drift Detected</p>
                <p className="text-[10px] text-red-500/60 leading-relaxed font-mono">Current stop-loss variance is 20% outside of historical backtest parameters.</p>
            </div>

            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl">
                <p className="text-xs text-zinc-300 mb-1 font-bold tracking-tight">Market Volatility Leak</p>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-mono">Account beta is spiking due to correlated NQ and ES exposure.</p>
            </div>
        </div>
    </Card>
);
