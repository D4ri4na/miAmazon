import { supabase } from '../config/supabase.js';

const TABLE_NAME = 'products';

export class ProductService {
    _handleError(message, error) {
        console.error(`${message}:`, error.message);
        return [];
    }

    async getAll() {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('id', { ascending: true });

       if (error) return this._handleError("Error cargando productos de Supabase", error);
        
        return data;
    }

    async search(text) {
        const query = text.trim();
        if (!query) return this.getAll();

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .ilike('title', `%${query}%`); 

        if (error) return this._handleError("Error buscando en Supabase", error);
        
        return data;
    }

    async getProductsByCategory(category) {
        if (!category || category.trim() === '') return this.getAll();

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('category', category.trim());

        if (error) return this._handleError("Error filtrando por categoría", error);
        return data;
    }

    //EF
    async getById(id) {
        const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('id', id);
        if (error || !data || data.length === 0) {
            console.error("Error o producto no encontrado");
            return null;
        }
        return data[0];
    }

    async getInStock() {
        const { data, error } = await supabase.from(TABLE_NAME).select('*').gt('stock', 0);
        if (error) return this._handleError("Error filtrando stock", error);
        
        return data;
    }

    calculateInventoryValue(products) {
        if (!products || products.length === 0) return 0;
        return products.reduce((total, p) => total + (p.price * p.stock), 0);
    }
}