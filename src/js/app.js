import { ProductService } from './services/ProductService.js';
import { CatalogView } from './views/CatalogView.js';
import { DetailView } from './views/DetailView.js';

export class App {
    constructor() {
        this.productService = new ProductService();
        
        this.catalogView = new CatalogView("productGrid", "noResults", (productId) => this.handleProductSelect(productId));
        this.detailView = new DetailView("detailSection", () => this.handleBackToCatalog());

        this.searchInput = document.getElementById("searchInput");
        this.searchBtn = document.getElementById("searchBtn");
        this.categorySelect = document.getElementById("categorySelect");

        this.initEvents();
    }

    async init() {
        try {
            const initialProducts = await this.productService.getAll();
            this.populateCategories(initialProducts);
            this.catalogView.render(initialProducts);
        } catch (error) {
            console.error("Error al inicializar la base de datos:", error);
        }
    }

    populateCategories(products) {
        if (!this.categorySelect) return;
        const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            this.categorySelect.appendChild(option);
        });
    }

    initEvents() {
        this.searchBtn.addEventListener("click", () => this.handleSearch());
        this.searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.handleSearch();
            }
        });

        if (this.categorySelect) {
            this.categorySelect.addEventListener("change", (e) => this.handleCategoryChange(e.target.value));
        }
    }

    async handleCategoryChange(category) {
        this.searchInput.value = ""; // Limpiar busqueda
        if (!category) {
            const products = await this.productService.getAll();
            this.catalogView.render(products);
        } else {
            const products = await this.productService.getProductsByCategory(category);
            this.catalogView.render(products);
        }
    }

    async handleSearch() {
        if (this.categorySelect) {
            this.categorySelect.value = ""; // Limpiar categoria
        }
        const filtered = await this.productService.search(this.searchInput.value);
        this.catalogView.render(filtered);
    }

    async handleProductSelect(productId) {
        const product = await this.productService.getById(productId);
        if (!product) {
            console.error("No se pudo cargar el producto con id:", productId);
            return;
        }
        this.catalogView.hide();
        this.detailView.render(product);
        this.detailView.show();
    }

    handleBackToCatalog() {
        this.detailView.hide();
        this.catalogView.show();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.init();
});