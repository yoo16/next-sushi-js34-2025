import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function TitleLink() {
    return (
        <h1 className="flex justify-center text-2xl font-bold mb-4">
            <Link href="/">
                <Image src={"/images/site_logo.png"} alt="はる寿司" width={200} height={50} className="m-4" />
            </Link>
        </h1>
    )
}
