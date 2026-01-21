'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';
import Image from 'next/image';

type SizeGuideProps = {
    isOpen: boolean;
    onClose: () => void;
};

type Measurements = {
    length: string;
    width: string;
    sleeve: string;
};

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
    const [activeTab, setActiveTab] = useState<'abaya' | 'coat' | 'casual'>('abaya');
    const [measurements, setMeasurements] = useState<Measurements>({ length: '', width: '', sleeve: '' });
    const [isSaved, setIsSaved] = useState(false);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('user_measurements');
        if (saved) {
            setMeasurements(JSON.parse(saved));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('user_measurements', JSON.stringify(measurements));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#222] text-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-full transition-colors font-bold text-black bg-white/50 md:text-white md:bg-transparent">
                    <X size={24} />
                </button>

                {/* Left Side: Guide Image */}
                <div className="w-full md:w-3/5 bg-white text-black p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        Size Guide & Measurements <Ruler size={18} className="text-blue-500" />
                    </h2>

                    {/* Tabs */}
                    <div className="flex bg-neutral-100 rounded-lg p-1 mb-6 w-fit">
                        {(['abaya', 'coat', 'casual'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${activeTab === tab ? 'bg-white shadow-sm text-black' : 'text-neutral-500 hover:text-black'}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)} Style
                            </button>
                        ))}
                    </div>

                    {/* Image Placeholder */}
                    <div className="relative flex-1 min-h-[250px] sm:min-h-[350px] bg-neutral-50 rounded-xl overflow-hidden flex items-center justify-center border border-neutral-100">
                        <Image
                            src={`/tiler/${activeTab === 'abaya' ? '1' : activeTab === 'coat' ? '2' : '3'}.png`}
                            alt={`${activeTab} Size Guide`}
                            fill
                            className="object-contain p-4 mix-blend-multiply"
                        />
                    </div>
                </div>

                {/* Right Side: User Measurements Form */}
                <div className="w-full md:w-2/5 p-6 md:p-8 bg-[#1a1a1a] flex flex-col justify-center">
                    <h3 className="text-xl font-semibold mb-2">Your Measurements</h3>
                    <p className="text-neutral-400 text-sm mb-8">
                        Enter your measurements here. We'll save them for your future orders so you get the perfect fit every time.
                    </p>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1">Length (cm/inch)</label>
                            <input
                                type="text"
                                value={measurements.length}
                                onChange={(e) => setMeasurements({ ...measurements, length: e.target.value })}
                                placeholder="e.g. 52"
                                className="w-full bg-[#333] border border-transparent focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1">Width (cm/inch)</label>
                            <input
                                type="text"
                                value={measurements.width}
                                onChange={(e) => setMeasurements({ ...measurements, width: e.target.value })}
                                placeholder="e.g. 22"
                                className="w-full bg-[#333] border border-transparent focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1">Sleeve (cm/inch)</label>
                            <input
                                type="text"
                                value={measurements.sleeve}
                                onChange={(e) => setMeasurements({ ...measurements, sleeve: e.target.value })}
                                placeholder="e.g. 26"
                                className="w-full bg-[#333] border border-transparent focus:border-blue-500 rounded-lg px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className={`mt-8 w-full py-4 rounded-xl font-bold transition-all shadow-lg ${isSaved ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20'}`}
                    >
                        {isSaved ? 'Measurements Saved!' : 'Save Measurements'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
