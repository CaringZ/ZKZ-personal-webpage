'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    isWarping?: boolean;
}

export function ParticleField({ count = 600, isWarping = false }: ParticleFieldProps) {
    const mesh = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const speeds = new Float32Array(count);

        const color1 = new THREE.Color('#4f46e5'); // Indigo
        const color2 = new THREE.Color('#ec4899'); // Pink
        const color3 = new THREE.Color('#00ffff'); // Cyan

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Spread particles in a tunnel-like formation for warp effect
            const r = 10 + Math.random() * 30;
            const theta = Math.random() * 2 * Math.PI;
            const z = (Math.random() - 0.5) * 100;

            temp[i3] = r * Math.cos(theta);
            temp[i3 + 1] = r * Math.sin(theta);
            temp[i3 + 2] = z;

            // Mix colors
            const mixedColor = color1.clone().lerp(color2, Math.random()).lerp(color3, Math.random() * 0.5);
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            sizes[i] = Math.random() * 0.28;  // Increased from 0.2 to compensate for fewer particles
            speeds[i] = 0.1 + Math.random() * 0.5;
        }
        return { positions: temp, colors, sizes, speeds };
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            const positions = mesh.current.geometry.attributes.position.array as Float32Array;
            const warpFactor = isWarping ? 5 : 1;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                // Move particles towards camera (positive Z)
                positions[i3 + 2] += particles.speeds[i] * warpFactor;

                // Reset if too close
                if (positions[i3 + 2] > 20) {
                    positions[i3 + 2] = -80;
                }
            }

            mesh.current.geometry.attributes.position.needsUpdate = true;

            // Rotate entire field slowly
            mesh.current.rotation.z += 0.001 * warpFactor;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                    args={[particles.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                    args={[particles.colors, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={particles.sizes}
                    itemSize={1}
                    args={[particles.sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.14}        // Increased from 0.1
                vertexColors
                transparent
                opacity={0.7}      // Increased from 0.6
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
