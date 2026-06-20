import { ProductService } from '../src/js/services/ProductService.js';
import { supabase } from '../src/js/config/supabase.js';

jest.mock('../src/js/config/supabase.js', () => ({
    supabase: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        ilike: jest.fn().mockReturnThis()
    }
}));

describe('Lógica de Negocio - Catálogo Amazon', () => {
    let service;

    beforeEach(() => {
        service = new ProductService();
        jest.clearAllMocks(); 
    });

    //1
   test('Debe retornar el catálogo completo de productos correctamente (HU-01)', async () => {
        const mockCatalog = [
            { id: 1, title: 'Laptop', price: 999, stock: 5 },
            { id: 2, title: 'Mouse', price: 25, stock: 0 } 
        ];
        supabase.order.mockResolvedValueOnce({ data: mockCatalog, error: null });

        const result = await service.getAll();
        
        expect(supabase.from).toHaveBeenCalledWith('products');
        expect(result).toHaveLength(2);
        expect(result[1].stock).toBe(0); 
    });

    //2
    test('Debe procesar la búsqueda formateando el texto y filtrando los resultados (HU-02)', async () => {
        const mockResult = [{ id: 1, title: 'Teclado Mecánico', price: 100 }];
        supabase.ilike.mockResolvedValueOnce({ data: mockResult, error: null });

        const searchQuery = '  Teclado  '; 
        const result = await service.search(searchQuery);
        
        expect(supabase.ilike).toHaveBeenCalledWith('title', '%Teclado%');
        expect(result[0].title).toBe('Teclado Mecánico');
    });

    //3
    test('Debe detectar una búsqueda vacía y redirigir automáticamente al catálogo general (HU-02)', async () => {
        const getAllSpy = jest.spyOn(service, 'getAll').mockResolvedValue(['Catálogo General']);
        
        const emptyQuery = '    '; 
        const result = await service.search(emptyQuery);
        
        expect(supabase.ilike).not.toHaveBeenCalled();
        expect(getAllSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(['Catálogo General']);
        
        getAllSpy.mockRestore();
    });

    //EF
    test('Debe retornar solo productos con stock mayor a 0 - EF', async () => {
        const mockProducts = [{ id: 1, title: 'Laptop', stock: 5 }];
        supabase.gt = jest.fn().mockResolvedValueOnce({ data: mockProducts, error: null });
        
        const result = await service.getInStock();
        expect(result.length).toBeGreaterThan(0);
    });

    test('Debe calcular el valor total del inventario (HU-05)', () => {
        const mockData = [{ price: 10, stock: 2 }, { price: 20, stock: 1 }];
        const total = service.calculateInventoryValue(mockData);
        expect(total).toBe(40);
    });

    test('Debe retornar productos filtrados por una categoria especifica (HU-06)', async () => {
        const mockCategoryData = [{ id: 1, title: 'Laptop', category: 'Electrónica' }];
        supabase.eq = jest.fn().mockResolvedValueOnce({ data: mockCategoryData, error: null });
        supabase.select.mockReturnThis(); 

        const result = await service.getProductsByCategory('Electrónica');

        expect(result[0].category).toBe('Electrónica');
    });
});