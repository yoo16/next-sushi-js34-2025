// カテゴリー情報取得
export async function fetchCategories() {
    const res = await fetch('/api/category/fetch');
    return res.json();
}

// 商品情報取得
export async function fetchProducts() {
    const res = await fetch('/api/product/fetch');
    return res.json();
}

// 座席情報取得
export async function fetchSeats() {
    const res = await fetch('/api/seat/fetch');
    return res.json();
}

// 指定座席情報取得
export async function findSeat(seatId: number) {
    const res = await fetch(`/api/seat/${seatId}`);
    return res.json();
}

// 座席IDで訪問
export async function visitBySeatId(seatId: number) {
    const json = JSON.stringify({ seat_id: seatId });
    const res = await fetch('/api/visit/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    });
    return res.json();
}

// 訪問取得
export async function findVisit(visitId: number) {
    const res = await fetch(`/api/visit/${visitId}`);
    return res.json();
}

// 座席IDで訪問
export async function addOrder(visitId: number, productId: number, quantity: number = 1) {
    if (!visitId || !productId) return;
    const json = JSON.stringify({ 
        visit_id: visitId, 
        product_id: productId,
        quantity: quantity,
    });
    const res = await fetch('/api/order/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    });
    return res.json();
}

// 座席IDで訪問
export async function fetchOrders(visitId: number) {
    const json = JSON.stringify({ 
        visit_id: visitId, 
    });
    const res = await fetch(`/api/order/fetch/${visitId}`);
    return res.json();
}

// 指定座席情報取得
export async function billed(visitId: number) {
    const res = await fetch(`/api/order/billed/${visitId}`);
    return res.json();
}

// export async function fetchCategories() {
//     const res = await fetch("/api/category/fetch.json");
//     return res.json();
// }

// export async function fetchProducts() {
//     const res = await fetch("/api/product/fetch.json");
//     return res.json();
// }
