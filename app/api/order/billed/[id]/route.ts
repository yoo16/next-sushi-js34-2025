import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    console.log('visit_id:', id);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const phpApiUrl = `${API_BASE_URL}order/billed.php?visit_id=${id}`;
    try {
        // PHP APIにリクエストを送信
        const res = await fetch(phpApiUrl);
        // レスポンスをJSON形式で取得
        const data = await res.json();
        // レスポンスを返す
        return Response.json(data);
    } catch {
        return new Response(JSON.stringify({
            error: 'オーダーの取得に失敗しました。',
            uri: phpApiUrl,
        }), { status: 500 });
    }
}