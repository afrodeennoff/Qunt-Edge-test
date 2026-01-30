
'use client'

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import ProblemStatement from '@/components/landing/ProblemStatement';
import Differentiators from '@/components/landing/Differentiators';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import Qualification from '@/components/landing/Qualification';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import AnalysisDemo from '@/components/landing/AnalysisDemo';
import ErrorBoundary from '@/components/landing/ErrorBoundary';
import Loading from '@/components/landing/Loading';

const LandingClient: React.FC = () => {
    const router = useRouter();

    const navigateToLogin = () => {
        router.push('/authentication');
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen flex flex-col selection:bg-teal-500/30 relative bg-[#050505]">
                <Suspense fallback={<Loading />}>
                    <div className="fixed inset-0 grid-pattern pointer-events-none opacity-50"></div>
                    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>

                    <Navigation onAccessPortal={navigateToLogin} />
                    <main className="flex-grow relative z-10">
                        <Hero onStart={navigateToLogin} />
                        <ProblemStatement />
                        <AnalysisDemo />
                        <Differentiators />
                        <HowItWorks />
                        <Features />
                        <Qualification />
                        <CTA onStart={navigateToLogin} />
                    </main>
                    <Footer />
                </Suspense>
            </div>
        </ErrorBoundary>
    );
};

export default LandingClient;
