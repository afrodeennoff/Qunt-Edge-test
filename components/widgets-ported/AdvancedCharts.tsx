
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { Card } from '@/components/landing/ui/Card';

// Shared Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#09090b] border border-zinc-800 rounded-lg p-3 shadow-xl backdrop-blur-md">
                <p className="text-[10px] text-zinc-400 font-mono mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-xs font-bold" style={{ color: entry.color }}>
                        {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const ChartWrapper = ({ title, children, subtitle }: { title: string, subtitle?: string, children: React.ReactNode }) => (
    <Card className="flex flex-col h-full">
        <div className="mb-4">
            <h3 className="text-xs font-bold text-zinc-200 tracking-widest uppercase mono">{title}</h3>
            {subtitle && <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">{subtitle}</p>}
        </div>
        <div className="flex-grow min-h-[150px]">
            {children}
        </div>
    </Card>
);

export const PerformanceAreaChart = ({ data }: { data: any[] }) => (
    <ChartWrapper title="Equity Curve" subtitle="Portfolio Performance Over Time">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
                    minTickGap={30}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2dd4bf"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorEquity)"
                    animationDuration={2000}
                />
            </AreaChart>
        </ResponsiveContainer>
    </ChartWrapper>
);

export const MultiLinePerformance = ({ data }: { data: any[] }) => (
    <ChartWrapper title="Comparative Analysis" subtitle="Strategy Alpha vs Beta">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="alpha" stroke="#2dd4bf" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="beta" stroke="#6366f1" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    </ChartWrapper>
);

export const VolumeBarChart = ({ data }: { data: any[] }) => (
    <ChartWrapper title="Volume Distribution" subtitle="Execution Size by Period">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#2dd4bf" radius={[4, 4, 0, 0]} opacity={0.6} />
            </BarChart>
        </ResponsiveContainer>
    </ChartWrapper>
);

export const AssetDistributionPie = ({ data }: { data: any[] }) => {
    const COLORS = ['#2dd4bf', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6'];

    return (
        <ChartWrapper title="Asset Allocation" subtitle="Portfolio Concentration">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
};

export const DispersionScatter = ({ data }: { data: any[] }) => (
    <ChartWrapper title="Execution Dispersion" subtitle="Price vs Volume Variance">
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                    type="number"
                    dataKey="x"
                    name="price"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
                />
                <YAxis
                    type="number"
                    dataKey="y"
                    name="volume"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter name="Executions" data={data} fill="#2dd4bf">
                    {data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fillOpacity={0.6} />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    </ChartWrapper>
);
