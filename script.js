const WEBHOOK_URL = "https://discord.com/api/webhooks/1461160149530972334/MYup6nuUiZ3q5UJQ316i-ADUxP3hENpo-MutFoXqLcWpD2IgpfAATtKXOqy8UZbnES9G";

let productoActual = "";
let precioActual = "";

function abrirModal(producto, precio) {
  productoActual = producto;
  precioActual = precio;
  document.getElementById("modalProducto").innerText = producto;
  document.getElementById("modalPrecio").innerText = "Precio: " + precio;
  document.getElementById("modal").style.display = "block";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function confirmar() {
  const usuario = document.getElementById("usuario").value;
  const id = document.getElementById("id").value;

  if (!/^\d{17,20}$/.test(id)) {
    alert("❌ ID de Discord obligatorio y válido");
    return;
  }

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `📢 **Nuevo encargo** <@${id}>`,
      embeds: [{
        title: "🛒 Tienda",
        color: 0xf1c40f,
        fields: [
          { name: "📦 Producto", value: productoActual, inline: true },
          { name: "💰 Precio", value: precioActual, inline: true },
          { name: "👤 Usuario", value: usuario || "No especificado", inline: false },
          { name: "🆔 ID", value: id, inline: false }
        ],
        footer: { text: "Pago y verificación mediante TicketKing" },
        timestamp: new Date().toISOString()
      }]
    })
  });

  cerrarModal();
  alert("✅ Pedido enviado correctamente");
}
