const params = new URLSearchParams(window.location.search);
const table = params.get("table") || "1";

document.getElementById("table").innerText = "Table " + table;

let cart = [];

const menuDiv = document.getElementById("menu");

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

function addToCart(item) {
  const existing = cart.find(i => i.name === item.name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

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

function placeOrder() {
  let message = `Table: ${table}\n\n`;

  cart.forEach(item => {
    message += `${item.qty}x ${item.name}\n`;
  });

  let total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  message += `\nTotal: NPR ${total}`;

  const phone = "+9779820358419";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}