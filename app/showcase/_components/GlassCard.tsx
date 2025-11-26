'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GlassCardProps {
    position: [number, number, number];
    title: string;
    description: string;
    color?: string;
}

export default function GlassCard({ position, title, description, color = '#ffffff' }: GlassCardProps) {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (mesh.current) {
            // Gentle floating animation
            mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;

            // Tilt on hover
            const targetRotationX = hovered ? 0.1 : 0;
            const targetRotationY = hovered ? 0.1 : 0;
            const targetScale = hovered ? 1.05 : 1;

            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotationX, delta * 5);
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotationY, delta * 5);
            mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, delta * 5));
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={mesh}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <boxGeometry args={[3, 4, 0.2]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    transmission={0.95}
                    roughness={0.2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    thickness={1.5}
                    ior={1.5}
                    chromaticAberration={0.06}
                    anisotropy={0.1}
                    distortion={0.0}
                    distortionScale={0.3}
                    temporalDistortion={0.5}
                    color={color}
                    background={new THREE.Color('#1a1a1a')}
                />

                <group position={[0, 0, 0.15]}>
                    <Text
                        anchorX="center"
                        anchorY="top"
                        maxWidth={2.5}
                        lineHeight={1.5}
                    >
                        {description}
                    </Text>
                </group>
            </mesh>
        </group>
    );
}
