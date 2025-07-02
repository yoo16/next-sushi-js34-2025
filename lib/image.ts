// PHPのサーバの画像URLに変換
// .evn.localに NEXT_PUBLIC_BASE_URL を設定しておくこと
export const imageUrl = (path: string) => {
    if (!path) return '';
    return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
}