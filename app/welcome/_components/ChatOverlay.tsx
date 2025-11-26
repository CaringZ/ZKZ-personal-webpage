'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect, useRef } from 'react';
import { getChatResponse } from '@/lib/data/chat-data';

// Guide questions to cycle through when idle
const GUIDE_QUESTIONS = [
    "想知道我是怎么从美术老师转型做 AI 开发的吗？",
    "看看我如何用 AI 辅助写出 ComfyUI 节点？",
    "了解一下单人抵 30 人的自动化管线？",
    "聊聊我对‘冒名顶替综合症’的看法？",
    "看看我为 Blender 开发的自动化插件？",
    "想了解一下 AirShot 截图工具吗？",
    "去艺术画廊逛逛怎么样？"
];

export function useChatController() {
    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [robotMessage, setRobotMessage] = useState('');
    const [isIdle, setIsIdle] = useState(true); // Track if user is idle
    const [guideIndex, setGuideIndex] = useState(0);
    const [isHoveringBubble, setIsHoveringBubble] = useState(false); // New: Pause on hover

    // Timer refs
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const messageTimerRef = useRef<NodeJS.Timeout | null>(null);

    const resetIdleTimer = useCallback(() => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        // Set back to idle after 3 seconds of no interaction (User requested 3s)
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 3000);
    }, []);

    // Centralized Message Clearing Logic
    useEffect(() => {
        // If no message, or if hovering, do not clear
        if (!robotMessage || isHoveringBubble) {
            if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
            return;
        }

        // Determine duration: 6s for short guide questions, 8s for actual answers (User requested 8s)
        const duration = isIdle ? 6000 : 8000;

        if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
        messageTimerRef.current = setTimeout(() => {
            setRobotMessage('');
        }, duration);

        return () => {
            if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
        };
    }, [robotMessage, isHoveringBubble, isIdle]);

    // Cycle guide messages when idle
    useEffect(() => {
        // Don't cycle if not idle, or if hovering, or if there is already a message (wait for it to clear)
        if (!isIdle || isHoveringBubble || robotMessage) return;

        // Wait a short gap before showing the next guide message
        const timer = setTimeout(() => {
            // Double check inside timeout
            if (!isIdle || isHoveringBubble || robotMessage) return;

            setGuideIndex((prev) => (prev + 1) % GUIDE_QUESTIONS.length);
            setRobotMessage(GUIDE_QUESTIONS[guideIndex]);

        }, 1000); // 1s gap between bubbles

        return () => clearTimeout(timer);
    }, [isIdle, guideIndex, isHoveringBubble, robotMessage]);

    // Initial idle start
    useEffect(() => {
        resetIdleTimer();
        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [resetIdleTimer]);


    const handleOptionClick = useCallback((text: string) => {
        resetIdleTimer();
        setInputText(text);
        // Auto send for options? Or just fill? Let's just fill for now as per original, 
        // but user might expect auto-send. Original code just filled. 
        // Let's keep it filling to let user confirm.
    }, [resetIdleTimer]);

    const handleSend = useCallback((text?: string) => {
        const textToSend = text || inputText;
        if (!textToSend.trim()) return;

        resetIdleTimer();

        // Get response from local logic
        const response = getChatResponse(textToSend);
        setRobotMessage(response.text);

        // Clear input field
        setInputText('');

        // Note: We no longer clear the message here. The central useEffect handles it.

        // Handle navigation action if present
        if (response.action) {
            // Only spin when navigating
            setIsSending(true);
            setTimeout(() => {
                router.push(response.action!);
            }, 1500);
        }
    }, [inputText, router, resetIdleTimer]);

    // Update input handler to reset idle
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        resetIdleTimer();
        setInputText(e.target.value);
    };

    // Handle bubble click
    const handleBubbleClick = useCallback(() => {
        if (isIdle && robotMessage) {
            // If clicking a guide message, treat it as sending that question
            handleSend(robotMessage);
        }
    }, [isIdle, robotMessage, handleSend]);

    return {
        inputText,
        isSending,
        robotMessage,
        setInputText, // Keep for direct access if needed
        handleInputChange,
        handleOptionClick,
        handleSend,
        isIdle,
        setIsHoveringBubble,
        handleBubbleClick,
        resetIdleTimer
    };
}

