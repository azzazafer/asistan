
import { NextResponse } from 'next/server';

// ZOMBİ STRIPE KODU SİLİNDİ. ARTIK IYZICO VAR.
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Şimdilik mock bir yanıt dönelim ki sistem çökmesin.
        // İleride buraya gerçek Iyzico 'InitializeCheckoutForm' kodunu koyacağız.
        return NextResponse.json({
            success: true,
            message: "Iyzico Session Created (Mock)",
            url: "/dashboard/payment-success-mock" // Stripe URL'i yerine sahte başarı sayfası
        });

    } catch (error) {
        return NextResponse.json({ error: "Payment Init Failed" }, { status: 500 });
    }
}
