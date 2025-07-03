'use client';

import { useState } from "react";
import { Product } from "@/types/Product";
import { Order } from "@/types/Order";
import TitleLink from "./TitleLink";
import { voices } from "@/lib/voiceOptions";
import { imageUrl } from "@/lib/image";

type Props = {
    product: Product;
    onClose: () => void;
    onConfirm: (order: Order) => void;
};

export default function Modal({ product, onClose, onConfirm }: Props) {
    const [quantity, setQuantity] = useState(1);
    const priceWithTax = Math.round(product.price * 1.1);

    if (!product) return null;

    const handleConfirm = () => {
        const order: Order = {
            product_id: product.id,
            price: product.price,
            quantity,
            product_name: product.name,
            product_image_path: product.image_path,
        };

        // 注文処理
        onConfirm(order);
        onClose();

        // TODO: 音声ファイルの読み込みと再生
        const defaultVoice = voices[0].file; // デフォルトの音声ファイル
        // ローカルストレージから音声ファイルを取得
        // なければデフォルトの音声を使用
        const voiceFile = localStorage.getItem("voice") || defaultVoice;
        const audio = new Audio(`/audio/${voiceFile}`);
        audio.play();
    };


    return (
        // TODO: モーダルウィンドウ化
        // className="fixed inset-0 bg-white bg-opacity-90 flex justify-center z-50"
        <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center z-50">
            <div>
                <TitleLink />
                <div className="bg-white p-6">
                    <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
                    <div className="flex justify-center mb-4">
                        {/* PHPのURLにする */}
                        <img src={imageUrl(product.image_path)} className="w-32" />
                    </div>
                    <p className="text-center mb-4">価格: {product.price}円（税込: {priceWithTax}円)</p>

                    {/* 🔢 数量調整 */}
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="bg-sky-500 text-white px-3 py-2 rounded-full text-xl"
                        >－</button>
                        <span className="text-xl font-bold p-4">{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            className="bg-sky-500 text-white px-3 py-2 rounded-full text-xl"
                        >＋</button>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 cursor-pointer bg-sky-600 text-white rounded"
                        >
                            注文する
                        </button>
                        <button
                            onClick={onClose}
                            className="border border-sky-500 text-sky-600 px-6 py-2 rounded hover:bg-sky-100 transition"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
