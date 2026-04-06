// ===== LẤY ID PRODUCT TỪ URL =====
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Ẩn tất cả product (chỉ dùng cho product.html)
document.querySelectorAll(".product").forEach(p => {
  p.style.display = "none";
});

// Hiển thị đúng product
if (id) {
  let product = document.getElementById("product" + id);
  if (product) product.style.display = "block";
}

// ===== KHỞI TẠO GIỎ HÀNG =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== LƯU CART =====
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== THÊM VÀO GIỎ =====
function addToCart(id, name, price) {
  let quantity = 1;

  // Nếu ở product page → lấy input quantity
  let productDiv = document.getElementById("product" + id);
  if (productDiv) {
    let qtyInput = productDiv.querySelector('input[type="number"]');
    if (qtyInput) {
      quantity = parseInt(qtyInput.value) || 1;
    }
  }

  let existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: quantity
    });
  }

  saveCart();
  renderSidebarCart();
  openCart();
}

// ===== TĂNG / GIẢM SỐ LƯỢNG =====
function changeQty(id, change) {
  let item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;

  // Nếu về 0 thì xoá
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  renderSidebarCart();
}

// ===== XOÁ ITEM =====
function removeCartItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderSidebarCart();
}

// ===== RENDER SIDEBAR CART =====
function renderSidebarCart() {
  let cartContent = document.getElementById("cartContent");
  let cartTotal = document.getElementById("cartTotal");
  let checkoutBtn = document.getElementById("checkoutBtn");

  if (!cartContent) return;

  if (cart.length === 0) {
    cartContent.innerHTML = `
      <p class="empty" style="text-align:center; margin-top:50px; color:#888;">
        Your cart is empty
      </p>`;
    if (cartTotal) cartTotal.innerText = "$0";
    if (checkoutBtn) checkoutBtn.classList.add("disabled");
    return;
  }

  if (checkoutBtn) checkoutBtn.classList.remove("disabled");

  let html = "";
  let total = 0;

  cart.forEach(item => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        
        <div style="font-size:14px; color:#555;">
          ${item.name} - $${item.price}

          <div style="margin-top:5px; display:flex; align-items:center; gap:8px;">
            <button onclick="changeQty(${item.id}, -1)" 
              style="padding:2px 8px; border:none; background:#e995a5; color:white; cursor:pointer;">
              -
            </button>

            <span>${item.quantity}</span>

            <button onclick="changeQty(${item.id}, 1)" 
              style="padding:2px 8px; border:none; background:#e995a5; color:white; cursor:pointer;">
              +
            </button>
          </div>
        </div>

        <button onclick="removeCartItem(${item.id})"
          style="background:#e995a5; color:white; border:none; border-radius:50%; width:22px; height:22px; cursor:pointer;">
          X
        </button>
      </div>
    `;
  });

  cartContent.innerHTML = html;
  if (cartTotal) cartTotal.innerText = "$" + total.toFixed(2);
}

// ===== MỞ CART =====
function openCart() {
  document.getElementById("cartSidebar")?.classList.add("active");
  document.getElementById("cartOverlay")?.classList.add("active");
}

// ===== ĐÓNG CART =====
function closeCart() {
  document.getElementById("cartSidebar")?.classList.remove("active");
  document.getElementById("cartOverlay")?.classList.remove("active");
}

// ===== LOAD TRANG =====
document.addEventListener("DOMContentLoaded", function () {
  renderSidebarCart();
});