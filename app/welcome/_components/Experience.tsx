'use client';

import { Environment, ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Suspense, useRef, useState, useEffect, useRef as useReactRef } from 'react';
import * as THREE from 'three';
import { ParticleField } from './ParticleField';
import { WelcomeScene, WelcomeFooter } from './WelcomeScene';
import { DashboardScene } from './DashboardScene';
import { useChatController } from './ChatOverlay';
import { useSearchParams } from 'next/navigation';

export function Experience({
    chat,
    onChatVisibilityChange
}: {
    chat?: ReturnType<typeof useChatController>;
    onChatVisibilityChange?: (visible: boolean) => void;
}) {
    const [envReady, setEnvReady] = useState(false);
    const searchParams = useSearchParams();
    const initialScene = searchParams.get('scene');
    const initialOffset = initialScene === 'robot' ? 1 : 0;

    useEffect(() => {
        const timer = setTimeout(() => setEnvReady(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <color attach="background" args={['#000000']} />
            <fog attach="fog" args={['#000000', 5, 40]} />

            <ambientLight intensity={0.1} />

            <spotLight
                position={[5, 10, 5]}
                angle={0.5}
                penumbra={1}
                intensity={2}
                color="#4f46e5"
                castShadow
            />

            <spotLight
                position={[0, 2, -4]}
                angle={0.6}
                penumbra={0.5}
                intensity={40}
                color="#ffffff"
                castShadow
            />

            <pointLight position={[-5, 0, 5]} intensity={0.5} color="#ec4899" />

            {envReady && (
                <Environment resolution={256}>
                    <mesh position={[0, 10, -2]} rotation={[Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[10, 2]} />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} side={THREE.DoubleSide} />
                    </mesh>

                    <mesh position={[0, -10, -2]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[10, 2]} />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} side={THREE.DoubleSide} />
                    </mesh>

                    <mesh position={[-5, 0, -5]} rotation={[0, Math.PI / 2, 0]}>
                        <planeGeometry args={[5, 2]} />
                        <meshBasicMaterial color="#4f46e5" toneMapped={false} side={THREE.DoubleSide} />
                    </mesh>

                    <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
                        <planeGeometry args={[15, 15]} />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} side={THREE.DoubleSide} />
                    </mesh>
                </Environment>
            )}

            <ParticleField count={600} />

            <ScrollControls pages={1.2} damping={0.4}>
                <SceneContent
                    chat={chat}
                    onChatVisibilityChange={onChatVisibilityChange}
                    initialOffset={initialOffset}
                />
            </ScrollControls>

            <EffectComposer enableNormalPass={false}>
                <Bloom
                    luminanceThreshold={0.8}
                    intensity={1.5}
                    radius={0.4}
                    levels={4}
                    mipmapBlur
                />
                <Vignette eskil={false} offset={-0.5} darkness={0.8} />
            </EffectComposer>
        </>
    );
}

function SceneContent({
    chat,
    onChatVisibilityChange,
    initialOffset = 0
}: {
    chat?: ReturnType<typeof useChatController>;
    onChatVisibilityChange?: (visible: boolean) => void;
    initialOffset?: number;
}) {
    const scroll = useScroll();
    const welcome3DRef = useRef<THREE.Group>(null);
    const dashboardRef = useRef<THREE.Group>(null);
    const beamRef = useRef<THREE.Mesh>(null);
    const lastVisibleRef = useReactRef<boolean>(false);
    const hasInitializedScrollRef = useReactRef<boolean>(false);

    useEffect(() => {
        if (!hasInitializedScrollRef.current && scroll.el && initialOffset > 0) {
            hasInitializedScrollRef.current = true;
            const timer = setTimeout(() => {
                if (scroll.el) {
                    const targetScroll = initialOffset * (scroll.el.scrollHeight - scroll.el.clientHeight);
                    scroll.el.scrollTop = targetScroll;
                }
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [initialOffset]);

    useFrame((state) => {
        const offset = scroll.offset; // 0 to 1
        const t = state.clock.getElapsedTime();

        state.camera.position.z = THREE.MathUtils.lerp(15, 18, offset);

        if (welcome3DRef.current && dashboardRef.current && beamRef.current) {
            // --- Welcome Scene 3D Logic ---
            // 这里控制整个组（包含 3D 模型和 Footer）向上飞走
            const welcomeExitProgress = THREE.MathUtils.smoothstep(offset, 0.05, 0.3);

            welcome3DRef.current.position.y = welcomeExitProgress * 5;
            welcome3DRef.current.scale.setScalar(1 + welcomeExitProgress * 0.2);
            welcome3DRef.current.rotation.x = welcomeExitProgress * 0.2;

            const welcomeOpacity = 1 - welcomeExitProgress;
            welcome3DRef.current.visible = welcomeOpacity > 0.01;

            // --- Beam Animation ---
            const beamExit = THREE.MathUtils.smoothstep(offset, 0.4, 0.6);
            const beamOpacity = 1 - beamExit;

            beamRef.current.rotation.y += 0.02;
            beamRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.1);

            if (beamRef.current.material instanceof THREE.Material) {
                beamRef.current.material.opacity = 0.5 * beamOpacity;
            }
            beamRef.current.visible = beamOpacity > 0.01;

            // --- Dashboard Scene Logic ---
            const dashboardProgress = THREE.MathUtils.smoothstep(offset, 0.3, 0.8);
            const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
            const moveProgress = easeOutCubic(dashboardProgress);

            dashboardRef.current.position.y = THREE.MathUtils.lerp(-15, -0.5, moveProgress);
            const scaleProgress = THREE.MathUtils.smoothstep(offset, 0.35, 0.7);
            dashboardRef.current.scale.setScalar(0.8 + scaleProgress * 0.2);
            dashboardRef.current.rotation.x = THREE.MathUtils.lerp(0.5, 0, moveProgress);

            dashboardRef.current.visible = dashboardProgress > 0.01;
        }

        const shouldShowChat = offset >= 0.6;
        if (onChatVisibilityChange && lastVisibleRef.current !== shouldShowChat) {
            lastVisibleRef.current = shouldShowChat;
            onChatVisibilityChange(shouldShowChat);
        }
    });

    return (
        <>
            <mesh ref={beamRef} position={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 20, 32]} />
                <meshBasicMaterial color="#4f46e5" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* 🔥 Welcome 组：包含 3D 模型和 2D Footer */}
            {/* 整个组受 useFrame 控制，会整体向上飞走 */}
            <group ref={welcome3DRef}>
                <WelcomeScene />
                <WelcomeFooter />
            </group>

            <group ref={dashboardRef} position={[0, -15, 0]}>
                <DashboardScene chat={chat} />
            </group>
        </>
    );
}