import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    console.log('visitId:', id);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const phpApiUrl = `${API_BASE_URL}order/fetch.php?visit_id=${id}`;

    try {
        const res = await fetch(phpApiUrl);
        const data = await res.json();
        console.log('data:', data);
        return Response.json(data);
    } catch {
        return new Response(JSON.stringify({
            error: 'オーダーの取得に失敗しました。',
            uri: phpApiUrl,
        }), { status: 500 });
    }
}