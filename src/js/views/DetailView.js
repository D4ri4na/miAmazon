export class DetailView {
    constructor(sectionId, onBackClick) {
        this.section = document.getElementById(sectionId);
        this.backButton = document.getElementById("backButton");
        
        this.title = document.getElementById("detailTitle");
        this.price = document.getElementById("detailPrice");
        this.brand = document.getElementById("detailBrand");
        this.dimensions = document.getElementById("detailDimensions");
        this.weight = document.getElementById("detailWeight");
        this.description = document.getElementById("detailDescription");
        this.mainImage = document.getElementById("mainImage");
        this.thumbnails = document.getElementById("thumbnails");

        this.backButton.addEventListener("click", onBackClick);
    }

    render(product) {
        this.title.textContent = product.title;
        this.price.textContent = "$" + product.price;
        this.brand.textContent = product.brand;
        this.dimensions.textContent = product.dimensions;
        this.weight.textContent = product.weight;
        this.description.textContent = product.description;

        this.mainImage.src = product.images[0] + "?auto=format&fit=crop&w=800&q=60";
        this.thumbnails.innerHTML = "";

        product.images.forEach(img => {
            const thumb = document.createElement("img");
            thumb.classList.add("product-detail__thumb"); // <--- Clase BEM correcta
            thumb.src = img + "?auto=format&fit=crop&w=200&q=60";
            
            thumb.addEventListener("click", () => {
                this.mainImage.src = img + "?auto=format&fit=crop&w=800&q=60";
            });
            this.thumbnails.appendChild(thumb);
        });
    }

    show() {
        this.section.classList.remove("is-hidden");
    }

    hide() {
        this.section.classList.add("is-hidden");
    }
}