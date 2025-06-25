import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function TitleLink() {
    return (
        <h1 className="flex justify-center text-2xl font-bold mb-4">
            <Link href="/">
                タイトル画像
            </Link>
        </h1>
    )
}
