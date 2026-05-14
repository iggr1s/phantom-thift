// Data game (harga lebih murah dari Steam asli)
const games = [
  { id: 1, name: "ELDEN RING", icon: "fab fa-steam", normalPrice: 59.99, discountPrice: 39.99, discount: 33 },
  { id: 2, name: "CYBERPUNK 2077", icon: "fas fa-robot", normalPrice: 49.99, discountPrice: 29.99, discount: 40 },
  { id: 3, name: "BALDUR'S GATE 3", icon: "fas fa-dragon", normalPrice: 59.99, discountPrice: 44.99, discount: 25 },
  { id: 4, name: "HOLLOW KNIGHT", icon: "fas fa-skull", normalPrice: 14.99, discountPrice: 7.49, discount: 50 },
  { id: 5, name: "RESIDENT EVIL 4", icon: "fas fa-virus", normalPrice: 39.99, discountPrice: 27.99, discount: 30 },
  { id: 6, name: "HADES II", icon: "fas fa-fire", normalPrice: 29.99, discountPrice: 19.99, discount: 33 },
  { id: 7, name: "STARFIELD", icon: "fas fa-globe", normalPrice: 69.99, discountPrice: 49.99, discount: 28 },
  { id: 8, name: "FINAL FANTASY VII REMAKE", icon: "fas fa-crown", normalPrice: 49.99, discountPrice: 34.99, discount: 30 }
];

// Cart state
let cart = []; // simpan id game
const cartCountSpan = document.getElementById('cartCount');
const gamesGrid = document.getElementById('gamesGrid');

// Render games ke grid
function renderGames() {
  gamesGrid.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="card-icon"><i class="${game.icon}"></i></div>
      <h3>${game.name}</h3>
      <div class="price-row">
        <span class="price-original">$${game.normalPrice}</span>
        <span class="price-discount">$${game.discountPrice}</span>
        <span class="discount-badge">-${game.discount}%</span>
      </div>
      <button class="btn-beli" data-id="${game.id}" data-name="${game.name}" data-price="${game.discountPrice}">
        <i class="fas fa-cart-plus"></i> PHANTOM PURCHASE
      </button>
    `;
    gamesGrid.appendChild(card);
  });

  // Attach event listeners ke semua tombol beli
  document.querySelectorAll('.btn-beli').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.getAttribute('data-id'));
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      addToCart(id, name, price);
    });
  });
}

// Notifikasi
function showNotification(message, type = 'success') {
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 2000);
}

// Tambah ke keranjang & update badge
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  updateCartBadge();
  showNotification(`🎮 ${name} added to cart! Just $${price}`, 'success');
}

function updateCartBadge() {
  cartCountSpan.innerText = cart.length;
  // efek animasi kecil
  cartCountSpan.style.transform = 'scale(1.2)';
  setTimeout(() => { cartCountSpan.style.transform = 'scale(1)'; }, 200);
}

// Persona style: live jam & tanggal
function updateDateTime() {
  const now = new Date();
  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('id-ID', optionsDate).toUpperCase();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById('currentDate').innerHTML = `<i class="far fa-calendar-alt"></i> ${dateStr}`;
  document.getElementById('currentTime').innerHTML = `<i class="far fa-clock"></i> ${timeStr}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// klik ikon keranjang (alert info)
document.getElementById('cartIcon').addEventListener('click', () => {
  if (cart.length === 0) {
    showNotification("Keranjang kosong... beli dulu yuk!", "info");
  } else {
    let itemList = cart.map(item => `${item.name} - $${item.price}`).join('\n');
    alert(`🛒 PHANTOM CART:\n${itemList}\n\nTotal items: ${cart.length}`);
  }
});

// ========== HANDLER FORM CONTACT ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai dari form
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validasi sederhana (required sudah ada di HTML, tapi tetap cek)
    if (!fullname || !email || !subject || !message) {
      showNotification("Harap isi semua field!", "error");
      return;
    }
    
    // Simulasi pengiriman (bisa diganti dengan fetch ke API nanti)
    console.log("Pesan terkirim:", { fullname, email, subject, message });
    
    // Tampilkan notifikasi sukses
    showNotification(`Terima kasih ${fullname}, pesan Anda telah dikirim!`, "success");
    
    // Reset form (opsional)
    contactForm.reset();
  });
}

// Inisialisasi
renderGames();