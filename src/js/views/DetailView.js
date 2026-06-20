export class DetailView {
    constructor(sectionId, onBackClick) {
        this.section = document.getElementById(sectionId);
        this.onBackClick = onBackClick; 
    }

    render(product) {
       this.section.innerHTML = `
            <button id="backButton" class="back-to-catalog-btn" style="margin-bottom: 20px; padding: 10px 15px; background: #f0f2f2; border: 1px solid #d5d9d9; border-radius: 8px; cursor: pointer;">
                ← Volver al Catálogo
            </button>
            
            <div class="product-detail-container">
                <div class="detail-image-side">
                    <img src="${product.image_url || 'https://via.placeholder.com/300'}" alt="${product.title}" class="detail-image">
                </div>
                
                <div class="detail-info-side">
                    <span class="detail-category">${product.category || 'General'}</span>
                    <h2>${product.title}</h2>
                    <p class="detail-price">$${product.price}</p>
                    <p class="detail-stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${product.stock > 0 ? `✔ Disponible (${product.stock} unidades)` : '❌ Agotado actualmente'}
                    </p>
                    <p class="detail-description">
                        Adquiere este artículo con total garantía de rendimiento y calidad premium a través de nuestro catálogo miAmazon.
                    </p>
                </div>
            </div>
        `;

        document.getElementById("backButton").addEventListener("click", this.onBackClick);
    }

    show() {
        this.section.classList.remove("is-hidden");
    }

    hide() {
        this.section.classList.add("is-hidden");
    }
}