import { ProductService } from './services/ProductService.js';
import { CatalogView } from './views/CatalogView.js';
import { DetailView } from './views/DetailView.js';

export class App {
    constructor() {
        this.productService = new ProductService();
        
        this.catalogView = new CatalogView("productGrid", "noResults", (product) => this.handleProductSelect(product));
        this.detailView = new DetailView("detailSection", () => this.handleBackToCatalog());

        this.searchInput = document.getElementById("searchInput");
        this.searchBtn = document.getElementById("searchBtn");

        this.initEvents();
    }

    async init() {
        try {
            const initialProducts = await this.productService.getAll();
            this.catalogView.render(initialProducts);
        } catch (error) {
            console.error("Error al inicializar la base de datos:", error);
        }
    }

    initEvents() {
        this.searchBtn.addEventListener("click", () => this.handleSearch());
        this.searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.handleSearch();
            }
        });
    }

    async handleSearch() {
        const filtered = await this.productService.search(this.searchInput.value);
        this.catalogView.render(filtered);
    }

    handleProductSelect(product) {
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