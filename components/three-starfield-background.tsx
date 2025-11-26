'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles, Float, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Suspense, type ReactNode, useEffect, useMemo, useState } from 'react';

interface ThreeStarfieldBackgroundProps {
    children?: ReactNode;
    className?: string;
}

/**
 * Three.js-based starry sky background component
 * Extracted from demo/three-showcase/ for reuse across pages
 */
export function ThreeStarfieldBackground({ children, className = '' }: ThreeStarfieldBackgroundProps) {
    const [quality, setQuality] = useState<'high' | 'balanced'>('high');

    useEffect(() => {
        if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 8) {
            setQuality('balanced');
        }
    }, []);

    const sparklesConfig = useMemo(
        () =>
            quality === 'high'
                ? { count: 150, size: 2.0, speed: 0.2, opacity: 0.3 }      // Reduced count, increased size & opacity
                : { count: 100, size: 1.8, speed: 0.18, opacity: 0.24 },
        [quality],
    );

    const starsConfig = useMemo(
        () => (quality === 'high' ? { count: 3000, factor: 4.2 } : { count: 2000, factor: 3.6 }),  // Reduced count, increased size
        [quality],
    );

    return (
        <div className={`relative ${className}`} style={{ backgroundColor: 'transparent' }}>
            {/* Three.js Canvas with starry sky */}
            <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 35 }}
                    dpr={[1, quality === 'high' ? 1.5 : 1.2]}
                    gl={{ antialias: false, powerPreference: 'high-performance' }}
                >
                    <color attach="background" args={['#020204']} />
                    <fog attach="fog" args={['#020204', 5, 20]} />
                    <AdaptiveDpr pixelated />

                    <Suspense fallback={null}>
                        {/* Sparkles effect */}
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

                        {/* Stars field */}
                        <Stars
                            radius={100}
                            depth={50}
                            count={starsConfig.count}
                            factor={starsConfig.factor}
                            saturation={0}
                            fade
                            speed={1}
                        />

                        {/* Post-processing effects - Optimized */}
                        <EffectComposer multisampling={0}>
                            <Bloom
                                textureScale={quality === 'high' ? 0.6 : 0.45}     // Reduced from 1.0/0.75
                                luminanceThreshold={0.82}
                                mipmapBlur
                                intensity={quality === 'high' ? 0.8 : 0.65}        // Increased to compensate
                                radius={0.55}
                            />
                            {/* Removed Noise - opacity 0.03 was barely visible */}
                            <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        </EffectComposer>
                    </Suspense>

                    <PerformanceMonitor
                        onDecline={() => setQuality('balanced')}
                        onIncline={() => setQuality('high')}
                    />
                </Canvas>
            </div>

            {/* Content overlay */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
