'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

export default function CancelPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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
                    className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-8 relative"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-red-600"
                    >
                        <X size={48} strokeWidth={3} />
                    </motion.div>

                    {/* Pulsing effect */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-red-400 rounded-full -z-10 opacity-20"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-neutral-900 mb-4">Payment Cancelled</h1>
                    <p className="text-neutral-500 mb-8 leading-relaxed">
                        Your payment was not processed. No charges were made. You can try again or choose a different payment method.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="space-y-3"
                >
                    <Link
                        href="/checkout"
                        className="block w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Try Again
                    </Link>

                    <Link
                        href="/"
                        className="block w-full py-4 text-neutral-500 hover:text-black font-medium transition-colors"
                    >
                        Return to Home
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
