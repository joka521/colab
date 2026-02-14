// Gestion du panier
let cartCount = 3; // Exemple de départ
const cartCountElement = document.querySelector('.cart-count');

// Mise à jour du compteur panier
function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

// Ajout au panier
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        updateCartCount();
        
        // Animation de confirmation
        this.textContent = 'Ajouté !';
        this.style.background = '#27ae60';
        
        setTimeout(() => {
            this.textContent = 'Ajouter au panier';
            this.style.background = '#2c3e50';
        }, 1000);
        
        // Ici vous pouvez ajouter la logique pour ajouter le produit au panier
        console.log('Produit ajouté au panier');
    });
});

// Gestion des favoris
document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#e74c3c';
            
            // Animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    });
});

// Quick view (simulation)
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        alert(`Fenêtre d'aperçu pour : ${productName}\n(Fonctionnalité à développer)`);
    });
});

// Barre de recherche
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        alert(`Recherche de : "${searchTerm}"\n(Fonctionnalité de recherche à implémenter)`);
        searchInput.value = '';
    }
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Newsletter
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    if (email) {
        alert(`Merci pour votre inscription ${email} ! Vous recevrez nos offres prochainement.`);
        this.querySelector('input').value = '';
    }
});

// Sélection des couleurs
document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        // Retirer la sélection précédente dans ce produit
        const parentColors = this.closest('.product-colors');
        parentColors.querySelectorAll('.color-dot').forEach(d => {
            d.style.transform = 'scale(1)';
            d.style.boxShadow = '0 0 0 1px #ddd';
        });
        
        // Sélectionner cette couleur
        this.style.transform = 'scale(1.2)';
        this.style.boxShadow = '0 0 0 2px #2c3e50';
        
        // Ici vous pourriez changer l'image du produit
        console.log('Couleur sélectionnée');
    });
});

// Animation au scroll pour les cartes produits
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Menu mobile (simplifié)
const nav = document.querySelector('nav ul');
const mobileMenuButton = document.createElement('button');
mobileMenuButton.innerHTML = '☰';
mobileMenuButton.classList.add('mobile-menu-btn');
mobileMenuButton.style.display = 'none';

// Style pour le bouton mobile
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block !important;
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            color: #2c3e50;
            cursor: pointer;
            z-index: 1001;
        }
        
        nav ul {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        }
        
        nav ul.show {
            display: block;
        }
        
        nav ul li {
            margin: 1rem 0;
        }
    }
`;

document.head.appendChild(style);
document.querySelector('nav').appendChild(mobileMenuButton);

mobileMenuButton.addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});

// Gestion du dropdown en mobile
document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const menu = link.nextElementSibling;
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Prix avec animation
document.querySelectorAll('.current-price').forEach(price => {
    const originalPrice = price.nextElementSibling;
    if (originalPrice && originalPrice.classList.contains('original-price')) {
        // Calculer le pourcentage de réduction
        const current = parseFloat(price.textContent);
        const original = parseFloat(originalPrice.textContent);
        if (!isNaN(current) && !isNaN(original) && original > current) {
            const discount = Math.round(((original - current) / original) * 100);
            const discountBadge = document.createElement('span');
            discountBadge.classList.add('discount-badge');
            discountBadge.textContent = `-${discount}%`;
            discountBadge.style.cssText = `
                background: #e74c3c;
                color: white;
                padding: 0.2rem 0.5rem;
                border-radius: 3px;
                font-size: 0.8rem;
                margin-left: 0.5rem;
            `;
            price.appendChild(discountBadge);
        }
    }
});

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Boutique enfants chargée !');
    updateCartCount();
});
