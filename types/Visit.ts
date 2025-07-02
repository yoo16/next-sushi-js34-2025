export type Visit = {
    id: number;
    seat_id: number;
    status: '' | 'seated' | 'billed' | 'paid';
    total: number;
    total_with_tax: number;
    created_at: string;
    updated_at: string;
};