'use client';

import { Order } from "@/types/Order";

type Props = {
    orders: Order[];
    onCheckout: () => void;
};

export default function OrderList({ orders, onCheckout }: Props) {
    const total = orders.reduce((sum, o) => sum + o.quantity * 100, 0); // 仮価格計算
    const totalWithTax = Math.round(total * 1.1);

    return (
        <div className="w-full md:w-78 bg-white p-4 rounded shadow">
            <h2 className="text-center text-xl font-semibold mb-2">注文履歴</h2>
            <ul className="mb-4 space-y-1 max-h-64 overflow-y-auto">
                <li key={1} className="flex justify-start items-center mb-2">
                    <div>商品画像1</div>
                    <div className="font-bold">商品名1</div>
                    <span className="ml-auto px-3 py-1 text-white bg-green-500 rounded">1</span>
                </li>
                <li key={2} className="flex justify-start items-center mb-2">
                    <div>商品画像2</div>
                    <div className="font-bold">商品名2</div>
                    <span className="ml-auto px-3 py-1 text-white bg-green-500 rounded">2</span>
                </li>
                <li key={3} className="flex justify-start items-center mb-2">
                    <div>商品画像3</div>
                    <div className="font-bold">商品名3</div>
                    <span className="ml-auto px-3 py-1 text-white bg-green-500 rounded">1</span>
                </li>
            </ul>
            <div className="my-4 text-right text-md font-semibold">
                合計：0円
                （税込 0円）
            </div>
            <button
                className={`block w-full cursor-pointer bg-sky-600 text-white px-6 py-3 rounded text-lg text-center hover:bg-sky-700 transition ${orders.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onCheckout}
                disabled={orders.length === 0}
            >
                お会計
            </button>
        </div>
    );
}
