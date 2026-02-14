// Gestion du panier
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const cartButton = document.getElementById('cart-button');
const cartSection = document.getElementById('cart-section');

// Scroll vers le panier quand on clique sur le bouton
document.addEventListener("DOMContentLoaded", () => {
 if (cartButton && cartSection) {
 cartButton.addEventListener("click", () => {
 cartSection.scrollIntoView({ behavior: "smooth" });
 });
 }
 
 // Charger le compteur depuis localStorage au démarrage
 const savedCart = localStorage.getItem('cartCount');
 if (savedCart) {
 cartCount = parseInt(savedCart);
 updateCartCount();
 }
 
 // Charger les articles du panier
 loadCartItems();
 
 // Ajouter les écouteurs d'événements aux boutons d'ajout au panier
 document.querySelectorAll('.add-to-cart').forEach(button => {
 button.addEventListener('click', addToCart);
 });
 
 console.log('Boutique enfants chargée !');
});

// Mise à jour du compteur panier avec animation
function updateCartCount() {
 if (cartCountElement) {
 cartCountElement.textContent = cartCount;
 cartCountElement.classList.add('cart-update');
 
 setTimeout(() => {
 cartCountElement.classList.remove('cart-update');
 }, 300);
 }
 
 // Sauvegarder dans localStorage
 localStorage.setItem('cartCount', cartCount);
}

// Charger les articles du panier
function loadCartItems() {
 const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
 const cartContainer = document.getElementById('cart-items');
 const totalElement = document.getElementById('cart-total');
 
 if (!cartContainer) return;
 
 if (cartItems.length === 0) {
 cartContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
 if (totalElement) totalElement.textContent = '0,00 €';
 return;
 }
 
 let subtotal = 0;
 let cartHtml = '';
 
 cartItems.forEach((item, index) => {
 const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
 subtotal += price;
 
 cartHtml += `
 <div class="cart-item" data-index="${index}">
 <img src="${item.image || 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=100'}" alt="${item.name}">
 <div class="item-details">
 <h4>${item.name}</h4>
 <p>Taille: ${item.size || 'Unique'}</p>
 <p>Quantité: ${item.quantity || 1}</p>
 </div>
 <span class="item-price">${item.price}</span>
 <button class="remove-item" onclick="removeFromCart(${index})">
 <i class="fas fa-trash"></i>
 </button>
 </div>
 `;
 });
 
 cartContainer.innerHTML = cartHtml;
 
 if (totalElement) totalElement.textContent = subtotal.toFixed(2).replace('.', ',') + ' €';
}

// Ajouter au panier
function addToCart(event) {
 const button = event.currentTarget;
 cartCount++;
 updateCartCount();
 
 // Récupérer les infos du produit
 const productCard = button.closest('.product-card');
 const productName = productCard.querySelector('h3').textContent;
 const productPrice = productCard.querySelector('.current-price').textContent;
 const productImage = productCard.querySelector('img').src;
 
 // Animation de confirmation
 const originalText = button.textContent;
 button.textContent = '✓ Ajouté !';
 button.style.background = '#27ae60';
 
 // Stocker les détails du produit dans localStorage
 const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
 cartItems.push({
 name: productName,
 price: productPrice,
 image: productImage,
 quantity: 1,
 size: '4 ans', // Vous pouvez modifier selon votre logique
 id: Date.now()
 });
 localStorage.setItem('cartItems', JSON.stringify(cartItems));
 
 // Recharger l'affichage du panier
 loadCartItems();
 
 setTimeout(() => {
 button.textContent = originalText;
 button.style.background = '#2c3e50';
 }, 1000);
 
 console.log(`Produit ajouté : ${productName}`);
}

// Retirer un article du panier
function removeFromCart(index) {
 const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
 cartItems.splice(index, 1);
 localStorage.setItem('cartItems', JSON.stringify(cartItems));
 
 // Mettre à jour le compteur
 cartCount = cartItems.length;
 updateCartCount();
 
 // Recharger l'affichage
 loadCartItems();
}

// Rendre la fonction disponible globalement
window.removeFromCart = removeFromCart;

// Gestionnaire pour le bouton de paiement
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
 checkoutBtn.addEventListener('click', () => {
 const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
 
 if (cartItems.length === 0) {
 alert('Votre panier est vide !');
 } else {
 alert('Redirection vers la page de paiement... (Fonctionnalité à implémenter)');
 }
 });
}