export function ChatOverlay({
    chat,
    visible = true
}: {
    chat: ReturnType<typeof useChatController>;
    visible?: boolean;
}) {
    const { inputText, handleInputChange, handleOptionClick, handleSend, robotMessage, isIdle, setIsHoveringBubble, handleBubbleClick, resetIdleTimer } = chat;
    const [render, setRender] = useState(visible);
    const [animState, setAnimState] = useState<'hidden' | 'entering' | 'visible' | 'exiting'>('hidden');

    // Reset idle timer when chat becomes visible
    useEffect(() => {
        if (visible) {
            resetIdleTimer();
        }
    }, [visible, resetIdleTimer]);

    useEffect(() => {
        if (visible) {
            setRender(true);
            requestAnimationFrame(() => setAnimState('entering'));
            const timer = setTimeout(() => setAnimState('visible'), 500);
            return () => clearTimeout(timer);
        } else {
            setAnimState('exiting');
            const timer = setTimeout(() => {
                setRender(false);
                setAnimState('hidden');
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!render) return null;

    const isVisible = animState === 'visible' || animState === 'entering';

    return (
        <>
            {/* Robot Message Bubble - Positioned above robot's head */}
            {robotMessage && visible && (
                <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-50">
                    {/* Note: pointer-events-auto on the bubble itself, but container is none to let clicks pass through elsewhere */}
                    <div
                        className="absolute top-[18vh] animate-in fade-in zoom-in-95 duration-500 pointer-events-auto cursor-pointer group"
                        onMouseEnter={() => setIsHoveringBubble(true)}
                        onMouseLeave={() => setIsHoveringBubble(false)}
                        onClick={handleBubbleClick}
                    >
                        {/* Glassmorphism Sci-Fi Bubble */}
                        <div className={`relative p-5 rounded-2xl backdrop-blur-md border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] max-w-md transition-all duration-500 ${isIdle ? 'bg-black/40 text-blue-100/90 hover:bg-black/60 hover:scale-105' : 'bg-blue-950/60 text-white'}`}>

                            {/* Glowing accent line */}
                            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

                            <p className="text-base font-medium leading-relaxed tracking-wide text-center">
                                {robotMessage}
                            </p>

                            {/* Click Hint (Only show when idle/guide) */}
                            {isIdle && (
                                <div className="absolute -right-2 -top-2 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                            )}

                            {/* Sci-Fi Corners */}
                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-400/60 rounded-tl-md"></div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-blue-400/60 rounded-tr-md"></div>
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-blue-400/60 rounded-bl-md"></div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-400/60 rounded-br-md"></div>

                            {/* Bubble Tail */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/40 backdrop-blur-md border-b border-r border-blue-500/30 rotate-45"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Input Area */}
            <div className={`pointer-events-none fixed inset-x-0 bottom-[10vh] flex justify-center px-6 z-50 transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className={`pointer-events-auto w-full max-w-[480px] flex flex-col items-center gap-5 transition-all duration-700 delay-100 ${isVisible ? 'scale-100' : 'scale-95'}`}>

                    {/* Option Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-1">
                        <OptionButton onClick={() => handleOptionClick('查看商业案例')} label="商业案例" />
                        <OptionButton onClick={() => handleOptionClick('浏览开发作品')} label="项目开发" />
                        <OptionButton onClick={() => handleOptionClick('参观艺术画廊')} label="艺术画廊" />
                    </div>

                    {/* Input Field Container */}
                    <div className="relative w-full group">
                        {/* Glow effect behind input */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>

                        <input
                            type="text"
                            value={inputText}
                            onChange={handleInputChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="输入问题或点击上方选项..."
                            className="relative w-full px-8 py-4 rounded-full bg-black/60 backdrop-blur-xl text-white placeholder-white/40 focus:bg-black/70 focus:outline-none transition-all border border-white/10 focus:border-blue-500/50 shadow-lg"
                        />

                        <button
                            onClick={() => handleSend()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/5 hover:bg-blue-500/20 text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-blue-500/30"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function OptionButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className="px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-blue-400/40 text-sm text-white/80 hover:text-white hover:bg-blue-500/10 transition-all hover:scale-105 active:scale-95 shadow-lg group"
        >
            <span className="relative z-10">{label}</span>
        </button>
    );
}
