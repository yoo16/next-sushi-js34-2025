'use client';

import { useState } from "react";
import { Product } from "@/types/Product";

type Props = {
    product: Product;
    onOrder: () => void;
};

export default function ProductCard({ product, onOrder }: Props) {
    const [loaded, setLoaded] = useState(false);
    const priceWithTax = Math.round(product.price * 1.1);

    return (
        <div
            className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
            onClick={onOrder}
        >
            <div className="w-32 h-32 flex items-center justify-center mb-2 relative">
                商品画像
            </div>

            <div className="text-center">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-md py-4">
                    {product.price}円（税込 {priceWithTax}円）
                </p>
                <button className="w-full bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded cursor-pointer">注文</button>
            </div>
        </div>
    );
}