const params = new URLSearchParams(window.location.search);
const table = params.get("table") || "1";

document.getElementById("table").innerText = "Table " + table;

let cart = [];

const menuDiv = document.getElementById("menu");

// RENDER MENU
menu.forEach(cat => {
  const title = document.createElement("h2");
  title.innerText = cat.category;
  title.className = "category";
  menuDiv.appendChild(title);

  cat.items.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div>
        <p>${item.name}</p>
        <span>NPR ${item.price}</span>
      </div>
      <button>Add</button>
    `;

    div.querySelector("button").onclick = () => addToCart(item);
    menuDiv.appendChild(div);
  });
});

// ADD TO CART
function addToCart(item) {
  const existing = cart.find(i => i.name === item.name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  renderCart();
}

// RENDER CART
function renderCart() {
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartDiv.innerHTML += `<p>${item.name} x ${item.qty}</p>`;
  });

  document.getElementById("total").innerText = "Total: NPR " + total;
}

// 🚀 TELEGRAM AUTO ORDER
async function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let message = `🍽️ MOZzO ORDER\n\nTable: ${table}\n\n`;

  cart.forEach(item => {
    message += `${item.qty}x ${item.name} - NPR ${item.qty * item.price}\n`;
  });

  let total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  message += `\nTotal: NPR ${total}`;

  const BOT_TOKEN = "8721297737:AAHIFGFLK3gOX_T2Yq3_KWgA6csvt1Nykts";
  const CHAT_ID = "1126605588"; // ⚠️ REPLACE THIS

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    alert("Order sent successfully!");
    cart = [];
    renderCart();

  } catch (error) {
    alert("Failed to send order!");
    console.error(error);
  }
}
