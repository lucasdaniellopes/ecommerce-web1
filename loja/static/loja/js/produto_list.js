document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("results-container");

  searchInput.addEventListener("keyup", function () {
    const query = searchInput.value;

    fetch(`/produtos/pesquisa/?q=${query}`)
      .then((response) => response.text())
      .then((data) => {
        resultsContainer.innerHTML = data;
      })
      .catch((error) => console.error("Erro na pesquisa:", error));
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".card-add-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const produtoId = this.getAttribute("data-produto-id");
      const quantidadeInput =
        this.closest(".card_form").querySelector(".quant_input");
      const quantidade = parseInt(quantidadeInput.value, 10) || 1;

      fetch("{% url 'carrinho:adicionar_item' %}", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": "{{ csrf_token }}",
        },
        body: JSON.stringify({
          produto_id: produtoId,
          quantidade: quantidade,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Item adicionado ao carrinho com sucesso!");
            document.getElementById("cart-item-count").innerText =
              data.item_count;
          } else {
            alert("Erro ao adicionar o item ao carrinho: " + data.error);
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    });
  });
});
