import { Order } from "@/types/Order";
import TitleLink from "@/components/TitleLink";

type Props = {
    orders: Order[];
    onClose: () => void;
    onComplete: () => void;
};

export default function CheckoutModal({ orders, onClose, onComplete }: Props) {
    const total = orders.reduce((sum, o) => sum + o.quantity * 100, 0); // 仮価格
    const totalWithTax = Math.round(total * 1.1);

    return (
        <div className="fixed inset-0 bg-white flex justify-center z-50">
            <div>
                <TitleLink />

                <h2 className="text-2xl font-bold mb-4 text-center">お会計</h2>

                {orders.length > 0 ? (
                    <div className="space-y-2 mb-4">
                        {orders.map((order, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-gray-300 p-3">
                                <div>{order.product_name}</div>
                                <div className="text-gray-600">×{order.quantity}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">注文はありません。</p>
                )}

                <p className="text-center mb-4 text-lg">
                    合計：<span className="font-bold">{total}円（税込{totalWithTax}円）</span>
                </p>

                <div className="text-center text-xl p-4 font-bold">この内容でお会計しますか？</div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onComplete}
                        className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition"
                    >
                        はい
                    </button>
                    <button
                        onClick={onClose}
                        className="border border-sky-500 text-sky-600 px-6 py-2 rounded hover:bg-sky-100 transition"
                    >
                        いいえ
                    </button>
                </div>
            </div>
        </div>
    );
}