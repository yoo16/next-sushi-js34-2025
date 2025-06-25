import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col bg-gradient-to-b from-white to-sky-200 items-center justify-center min-h-screen">
            <img src="/images/site_logo.png" 
                className="w-[420px] mb-12"
                alt="はる寿司" />
            <Link
                href="/menu"
                className="px-6 py-3 bg-sky-600 text-white rounded-xl shadow hover:bg-sky-500 transition">
                注文開始
            </Link>
        </div>
    );
}
