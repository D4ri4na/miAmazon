export class DetailView {
    constructor(sectionId, onBackClick) {
        this.section = document.getElementById(sectionId);
        this.onBackClick = onBackClick;
    }

    render(product) {
        const mainImage = product.image_url
            || (product.images && product.images[0])
            || 'https://via.placeholder.com/500x350';

        const gallery = Array.isArray(product.images) ? product.images : [];

        this.section.innerHTML = `
            <button id="backButton" class="product-detail__back-btn">
                ← Volver al Catálogo
            </button>

            <div class="product-detail__container">
                <div class="product-detail__gallery">
                    <img id="mainImage" src="${mainImage}" alt="${product.title}" class="product-detail__main-image">
                    ${gallery.length > 1 ? `
                        <div class="product-detail__thumbnails">
                            ${gallery.map(img => `
                                <img src="${img}" alt="${product.title}" class="product-detail__thumb" data-src="${img}">
                            `).join('')}
                        </div>
                    ` : ''}
                </div>

                <div class="product-detail__info">
                    <p class="product-detail__meta">${product.category || 'General'}</p>
                    <h2 class="product-detail__title">${product.title}</h2>
                    <p class="product-detail__price">$${product.price}</p>

                    <p class="product-detail__meta">
                        ${product.stock > 0 ? `✔ Disponible (${product.stock} unidades)` : '❌ Agotado actualmente'}
                    </p>

                    ${product.brand ? `<p class="product-detail__meta"><strong>Marca:</strong> ${product.brand}</p>` : ''}
                    ${product.dimensions ? `<p class="product-detail__meta"><strong>Dimensiones:</strong> ${product.dimensions}</p>` : ''}
                    ${product.weight ? `<p class="product-detail__meta"><strong>Peso:</strong> ${product.weight}</p>` : ''}

                    <p class="product-detail__description">
                        ${product.description || 'Sin descripción disponible para este producto.'}
                    </p>
                </div>
            </div>
        `;

        document.getElementById("backButton").addEventListener("click", this.onBackClick);

        const mainImageEl = document.getElementById("mainImage");
        this.section.querySelectorAll(".product-detail__thumb").forEach(thumb => {
            thumb.addEventListener("click", () => {
                mainImageEl.src = thumb.dataset.src;
            });
        });
    }

    show() {
        this.section.classList.remove("is-hidden");
    }

    hide() {
        this.section.classList.add("is-hidden");
    }
}