'use client';

import { useState } from "react";
import { Product } from "@/types/Product";
import { imageUrl } from "@/lib/image";

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
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-sky-500 rounded-full animate-spin" />
                    </div>
                )}
                <img
                    src={imageUrl(product.image_path)}
                    alt={product.name}
                    className={`w-32 object-cover rounded transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLoaded(true)}
                />
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