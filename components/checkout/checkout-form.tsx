'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export default function CheckoutForm() {
    return (
        <div className="space-y-8">
            {/* Billing Details */}
            <div>
                <h2 className="text-xl font-semibold mb-6">Billing details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">First Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="John" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <input type="text" placeholder="Doe" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Company Name</label>
                        <input type="text" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Region <span className="text-red-500">*</span></label>
                        <select className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5">
                            <option>Select your country</option>
                            <option value="bh">Bahrain</option>
                            <option value="sa">Saudi Arabia</option>
                            <option value="ae">United Arab Emirates</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Street Address <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="House number and street name" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
                        <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 mt-2" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Town/City <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium">Email Address <span className="text-red-500">*</span></label>
                        <input type="email" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <input type="checkbox" id="create-account" className="rounded border-gray-300 text-black focus:ring-black" />
                    <label htmlFor="create-account" className="text-sm text-gray-600">Create an Account</label>
                </div>

                <div className="mt-8">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2 cursor-pointer">
                        Ship to a different address?
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </h3>
                </div>

                <div className="mt-4">
                    <label className="text-sm font-medium">Other Notes (optional)</label>
                    <textarea className="w-full p-3 mt-1 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 h-24 resize-none" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                </div>
            </div>
        </div>
    );
}
