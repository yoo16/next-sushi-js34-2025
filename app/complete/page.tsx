'use client';

import TitleLink from "@/components/TitleLink";
import { billed } from "@/lib/api";
import Link from "next/link";
import { useEffect } from "react";

export default function CompletePage() {

    useEffect(() => {
        // visit_idを取得して、会計処理を実行
        const visitId = Number(localStorage.getItem('visit_id'));
        bill(visitId);
    }, []);

    /**
     * 請求処理
     * 
     * @param visitId 
     * @returns 
     */
    async function bill(visitId: number) {
        try {
            const result = await billed(visitId)
            if (result.error) {
                console.log('チェックアウト失敗:', result.error);
                return;
            } else {
                console.log('チェックアウト成功:', result);
                // ローカルストレージからvisit_idとseat_idを削除
                localStorage.removeItem('visit_id');
            }
        } catch (error) {
            console.error('会計処理中にエラー:', error);
        } finally {

        }
    }

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