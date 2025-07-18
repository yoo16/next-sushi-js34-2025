'use client';

import { useEffect, useState } from 'react';
import { addOrder, fetchCategories, fetchOrders, fetchProducts } from '@/lib/api';

import { useRouter } from 'next/navigation';

import CategoryTabs from '@/components/CategoryTabs';
import OrderList from '@/components/OrderList';
import Modal from '@/components/OrderForm';
import TitleLink from '@/components/TitleLink';
import CheckoutForm from '@/components/CheckoutForm';
import ProductList from '@/components/ProductList';
import Setting from '@/components/Setting';

import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { Order } from '@/types/Order';

export default function HomePage() {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [product, setProduct] = useState<Product>();
    const [showCheckout, setShowCheckout] = useState(false);
    const [showSetting, setShowSetting] = useState(false);

    useEffect(() => {
        (async () => {
            // カテゴリデータの取得
            const { categories } = await fetchCategories();
            // 商品データの取得
            const { products } = await fetchProducts();
            // 訪問IDをローカルストレージから取得
            const visitId = Number(localStorage.getItem('visit_id')); 
            // 注文履歴を取得
            const { orders } = await fetchOrders(visitId);

            setOrders(orders)
            setCategories(categories);
            setProducts(products);
            setCurrentCategory(categories[0] || null);
        })();
    }, []);

    console.log('Categories:', categories);
    console.log('Products:', products);
    console.log('Current Category:', currentCategory);
    const filtered = products.filter(p => p.category_id === currentCategory?.id);

    // オーダーの確定
    const handleConfirmOrder = async (order: Order) => {
        // ローカルストレージから訪問ID（数字）を取得
        const visitId = Number(localStorage.getItem('visit_id'));
        console.log('Visit ID:', visitId);
        console.log('Order:', order);

        // PHP（バックエンド）にオーダーを送信する処理
        const result = await addOrder(visitId, order.product_id, order.quantity);
        console.log('Order added:', result);

        setOrders(prev => [...prev, order]);
        setProduct(undefined);
    };

    // 会計画面表示
    function onCheckout() {
        if (orders.length === 0) {
            return;
        }
        setShowCheckout(true);
    }

    // 会計完了
    function onComplete() {
        router.push('/complete');
    }

    return (
        <div>
            {/* 設定 */}
            {showSetting && <Setting onClose={() => setShowSetting(false)} />}
            {/* 注文フォーム */}
            {product && (
                <Modal
                    product={product}
                    onClose={() => setProduct(undefined)}
                    onConfirm={handleConfirmOrder}
                />
            )}
            {/* チェックアウトフォーム */}
            {showCheckout && (
                <CheckoutForm
                    orders={orders}
                    onClose={() => setShowCheckout(false)}
                    onComplete={onComplete}
                />
            )}
            {/* タイトルリンク */}
            <TitleLink />
            {/* 設定 */}
            <div className="flex justify-end items-center m-3">
                <button
                    className="text-sm w-16 bg-sky-600 text-white border px-3 py-1 rounded cursor-pointer"
                    onClick={() => setShowSetting(true)}
                >
                    設定
                </button>
            </div>
            {/* カテゴリータブ */}
            <CategoryTabs
                categories={categories}
                current={currentCategory}
                onSelect={setCurrentCategory}
            />
            {/* メニュー */}
            <div className="flex flex-col md:flex-row gap-6">
                <ProductList products={filtered} onOrder={setProduct} />
                <OrderList orders={orders} onCheckout={onCheckout} />
            </div>
        </div>
    );
}