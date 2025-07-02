import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    if (params.id === "fetch") {
        return new Response("Not Found", { status: 404 });
    }

    const { id } = await params;
    console.log('id:', id);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const phpApiUrl = `${API_BASE_URL}seat/find.php?id=${id}`;

    try {
        const res = await fetch(phpApiUrl);
        const data = await res.json();
        console.log('data:', data);
        return Response.json(data);
    } catch {
        return new Response(JSON.stringify({
            error: '座席情報の取得に失敗しました。',
            uri: phpApiUrl,
        }), { status: 500 });
    }
}