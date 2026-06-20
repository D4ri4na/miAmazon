export class CatalogView {
    constructor(gridId, noResultsId, onProductClick) {
        this.section = document.getElementById("catalogSection");
        this.grid = document.getElementById(gridId);
        this.noResults = document.getElementById(noResultsId);
        this.onProductClick = onProductClick;
    }

    render(products) {
       this.grid.innerHTML = ''; 

        if (!products || products.length === 0) {
            this.noResults.classList.remove("is-hidden");
            return;
        } else {
            this.noResults.classList.add("is-hidden");
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-category-badge">${product.category || 'General'}</div>
                
                <div class="product-image-container">
                    <img src="${product.image_url || 'https://via.placeholder.com/150'}" alt="${product.title}" class="product-image">
                </div>
                
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="product-price">$${product.price}</p>
                    <p class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${product.stock > 0 ? `Disponibles: ${product.stock}` : 'Agotado'}
                    </p>
                    <button class="view-detail-btn" data-id="${product.id}">Ver Detalle</button>
                </div>
            `;

            const btn = card.querySelector('.view-detail-btn');
            btn.addEventListener('click', () => this.onProductClick(product.id));

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