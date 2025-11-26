'use client';

import { Text, Float, Html, useScroll } from '@react-three/drei';
import { User, Github, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// --- 组件 1: 纯 3D 场景 (保持不变) ---
export function WelcomeScene() {
    const knotRef = useRef<THREE.Mesh>(null);
    const textGroupRef = useRef<THREE.Group>(null);

    const gradientMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uGradientStart: { value: 0.4 },
                uGradientEnd: { value: 1.0 },
            },
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uGradientStart;
                uniform float uGradientEnd;
                varying vec3 vPosition;
                void main() {
                    float normalizedY = (vPosition.y + 1.0) * 0.5;
                    float gradient = smoothstep(uGradientStart, uGradientEnd, normalizedY);
                    vec3 color = mix(vec3(1.0), vec3(0.2), gradient); 
                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            side: THREE.DoubleSide,
        });
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (knotRef.current) {
            knotRef.current.rotation.x = t * 0.2;
            knotRef.current.rotation.y = t * 0.1;
            const scale = 2.0 + Math.sin(t) * 0.1;
            knotRef.current.scale.setScalar(scale);
        }
        if (textGroupRef.current) {
            const baseY = 0.5;
            textGroupRef.current.position.y = baseY + Math.sin(t * 0.5) * 0.05;
        }
    });

    return (
        <group>
            <spotLight
                position={[5, 5, 5]}
                angle={0.4}
                penumbra={0.7}
                intensity={20}
                color="#8b7fff"
                distance={20}
            />
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <mesh ref={knotRef} scale={2.0} position={[0, 0, 0]}>
                    <torusKnotGeometry args={[1, 0.35, 120, 32]} />
                    <meshPhysicalMaterial
                        transmission={1}
                        thickness={1.0}
                        roughness={0}
                        metalness={0}
                        color="#ffffff"
                        attenuationColor="#ffffff"
                        attenuationDistance={5}
                        ior={1.5}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        envMapIntensity={2}
                    />
                </mesh>
                <group ref={textGroupRef} position={[0, 0, 1.8]}>
                    <Text
                        fontSize={2.5}
                        anchorX="center"
                        anchorY="middle"
                        letterSpacing={-0.05}
                        onSync={(troika) => {
                            if (troika) troika.material = gradientMaterial;
                        }}
                    >
                        PORTFOLIO
                    </Text>
                    <Text
                        fontSize={2.5}
                        anchorX="center"
                        anchorY="middle"
                        letterSpacing={-0.05}
                        fillOpacity={0}
                        strokeWidth={0.01}
                        strokeColor="#4f46e5"
                        strokeOpacity={0.8}
                        position={[0, 0, -0.1]}
                        scale={1.05}
                    >
                        PORTFOLIO
                    </Text>
                    <Text
                        fontSize={2.5}
                        anchorX="center"
                        anchorY="middle"
                        letterSpacing={-0.05}
                        fillOpacity={0}
                        strokeWidth={0.01}
                        strokeColor="#4f46e5"
                        strokeOpacity={0.4}
                        position={[0, 0, -0.2]}
                        scale={1.1}
                    >
                        PORTFOLIO
                    </Text>
                </group>
            </Float>
        </group >
    );
}

// --- 组件 2: Footer (修改了消失时机) ---
export function WelcomeFooter() {
    const footerRef = useRef<HTMLDivElement>(null);
    const scroll = useScroll();
    const [domReady, setDomReady] = useState(false);

    useEffect(() => {
        setDomReady(true);
    }, []);

    useFrame(() => {
        const offset = scroll.offset;
        
        // 🔥 修改点：同步 3D 场景的节奏
        // 之前是 0 -> 0.05 (秒没)
        // 现在是 0.05 -> 0.3 (跟着 3D 模型一起慢慢淡出)
        // 这样当你刚开始滚动时，Footer 还会停留一会儿，直到相机真正开始拉远
        const opacity = 1 - THREE.MathUtils.smoothstep(offset, 0.05, 0.3);

        if (footerRef.current) {
            footerRef.current.style.opacity = opacity.toString();
            // 只有当完全看不见时才禁用点击
            footerRef.current.style.pointerEvents = opacity > 0.01 ? 'auto' : 'none';
        }
    });

    return (
        <group position={[0, -4, 0]}>
            {domReady && (
                <Html
                    center
                    transform
                    wrapperClass="welcome-footer"
                    zIndexRange={[100, 0]}
                    portal={{ current: document.body }}
                >
                    <div
                        ref={footerRef}
                        className="flex flex-col items-center justify-center gap-1 select-none pointer-events-auto transition-opacity duration-75"
                        style={{ opacity: 1 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="group cursor-pointer">
                                <User
                                    size={11}
                                    className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
                                />
                            </div>
                            <a
                                href="https://github.com/CaringZ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group cursor-pointer"
                            >
                                <Github
                                    size={11}
                                    className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
                                />
                            </a>
                            <div
                                className="group cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText("zkz19000057@gmail.com");
                                    toast.success("已复制Email");
                                }}
                            >
                                <Mail
                                    size={11}
                                    className="text-zinc-400 transition-colors duration-300 group-hover:text-white"
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-[6px] font-light tracking-[0.2em] text-zinc-300 uppercase">
                                Code is my new Canvas
                            </p>
                        </div>

                        <div className="text-center mt-0.5">
                            <p className="text-[4px] font-light tracking-wider text-zinc-600">
                                © 2025 Your Name. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}