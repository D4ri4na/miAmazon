export class CatalogView {
    constructor(gridId, noResultsId, onProductClick) {
        this.section = document.getElementById("catalogSection");
        this.grid = document.getElementById(gridId);
        this.noResults = document.getElementById(noResultsId);
        this.onProductClick = onProductClick;
    }

    render(products) {
       this.grid.innerHTML = '';
       this.grid.className = 'catalog-grid';

        if (!products || products.length === 0) {
            this.noResults.classList.remove("is-hidden");
            return;
        } else {
            this.noResults.classList.add("is-hidden");
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const outOfStock = !(product.stock > 0);

            card.innerHTML = `
                ${outOfStock ? `<span class="product-card__badge">Agotado</span>` : ''}
                <img src="${product.image_url || 'https://via.placeholder.com/220x200'}" alt="${product.title}" class="product-card__image">
                <div class="product-card__body">
                    <h3 class="product-card__title">${product.title}</h3>
                    <p class="product-card__price">$${product.price}</p>
                </div>
            `;

            card.addEventListener('click', () => this.onProductClick(product.id));

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