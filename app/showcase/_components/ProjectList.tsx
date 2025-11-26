'use client';

import { Scroll, ScrollControls } from '@react-three/drei';
import GlassCard from './GlassCard';
import { useThree } from '@react-three/fiber';

export default function ProjectList() {
    const { width } = useThree((state) => state.viewport);

    return (
        <ScrollControls pages={3} damping={0.1}>
            <Scroll>
                {/* This content stays fixed or moves with scroll depending on implementation. 
            For a simple list, we might just place them in 3D space. 
            Let's use Scroll to move the camera or content. 
            Actually, let's just place them horizontally for a wide view or vertically.
            Given "List", vertical makes sense, but for "Showcase", horizontal scroll is often nicer.
            Let's try a horizontal layout that scrolls.
        */}
            </Scroll>
            <Scroll html style={{ width: '100%', height: '100%' }}>
                {/* HTML Overlay if needed */}
            </Scroll>

            {/* 3D Content that scrolls */}
            <Scroll>
                <group position={[0, 0, 0]}>
                    <GlassCard
                        position={[0, 0, 0]}
                        title="Immersive Dashboard"
                        description="A futuristic data visualization platform with real-time analytics and 3D graph rendering."
                        color="#4a90e2"
                    />
                    <GlassCard
                        position={[0, -5, 0]}
                        title="Neural Interface"
                        description="Brain-computer interface simulation featuring particle-based neural network visualization."
                        color="#e24a90"
                    />
                    <GlassCard
                        position={[0, -10, 0]}
                        title="Quantum Solver"
                        description="Visualizing complex quantum states and superposition with interactive Bloch spheres."
                        color="#50e3c2"
                    />
                </group>
            </Scroll>
        </ScrollControls>
    );
}
