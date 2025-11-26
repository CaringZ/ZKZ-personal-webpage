'use client';

import { Float, RoundedBox, Sphere, Cylinder, Ring, Torus, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useChatController } from './ChatOverlay';

export function DashboardScene({ chat }: { chat?: ReturnType<typeof useChatController> }) {
    const chatState = chat || useChatController();
    const robotRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (robotRef.current) {
            // Idle animation: Float up and down with more complexity
            robotRef.current.position.y = 1.1 + Math.sin(t * 1.1) * 0.1 + Math.sin(t * 0.5) * 0.05;
            robotRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;

            if (chatState.isSending) {
                // Reaction: Happy Spin & Jiggle
                robotRef.current.rotation.y += 0.2;
                robotRef.current.position.y += Math.sin(t * 15) * 0.05;
            } else {
                // Head looks at mouse
                if (headRef.current) {
                    const targetX = (state.pointer.x * Math.PI) / 6;
                    const targetY = (-state.pointer.y * Math.PI) / 6;
                    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
                    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetY, 0.1);
                }
                // Body rotates slightly
                const targetBodyRot = (state.pointer.x * Math.PI) / 10;
                robotRef.current.rotation.y = THREE.MathUtils.lerp(robotRef.current.rotation.y, targetBodyRot, 0.05);
            }
        }
    });

    // Premium Materials
    const whiteMaterial = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: '#ffffff',
        emissiveIntensity: 1.1,
    });

    const blackMaterial = new THREE.MeshPhysicalMaterial({
        color: '#050505',
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 0.5
    });

    const glowMaterial = new THREE.MeshBasicMaterial({ color: '#4f46e5' }); // Blue eyes
    const activeGlowMaterial = new THREE.MeshBasicMaterial({ color: '#6366f1' }); // Brighter blue

    const jointMaterial = new THREE.MeshStandardMaterial({
        color: '#222',
        roughness: 0.4,
        metalness: 0.8
    });

    const holoMaterial = new THREE.MeshBasicMaterial({
        color: '#4f46e5',
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });

    const platformGlowMaterial = new THREE.MeshBasicMaterial({
        color: '#4f46e5',
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
    });

    return (
        <group ref={groupRef}>
            {/* Procedural Robot */}
            <group ref={robotRef} position={[0, 1.5, 0]} scale={[1.8, 1.8, 1.8]}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

                    {/* HEAD GROUP - Lowered to connect */}
                    <group ref={headRef} position={[0, 0.52, 0]}>
                        {/* Head Shell */}
                        <Sphere args={[0.5, 64, 64]} material={whiteMaterial} />

                        {/* Face Screen (Black Glass) */}
                        <Sphere args={[0.43, 64, 64]} position={[0, 0, 0.12]} scale={[1, 0.85, 1]} material={blackMaterial} />

                        {/* Eyes (Glowing) */}
                        <group position={[0, 0.05, 0.53]}>
                            {/* Left Eye */}
                            <RoundedBox args={[0.12, 0.06, 0.02]} radius={0.02} position={[-0.16, 0, 0]} material={glowMaterial} />
                            {/* Right Eye */}
                            <RoundedBox args={[0.12, 0.06, 0.02]} radius={0.02} position={[0.16, 0, 0]} material={glowMaterial} />
                        </group>

                        {/* Ears - Added */}
                        <Cylinder args={[0.12, 0.12, 0.1]} rotation={[0, 0, Math.PI / 2]} position={[-0.5, 0, 0]} material={whiteMaterial} />
                        <Cylinder args={[0.12, 0.12, 0.1]} rotation={[0, 0, Math.PI / 2]} position={[0.5, 0, 0]} material={whiteMaterial} />

                        {/* Antenna - REMOVED */}
                    </group>

                    {/* NECK AREA - Lowered to bridge gap */}
                    <group position={[0, -0.05, 0]}>
                        <Cylinder args={[0.12, 0.15, 0.2]} position={[0, 0, 0]} material={jointMaterial} />
                        <Torus args={[0.16, 0.04, 16, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} material={whiteMaterial} />
                    </group>

                    {/* BODY - Inverted Trapezoid (Broad shoulders, narrow waist) */}
                    <group position={[0, -0.65, 0]}>
                        {/* Main Body - Sharper Taper & Longer */}
                        <Cylinder args={[0.55, 0.15, 0.9, 32]} position={[0, 0, 0]} material={whiteMaterial} />

                        {/* Engine Core - Added in center */}
                        {/* Adjusted Z position to 0.45 to ensure it sits ON the body surface */}
                        <group position={[0, 0.15, 0.45]} rotation={[Math.PI / 12, 0, 0]}>
                            {/* Outer Ring */}
                            <Torus args={[0.15, 0.02, 16, 32]} material={jointMaterial} />
                            {/* Inner Glow - Blue */}
                            <Cylinder args={[0.12, 0.12, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={activeGlowMaterial} />
                            {/* Center Detail - Blue */}
                            <Sphere args={[0.08]} position={[0, 0, 0.02]} material={activeGlowMaterial} />
                        </group>

                        {/* Simple Belly Detail */}
                        <RoundedBox args={[0.2, 0.05, 0.02]} radius={0.01} position={[0, -0.35, 0.15]} material={jointMaterial} />
                    </group>

                    {/* ARMS - Simple Floating Ovals */}
                    {/* Left Arm */}
                    <group position={[-0.65, -0.3, 0]}>
                        <Sphere args={[0.14]} material={whiteMaterial} />
                        <group position={[0, -0.3, 0]}>
                            <RoundedBox args={[0.14, 0.25, 0.14]} radius={0.07} material={whiteMaterial} />
                            <Sphere args={[0.12]} position={[0, -0.18, 0]} material={jointMaterial} />
                        </group>
                    </group>
                    {/* Right Arm */}
                    <group position={[0.65, -0.3, 0]}>
                        <Sphere args={[0.14]} material={whiteMaterial} />
                        <group position={[0, -0.3, 0]}>
                            <RoundedBox args={[0.14, 0.25, 0.14]} radius={0.07} material={whiteMaterial} />
                            <Sphere args={[0.12]} position={[0, -0.18, 0]} material={jointMaterial} />
                        </group>
                    </group>

                    {/* Text Bubble - Now handled by ChatOverlay 2D component */}
                </Float>
            </group >
        </group >
    );
}
