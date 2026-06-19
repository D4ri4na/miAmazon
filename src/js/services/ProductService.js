import { supabase } from '../config/supabase.js';

const TABLE_NAME = 'products';

export class ProductService {
    async getAll() {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error("Error cargando productos de Supabase:", error.message);
            return [];
        }
        return data;
    }

    async search(text) {
        const query = text.trim();
        if (!query) return this.getAll();

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .ilike('title', `%${query}%`); 

        if (error) {
            console.error("Error buscando en Supabase:", error.message);
            return [];
        }
        return data;
    }

    //EF
    async getInStock() {
        const { data, error } = await supabase.from(TABLE_NAME).select('*').gt('stock', 0);
        if (error) {
            console.error("Error filtrando stock:", error.message);
            return [];
        }
        return data;
    }

    calculateInventoryValue(products) {
        if (!products || products.length === 0) return 0;
        return products.reduce((total, p) => total + (p.price * p.stock), 0);
    }
}