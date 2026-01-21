'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Trigger confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white text-center">

                {/* Animated Checkmark */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                    className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 relative"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-green-600"
                    >
                        <Check size={48} strokeWidth={3} />
                    </motion.div>

                    {/* Pulsing effect */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-green-400 rounded-full -z-10 opacity-20"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-neutral-900 mb-4">Payment Successful!</h1>
                    <p className="text-neutral-500 mb-8 leading-relaxed">
                        Thank you for your purchase. We have received your order and sent a confirmation email to your inbox.
                    </p>
                </motion.div>

                {/* Order Info Card (Optional Placeholder) */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-neutral-50 rounded-2xl p-6 mb-8 border border-neutral-100"
                >
                    <div className="flex items-center justify-center gap-2 text-neutral-600 mb-2">
                        <span className="text-sm">Order Status</span>
                    </div>
                    <div className="text-lg font-semibold text-green-600 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Processing
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="space-y-3"
                >
                    <Link
                        href="/"
                        className="block w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                        <ShoppingBag size={20} />
                        Continue Shopping
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/account/orders"
                        className="block w-full py-4 text-neutral-500 hover:text-black font-medium transition-colors"
                    >
                        View My Orders
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
