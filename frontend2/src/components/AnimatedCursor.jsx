import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

const AnimatedCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const mouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = target.tagName === 'BUTTON' || 
                              target.tagName === 'A' || 
                              target.closest('button') || 
                              target.closest('a') ||
                              target.getAttribute('role') === 'button';
            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main Dot */}
            <motion.div
                className="absolute w-2 h-2 bg-[#6A38C2] rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? '#F83002' : '#6A38C2',
                }}
            />
            
            {/* Outer Ring */}
            <motion.div
                className="absolute w-10 h-10 border border-[#6A38C2]/30 rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 2 : 1,
                    borderColor: isHovering ? 'rgba(248, 48, 2, 0.4)' : 'rgba(106, 56, 194, 0.3)',
                    borderWidth: isHovering ? '2px' : '1px',
                }}
            />

            {/* Crosshair Lines (Futuristic Touch) */}
            <motion.div
                className="absolute w-4 h-[1px] bg-[#6A38C2]/20"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    rotate: isHovering ? 90 : 0,
                    width: isHovering ? 20 : 16,
                    opacity: isHovering ? 1 : 0.3,
                }}
            />
            <motion.div
                className="absolute h-4 w-[1px] bg-[#6A38C2]/20"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    rotate: isHovering ? 90 : 0,
                    height: isHovering ? 20 : 16,
                    opacity: isHovering ? 1 : 0.3,
                }}
            />
        </div>
    );
};

export default AnimatedCursor;
