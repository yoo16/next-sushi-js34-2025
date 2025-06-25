'use client';
import { useState, useEffect } from 'react';
import TitleLink from '@/components/TitleLink';
import { voices } from '@/lib/voiceOptions';

type Props = {
    onClose: () => void;
};

export default function Setting({ onClose }: Props) {
    const [selected, setSelected] = useState(() => localStorage.getItem("voice") || "");

    // 設定変更
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const voice = e.target.value;
        setSelected(voice);
        const audio = new Audio(`/audio/${voice}`);
        audio.play().catch((err) => {
            console.error("音声再生に失敗:", err);
        });
        // 選択した音声をローカルストレージに保存
        localStorage.setItem("voice", voice);
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center z-50">
            <div className="relative w-1/3">
                <TitleLink />
                <h2 className="text-lg font-bold mb-4 text-center">設定</h2>

                <div className="text-center mb-4">
                    <h3 className="font-bold mb-4">声優</h3>
                    {/* 音声プルダウン */}
                    <select value={selected} onChange={handleChange} className="w-full border p-2 rounded">
                        {voices.map(v => (
                            <option key={v.file} value={v.file}>
                                {v.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={onClose}
                        className="w-32 my-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded"
                    >
                        とじる
                    </button>
                </div>

            </div>
        </div>
    );
}
