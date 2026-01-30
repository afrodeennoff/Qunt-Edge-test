
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/landing/ui/Card';

export const MarketSentimentWidget = () => (
    <Card className="h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Sentiment</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">AI Derived</span>
        </div>
        <div className="flex-grow flex items-center justify-center py-2">
            <div className="relative w-32 h-16 overflow-hidden scale-90">
                <div className="absolute top-0 left-0 w-full h-full bg-zinc-800 rounded-t-full"></div>
                <div className="w-full h-full bg-zinc-800 rounded-t-full relative overflow-hidden">
                    <motion.div
                        initial={{ rotate: -90 }}
                        animate={{ rotate: 45 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full bg-gradient-to-r from-red-500 via-yellow-500 to-teal-500 origin-bottom"
                    />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-24 bg-[#030303] rounded-full flex items-center justify-center border-4 border-[#030303] z-10">
                    <span className="text-lg font-bold text-white -mt-6">Bullish</span>
                </div>
            </div>
        </div>
    </Card>
);

export const DailyDrawdown = () => (
    <Card className="h-full flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-zinc-400">Daily Drawdown Limit</h3>
        </div>
        <div className="relative pt-2">
            <div className="flex justify-between text-xs font-bold text-zinc-500 mb-2">
                <span>Current: -$1,200</span>
                <span>Max: -$3,000</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '40%' }}
                    className="h-full bg-teal-500"
                />
            </div>
            <div className="mt-4 text-[10px] text-zinc-500 text-center">
                You have <span className="text-white font-bold">$1,800</span> remaining risk allowance.
            </div>
        </div>
    </Card>
);
