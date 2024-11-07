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
