export const imageUrl = (path: string) => {
    if (!path) return '';
    return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
}