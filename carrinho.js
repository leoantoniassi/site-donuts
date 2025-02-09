
// Lógica do carrinho
let cart = [];

$(".add-to-cart").click(function (event) {
    event.preventDefault(); // Previne o recarregamento da página
    const itemName = $(this).data("name"); // Obtém o nome do item
    const quantity = $(this).siblings(".quantity").val();
    const itemPrice = parseFloat(quantity) * (100 / 40); // Preço total baseado na quantidade

    cart.push({ name: itemName, price: itemPrice, quantity: quantity }); // Armazena a quantidade real
    updateCart();

    // Mostrar alerta com o nome do item adicionado
    alert(`${itemName} adicionado ao carrinho!`);
});

function updateCart() {
    $("#cart").empty();
    let subtotal = 0;
    cart.forEach((item, index) => {
        $("#cart").append(
            `<li class="list-group-item">${item.quantity} x ${item.name} - R$ ${item.price.toFixed(2)} <button class="btn btn-danger btn-sm remove" data-index="${index}">Remover</button></li>`
        );
        subtotal += item.price;
    });
    $("#subtotal").text(`Subtotal: R$ ${subtotal.toFixed(2)}`);
    $(".remove").click(function () {
        const index = $(this).data("index");
        cart.splice(index, 1);
        updateCart();
    });
}

$("#checkout").click(function () {
    if (cart.length === 0) {
        alert("Ops! Parece que seu carrinho ainda está vazio. 😅");
        return; // Encerra a função se o carrinho estiver vazio
    }

    const message = cart
        .map((item) => `${item.quantity} x ${item.name} - R$ ${item.price.toFixed(2)}`)
        .join("%0A");
    const total = $("#subtotal").text().split(" ")[1]; // Captura o subtotal
    const whatsappNumber = "5514998862684"; // Número do WhatsApp
    const url = `https://wa.me/${whatsappNumber}?text=Olá, esse é meu pedido:%0A${message}`;
    window.open(url, "_blank");
});