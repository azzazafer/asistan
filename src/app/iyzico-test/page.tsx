"use client";

import { useState } from 'react';

export default function IyzicoTestPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<any>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

    const handleTestPayment = async () => {
        setStatus('loading');
        setLogs([]);
        addLog('Starting test payment...');

        try {
            const payload = {
                tenantId: 'TEST-TENANT-001', // Mock tenant
                amount: 100.00,
                paidPrice: 100.00,
                packageType: 'professional',
                cardHolderName: 'Iyzico Test User',
                cardNumber: '4111111111111111', // Test Card
                expireMonth: '12',
                expireYear: '30',
                cvc: '123',
                buyerName: 'John',
                buyerSurname: 'Doe',
                buyerEmail: 'test@auraos.com',
                buyerGsm: '+905555555555',
                buyerAddress: 'Istanbul, Turkey',
                buyerIp: '127.0.0.1'
            };

            addLog(`Sending POST request to /api/payments/pay with amount: ${payload.amount}`);

            const response = await fetch('/api/payments/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            addLog(`Response Status: ${response.status}`);

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            setResult(data);
            setStatus('success');
            addLog('Payment Successful! Result received.');
            console.log('Payment Result:', data);

        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setResult({ error: error.message });
            addLog(`ERROR: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-10 font-mono">
            <h1 className="text-3xl text-cyan-400 font-bold mb-6">Iyzico Integration Test Lab</h1>

            <div className="grid grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="p-6 border border-white/20 rounded-xl bg-white/5">
                        <h2 className="text-xl font-bold mb-4">Test Configuration</h2>
                        <pre className="text-xs text-green-300 overflow-auto">
                            {JSON.stringify({
                                endpoint: '/api/payments/pay',
                                amount: '100.00 TL',
                                card: '4111 **** **** 1111'
                            }, null, 2)}
                        </pre>
                    </div>

                    <button
                        onClick={handleTestPayment}
                        disabled={status === 'loading'}
                        className={`
                            w-full py-4 text-lg font-bold uppercase tracking-widest rounded-xl transition-all
                            ${status === 'loading' ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_20px_rgba(8,145,178,0.5)]'}
                        `}
                    >
                        {status === 'loading' ? 'Processing...' : 'RUN TEST PAYMENT'}
                    </button>

                    {status === 'success' && (
                        <div className="p-4 bg-green-900/30 border border-green-500 text-green-400 rounded-xl">
                            ✅ <strong>SUCCESS:</strong> Payment processed successfully.
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="p-4 bg-red-900/30 border border-red-500 text-red-400 rounded-xl">
                            ❌ <strong>FAILED:</strong> See logs for details.
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-400">Live Logs</h3>
                    <div className="bg-black border border-gray-800 rounded-xl p-4 h-[400px] overflow-auto font-mono text-xs text-gray-300">
                        {logs.length === 0 && <span className="opacity-30">Waiting for simulation...</span>}
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1 border-b border-gray-900 pb-1">{log}</div>
                        ))}
                    </div>
                    {result && (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Response Data</h3>
                            <pre className="bg-gray-900 p-4 rounded-xl text-xs overflow-auto max-h-[200px] text-yellow-300">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
