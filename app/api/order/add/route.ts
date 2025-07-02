import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const phpApiUrl = `${API_BASE_URL}order/add.php`;
    const requestData = await request.json();
    console.log('requestData:', requestData);
    try {
        // POSTリクエストのヘッダーとボディを設定
        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        }
        // PHP APIにリクエストを送信
        const res = await fetch(phpApiUrl, header);
        // レスポンスをJSON形式で取得
        const data = await res.json();
        // レスポンスを返す
        return Response.json(data);
    } catch {
        return new Response(JSON.stringify({
            error: 'オーダーの追加に失敗しました。',
            uri: phpApiUrl,
        }), { status: 500 });
    }
}