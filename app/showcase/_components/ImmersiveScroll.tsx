'use client';

import { Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { projects } from '@/lib/data/projects';
import GlassObject from './GlassObject';
import Link from 'next/link';
import { useEffect, useRef, useMemo, type MutableRefObject } from 'react';

// Component to track scroll position and update parent
function ScrollTracker({
    onActiveIndexChange,
    scrollToIndexRef,
    setScrollToFunction
}: {
    onActiveIndexChange: (index: number) => void;
    scrollToIndexRef: MutableRefObject<((index: number) => void) | null>;
    setScrollToFunction: (fn: (index: number) => void) => void;
}) {
    const scroll = useScroll();
    const targetOffsetRef = useRef<number | null>(null);
    const isAnimatingRef = useRef(false);

    useFrame(() => {
        const offset = scroll.offset;

        // Handle programmatic scrolling
        if (targetOffsetRef.current !== null && scroll.el) {
            const scrollContainer = scroll.el;
            const current = scrollContainer.scrollTop;
            const target = targetOffsetRef.current * (scrollContainer.scrollHeight - scrollContainer.clientHeight);
            const diff = target - current;

            if (Math.abs(diff) > 1) {
                scrollContainer.scrollTop += diff * 0.1; // Smooth scroll
            } else {
                scrollContainer.scrollTop = target;
                targetOffsetRef.current = null;
                isAnimatingRef.current = false;
            }
        }

        // Update active index based on scroll position
        if (!isAnimatingRef.current) {
            let newIndex = 0;
            if (offset < 0.15) newIndex = 0;
            else if (offset < 0.45) newIndex = 1;
            else if (offset < 0.75) newIndex = 2;
            else newIndex = 3;

            onActiveIndexChange(newIndex);
        }
    });

    // Register scroll control function
    useEffect(() => {
        const scrollFn = (index: number) => {
            // Map index to scroll offset
            const offsetMap: { [key: number]: number } = {
                0: 0,      // Intro
                1: 0.25,   // Mature
                2: 0.58,   // Sundry (slightly lower so all text is visible)
                3: 0.85,   // Hobby
            };

            targetOffsetRef.current = offsetMap[index] ?? 0;
            isAnimatingRef.current = true;
            onActiveIndexChange(index);
        };

        scrollToIndexRef.current = scrollFn;
        setScrollToFunction(scrollFn);

        return () => {
            scrollToIndexRef.current = null;
        };
    }, [scrollToIndexRef, onActiveIndexChange, setScrollToFunction]);

    // Detect user interaction to cancel programmatic scroll
    useEffect(() => {
        const el = scroll.el;
        if (!el) return;

        const handleUserInteraction = () => {
            // If user interacts, cancel the auto-scroll
            if (targetOffsetRef.current !== null) {
                targetOffsetRef.current = null;
                isAnimatingRef.current = false;
            }
        };

        // Listen for various user inputs that should interrupt scrolling
        el.addEventListener('wheel', handleUserInteraction, { passive: true });
        el.addEventListener('touchstart', handleUserInteraction, { passive: true });
        el.addEventListener('keydown', handleUserInteraction, { passive: true });
        el.addEventListener('mousedown', handleUserInteraction, { passive: true });

        return () => {
            el.removeEventListener('wheel', handleUserInteraction);
            el.removeEventListener('touchstart', handleUserInteraction);
            el.removeEventListener('keydown', handleUserInteraction);
            el.removeEventListener('mousedown', handleUserInteraction);
        };
    }, [scroll.el]);

    return null;
}

export default function ImmersiveScroll({
    onActiveIndexChange,
    setScrollToFunction,
    quality = 'balanced'
}: {
    onActiveIndexChange: (index: number) => void;
    setScrollToFunction: (fn: (index: number) => void) => void;
    quality?: 'high' | 'balanced';
}) {
    const { width, height } = useThree((state) => state.viewport);
    const scrollToIndexRef = useRef<((index: number) => void) | null>(null);

    // Cache filtered arrays to prevent re-computation
    const matureProjects = useMemo(() => projects.filter(p => p.type === 'mature'), []);
    const pluginProjects = useMemo(() => projects.filter(p => p.type === 'plugin'), []);
    const hobbyProjects = useMemo(() => projects.filter(p => p.type === 'hobby'), []);

    return (
        <ScrollControls pages={5} damping={0.2}>

            {/* Content Layer */}
            <Scroll html style={{ width: '100vw', height: '100vh', pointerEvents: 'auto' }}>
                <div className="w-full text-white font-sans">

                    {/* Hero Section */}
                    <section id="intro" className="h-screen flex flex-col justify-center items-center text-center p-10 relative">
                        <h1 className="text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/10 drop-shadow-2xl">
                            Showcase
                        </h1>
                        <p className="text-xl text-white/60 max-w-xl font-light tracking-wide">
                            Exploring the intersection of code, design, and automation.
                        </p>
                        <div className="absolute bottom-20 animate-pulse text-white/20 text-sm tracking-widest uppercase">
                            Scroll to Begin
                        </div>
                    </section>

                    {/* Mature Projects */}
                    <section id="mature" className="min-h-[120vh] flex items-center p-20">
                        <div className="w-1/2 pl-10">
                            <h2 className="text-7xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#4a90e2] to-white/50">Mature</h2>
                            <div className="flex flex-col gap-20">
                                {matureProjects.map(p => (
                                    <Link key={p.id} href={`/projects/${p.id}`} className="group relative inline-block max-w-3xl">
                                        <div className="absolute -left-8 top-0 w-[2px] h-full bg-gradient-to-b from-[#4a90e2] to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                                        <h3 className="text-4xl font-bold mb-4 group-hover:text-[#4a90e2] transition-colors">{p.title}</h3>
                                        <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-md">{p.description}</p>
                                        <div className="flex flex-wrap gap-3">
                                            {p.technologies.map(t => (
                                                <span key={t} className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/40 group-hover:border-[#4a90e2]/30 group-hover:text-[#4a90e2] transition-all">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Sundry */}
                    <section id="sundry" className="min-h-[120vh] flex items-center justify-end p-20 text-right relative z-20">
                        <div className="w-1/2 pr-10">
                            <h2 className="relative z-30 inline-block text-7xl font-bold leading-[1.25] pt-2 pb-4 mb-16 text-transparent bg-clip-text bg-gradient-to-l from-[#e24a90] to-white/50 drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]">
                                Sundry
                            </h2>
                            <div className="grid grid-cols-1 gap-12">
                                {pluginProjects.map(p => (
                                    <Link
                                        key={p.id}
                                        href={`/projects/${p.id}`}
                                        className="group relative inline-block max-w-xl ml-auto text-right hover:-translate-x-4 transition-transform duration-500"
                                    >
                                        <h3 className="text-3xl font-bold mb-2 group-hover:text-[#e24a90] transition-colors">{p.title}</h3>
                                        <p className="text-white/60 mb-4 ml-auto max-w-md">{p.description}</p>
                                        <div className="flex flex-wrap gap-2 justify-end">
                                            {p.technologies.slice(0, 3).map(t => (
                                                <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 text-white/30">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Hobby - Timeline Style */}
                    <section id="hobby" className="min-h-[100vh] flex items-center p-20">
                        <div className="w-1/2 pl-10">
                            <h2 className="text-7xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#50e3c2] to-white/50">Experiments</h2>
                            <div className="flex flex-col gap-4 max-w-lg">
                                {hobbyProjects.map((p, index) => (
                                    <Link
                                        key={p.id}
                                        href={`/projects/${p.id}`}
                                        className="relative pl-6 py-4 border-l-2 border-[#50e3c2]/20 hover:border-[#50e3c2] transition-all duration-300 group"
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#50e3c2]/40 group-hover:bg-[#50e3c2] group-hover:scale-150 transition-all duration-300" />
                                        <h3 className="text-lg font-bold mb-2 group-hover:text-[#50e3c2] transition-colors">{p.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{p.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    <footer className="h-[50vh] flex flex-col items-center justify-center text-white/20 gap-4">
                        <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent" />
                        <p className="text-sm tracking-widest uppercase">End of Showcase</p>
                    </footer>

                </div>
            </Scroll>

            {/* 3D Decorative Layer */}
            <Scroll>
                {/* Hero Object */}
                <GlassObject position={[0, 0, 0]} shape="octahedron" scale={2.5} color="#ffffff" quality={quality} />

                {/* Mature Section Object */}
                <GlassObject position={[width * 0.3, -height * 1.2, 0]} shape="torus" scale={3} color="#4a90e2" quality={quality} />

                {/* Sundry Section Object */}
                <GlassObject position={[-width * 0.3, -height * 2.5, 0]} shape="sphere" scale={2.5} color="#e24a90" quality={quality} />

                {/* Hobby Section Object */}
                <GlassObject
                    position={[width * 0.35, -height * 3.6, -1.5]}
                    shape="box"
                    scale={2.8}
                    color="#50e3c2"
                    quality={quality}
                />
            </Scroll>

            {/* Scroll position tracker */}
            <ScrollTracker
                onActiveIndexChange={onActiveIndexChange}
                scrollToIndexRef={scrollToIndexRef}
                setScrollToFunction={setScrollToFunction}
            />
        </ScrollControls>
    );
}
