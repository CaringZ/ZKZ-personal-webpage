'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Experience } from './_components/Experience';
import { Loader } from '@react-three/drei';
import { ChatOverlay, useChatController } from './_components/ChatOverlay';

export default function CreativeConceptPage() {
    const chat = useChatController();
    const [chatVisible, setChatVisible] = useState(false);

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <ChatOverlay chat={chat} visible={chatVisible} />
            <Canvas
                camera={{ position: [0, 0, 15], fov: 35 }}
                dpr={[1, 1.5]}  // Reduced from [1, 2]
                gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}  // Disabled antialias & shadows
            >
                <Suspense fallback={null}>
                    <Experience chat={chat} onChatVisibilityChange={setChatVisible} />
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    );
}
