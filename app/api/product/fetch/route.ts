import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const phpApiUrl = `${API_BASE_URL}product/fetch.php`;

    try {
        const res = await fetch(phpApiUrl);
        const data = await res.json();
        return Response.json(data);
    } catch {
        return new Response(JSON.stringify({
            error: '商品情報の取得に失敗しました。',
            uri: phpApiUrl,
        }), { status: 500 });
    }
}