import React from 'react';
import { motion } from 'motion/react';

const FuturisticBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Gradient Blobs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6A38C2]/10 blur-[120px] rounded-full"
            />
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F83002]/5 blur-[120px] rounded-full"
            />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(#6A38C2 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
            />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
                 style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            />
        </div>
    );
};

export default FuturisticBackground;
