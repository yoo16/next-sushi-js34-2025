'use client';

import TitleLink from "@/components/TitleLink";
import Link from "next/link";

export default function CompletePage() {
    return (
        <div className="bg-sky-50 text-gray-800 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow text-center space-y-6 max-w-md">
                <TitleLink />
                <h2 className="text-2xl font-bold text-sky-600">ご利用ありがとうございました！</h2>
                <p className="text-lg">お会計は <span className="font-semibold text-red-500">レジ</span> にてお願いいたします。</p>
                <p className="text-gray-600">またのご利用を心よりお待ちしております。</p>
                <Link href="/" className="inline-block mt-4 text-sky-600 hover:underline">トップページへ戻る</Link>
            </div>
        </div>
    );
}