document.addEventListener("DOMContentLoaded", () => {
  // Your JavaScript code here

  const API_KEY = "4c75b82b83b74498840d5a7c1b7c65a9";
  const url = "https://newsapi.org/v2/everything?q=";

  window.addEventListener("load", () => fetchNews("India"));

  async function fetchNews(query) {
    try {
      const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      bindData(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const templateNewsCard = document.getElementById("template-news-card");

    if (!cardsContainer || !templateNewsCard) {
      console.error("Cannot find required elements in the DOM.");
      return;
    }

    // Clear the container before adding new content
    cardsContainer.innerHTML = "";

    articles.forEach((element) => {
      if (!element.urlToImage) return;
      const cardClone = templateNewsCard.content.cloneNode(true);
      fillData(cardClone, element);
      cardsContainer.appendChild(cardClone);
    });
  }

  //CLONING CARD ELEMENTS
  function fillData(cardClone, article) {
    cardClone.querySelector(".card-header img").src = article.urlToImage;
    cardClone.querySelector(".card-content h3").textContent = article.title;
    cardClone.querySelector(
      ".card-content .news-source"
    ).textContent = `${article.source.name} ${article.publishedAt}`;
    cardClone.querySelector(".card-content .news-desc").textContent =
      article.description;

    //OPEN NEWS PAGE
    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  }
  // Add a click event listener to the parent element (ul) of the navigation items
  const navLinks = document.querySelector(".nav-links ul");
  navLinks.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-item")) {
      const category = event.target.id;
      console.log(category);
      fetchNews(category);
    }
  });

  const searchButton = document.getElementById("search-button");
  const searchText = document.getElementById("search-text");

  searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
  });
});
