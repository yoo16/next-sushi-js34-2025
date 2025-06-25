'use client';

import { useState } from "react";
import { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard";

type Props = {
    products: Product[];
    onOrder: (product: Product) => void;
};

export default function ProductList({ products, onOrder }: Props) {
    return (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onOrder={() => onOrder(product)}
                />
            ))}
        </div>
    );
}