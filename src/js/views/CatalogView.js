export class CatalogView {
    constructor(gridId, noResultsId, onProductClick) {
        this.section = document.getElementById("catalogSection");
        this.grid = document.getElementById(gridId);
        this.noResults = document.getElementById(noResultsId);
        this.onProductClick = onProductClick;
    }

    render(products) {
        this.grid.innerHTML = "";
        
        if (products.length === 0) {
            this.noResults.classList.remove("is-hidden");
            return;
        }
        this.noResults.classList.add("is-hidden");

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card"); // <--- Clase BEM correcta

            card.innerHTML = `
                ${product.stock === 0 ? '<span class="product-card__badge">Agotado</span>' : ''}
                <img class="product-card__image" src="${product.images[0]}?auto=format&fit=crop&w=500&q=60" alt="${product.title}">
                <div class="product-card__body">
                    <h3 class="product-card__title">${product.title}</h3>
                    <p class="product-card__price">$${product.price}</p>
                </div>
            `;

            card.addEventListener("click", () => this.onProductClick(product));
            this.grid.appendChild(card);
        });
    }

    show() {
        this.section.classList.remove("is-hidden");
    }

    hide() {
        this.section.classList.add("is-hidden");
    }
}