'use client';

import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Stars, Sparkles, PerformanceMonitor, useProgress, AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import ImmersiveScroll from './ImmersiveScroll';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

// Navigation UI component
function NavigationUI({ activeIndex, onScrollTo }: { activeIndex: number; onScrollTo: (index: number) => void }) {
    const items = [
        { label: 'Intro', id: 'intro', index: 0 },
        { label: 'Mature', id: 'mature', index: 1 },
        { label: 'Sundry', id: 'sundry', index: 2 },
        { label: 'Hobby', id: 'hobby', index: 3 },
    ];

    return (
        <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-[10000] flex flex-col gap-6 pointer-events-auto">
            {items.map((item) => (
                <button
                    key={item.label}
                    onClick={() => onScrollTo(item.index)}
                    className="group flex items-center justify-end gap-4 focus:outline-none cursor-pointer pointer-events-auto"
                >
                    <span className={`text-sm font-medium transition-all duration-300 ${activeIndex === item.index ? 'text-white translate-x-0 opacity-100' : 'text-white/50 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                        {item.label}
                    </span>
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${activeIndex === item.index ? 'bg-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/40 group-hover:bg-white/80'}`} />
                </button>
            ))}
        </nav>
    );
}

export default function Scene() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollToIndexRef = useRef<((index: number) => void) | null>(null);
    const { progress, active } = useProgress();
    const [ready, setReady] = useState(false);
    const [entered, setEntered] = useState(false);
    const [quality, setQuality] = useState<'high' | 'balanced'>('high');

    // Mark ready when assets finish or after a short safety timeout to avoid stuck overlay
    useEffect(() => {
        if (progress >= 99 || !active) {
            setReady(true);
            return;
        }
        const fallback = setTimeout(() => setReady(true), 1200);
        return () => clearTimeout(fallback);
    }, [progress, active]);

    useEffect(() => {
        if (!ready) return;
        const timer = setTimeout(() => setEntered(true), 120);
        return () => clearTimeout(timer);
    }, [ready]);

    const handleScrollTo = (index: number) => {
        if (scrollToIndexRef.current) {
            scrollToIndexRef.current(index);
        }
    };

    const setScrollToFunction = (fn: (index: number) => void) => {
        scrollToIndexRef.current = fn;
    };

    useEffect(() => {
        if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 8) {
            setQuality('balanced');
        }
    }, []);

    const sparklesConfig = useMemo(
        () =>
            quality === 'high'
                ? { count: 180, size: 2.2, speed: 0.2, opacity: 0.28 }    // Reduced count, increased size
                : { count: 100, size: 1.8, speed: 0.2, opacity: 0.22 },
        [quality],
    );

    const starsConfig = useMemo(
        () => (quality === 'high' ? { count: 3000, factor: 4.5 } : { count: 1800, factor: 4 }),  // Reduced count, increased size
        [quality],
    );

    return (
        <div className="w-full h-screen bg-black relative">
            <Link
                href="/?scene=robot"
                className="fixed left-8 top-8 z-[10001] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition hover:border-white/30 hover:text-white hover:bg-black/70"
            >
                <span className="inline-block">&larr;</span>
                <span>返回主页</span>
            </Link>

            <Canvas
                camera={{ position: [0, 0, 10], fov: 35 }}
                dpr={[1, 1.6]}
                gl={{ antialias: false, powerPreference: 'high-performance' }}
            >
                <color attach="background" args={['#020204']} />
                <fog attach="fog" args={['#020204', 5, 20]} />
                <AdaptiveDpr pixelated />

                <Suspense fallback={null}>
                    {/* Enhanced lighting for better depth and volume */}
                    <ambientLight intensity={0.4} />

                    {/* Main key light - strong */}
                    <directionalLight position={[10, 10, 5]} intensity={2.5} />

                    {/* Backlight - creates rim lighting */}
                    <directionalLight
                        position={[0, 5, -12]}
                        intensity={3.0}
                        color="#ffffff"
                    />

                    {/* Side lights for depth */}
                    <directionalLight position={[-8, 3, 3]} intensity={1.2} color="#ffffff" />
                    <directionalLight position={[8, 3, 3]} intensity={1.2} color="#ffffff" />

                    {/* Top light for volume */}
                    <directionalLight position={[0, 12, 0]} intensity={1.5} color="#ffffff" />

                    {/* Accent lights for detail */}
                    <pointLight position={[-5, -5, 5]} intensity={0.8} color="#4080ff" />
                    <pointLight position={[5, -5, 5]} intensity={0.8} color="#ff8040" />

                    <ImmersiveScroll
                        onActiveIndexChange={setActiveIndex}
                        setScrollToFunction={setScrollToFunction}
                        quality={quality}
                    />

                    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                        <Sparkles
                            count={sparklesConfig.count}
                            scale={20}
                            size={sparklesConfig.size}
                            speed={sparklesConfig.speed}
                            opacity={sparklesConfig.opacity}
                            color="#ffffff"
                        />
                    </Float>

                    <Stars
                        radius={100}
                        depth={50}
                        count={starsConfig.count}
                        factor={starsConfig.factor}
                        saturation={0}
                        fade
                        speed={1}
                    />

                    <EffectComposer multisampling={0}>
                        <Bloom
                            textureScale={quality === 'high' ? 0.6 : 0.4}      // Reduced resolution
                            luminanceThreshold={0.8}
                            mipmapBlur
                            intensity={quality === 'high' ? 0.65 : 0.45}       // Increased intensity to compensate
                            radius={0.5}
                        />
                        {/* Removed Noise - opacity was too low (0.03) to be noticeable */}
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Suspense>

                <PerformanceMonitor
                    onDecline={() => setQuality('balanced')}
                    onIncline={() => setQuality('high')}
                />
            </Canvas>

            {/* Navigation overlay */}
            <NavigationUI activeIndex={activeIndex} onScrollTo={handleScrollTo} />

            {/* Loading / transition overlay */}
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black transition-opacity duration-700"
                style={{ opacity: entered ? 0 : 1 }}
            />
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/70 text-sm tracking-widest uppercase transition-opacity duration-500"
                style={{ opacity: entered ? 0 : 1 }}
            >
                Preparing scene...
            </div>
        </div>
    );
}
