'use client';

import { useEffect, useState } from 'react';
import { Ruler } from 'lucide-react';

export default function UserMeasurementsDisplay() {
    const [measurements, setMeasurements] = useState<{ length: string, width: string, sleeve: string } | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('user_measurements');
        if (saved) {
            setMeasurements(JSON.parse(saved));
        }
    }, []);

    if (!measurements || (!measurements.length && !measurements.width && !measurements.sleeve)) return null;

    return (
        <div className="mt-4 p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-orange-900 mb-2">
                <Ruler size={14} /> My Measurements
            </h4>
            <div className="flex gap-4 text-sm text-orange-800">
                {measurements.length && (
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase opacity-70">Length</span>
                        <span className="font-medium">{measurements.length}</span>
                    </div>
                )}
                {measurements.width && (
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase opacity-70">Width</span>
                        <span className="font-medium">{measurements.width}</span>
                    </div>
                )}
                {measurements.sleeve && (
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase opacity-70">Sleeve</span>
                        <span className="font-medium">{measurements.sleeve}</span>
                    </div>
                )}
            </div>
            <p className="text-[10px] text-orange-700/60 mt-2">
                These measurements will be attached to your order for custom tailoring.
            </p>
        </div>
    );
}
