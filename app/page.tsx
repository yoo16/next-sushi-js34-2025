'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchSeats, visitBySeatId } from "@/lib/api";
import { Seat } from "@/types/Seat";

export default function Home() {
    // ルーター取得
    const router = useRouter();

    // 座席情報の状態
    const [seats, setSeats] = useState<Seat[]>([]);
    const [seatId, setSeatId] = useState<number>(1);
    const [visitId, setVisitId] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    // 初回マウント時
    useEffect(() => {
        // すでに訪問済みの場合はメニュー画面へリダイレクト
        const visitId = Number(localStorage.getItem("visit_id")) ?? 0;
        if (visitId > 0) {
            router.push('/menu');
            return;
        }
        // 座席情報をAPIから取得
        (async () => {
            const result = await fetchSeats();
            if (result.error) {
                setMessage(result.error);
            } else {
                setSeats(result.seats);
                // 最初の座席をデフォルト選択
                setSeatId(1); 
            }
        })();
    }, []);

    // 座席の変更
    function changeSeat(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedSeatId = Number(event.target.value);
        setSeatId(selectedSeatId);
    }

    // 訪問処理
    async function handleVisit() {
        // APIを呼び出して座席指定処理
        const result = await visitBySeatId(seatId);
        const visit = result?.visit;
        if (visit) {
            // 訪問IDを状態に保存
            setVisitId(visit.id);
        }
    }

    // 訪問開始処理
    function start() {
        if (visitId) {
            // 訪問情報をローカルストレージに保存
            localStorage.setItem("visit_id", String(visitId));
            // すでに訪問済みの場合は、メニュー画面へリダイレクト 
            router.push('/menu');
        }
    }

    // 戻る処理
    function back() {
        setVisitId(0);
    }

    return (
        <div className="flex flex-col bg-gradient-to-b from-white to-sky-200 items-center justify-center min-h-screen">
            <Image src="/site_logo.png" alt="はる寿司" width={500} height={300} className="m-6" />

            {visitId > 0 ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">ようこそ！</h1>
                    <p className="text-lg mb-6">あなたの席は {seats.find(seat => seat.id === seatId)?.number} 番です。</p>
                    <button
                        onClick={start}
                        className="px-6 py-3 bg-sky-600 text-white rounded-xl shadow hover:bg-sky-500 transition mb-6">
                        はじめる
                    </button>
                    <button
                        onClick={back}
                        className="px-6 py-3 bg-white text-sky-600 rounded-xl shadow mb-6">
                        もどる
                    </button>
                </>
            ) : (
                <>
                    <select onChange={(e) => changeSeat(e)} className="bg-white mb-6 p-3 rounded-lg">
                        {
                            seats.map((seat: Seat) => (
                                <option
                                    key={seat.id}
                                    value={seat.id}
                                >
                                    {seat.number} 番席
                                </option>
                            ))
                        }
                    </select>

                    <button
                        onClick={handleVisit}
                        className="px-6 py-3 bg-sky-600 text-white rounded-xl shadow hover:bg-sky-500 transition">
                        席を選択
                    </button>
                </>
            )}
            <div>
                {message && <p className="text-red-500 mt-4">{message}</p>}
            </div>
        </div >
    );
}