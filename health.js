let page = 2;
let dataClick = document.getElementById("ham").addEventListener("click", () => {
  if (document.querySelector(".navcontainer2").style.display == "none") {
    document.querySelector(".navcontainer2").style.display = "grid";
    document.getElementById("first").style.transform = "rotate(45deg)";
    document.getElementById("first").style.marginTop = "15px";
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.transform = "rotate(-45deg)";
    document.getElementById("third").style.marginBottom = "15px";
  } else {
    document.querySelector(".navcontainer2").style.display = "none";
    document.getElementById("second").style.display = "flex";
    document.getElementById("first").style.transform = "rotate(0deg)";
    document.getElementById("third").style.transform = "rotate(0deg)";
  }
});

const fetchData = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=158ef0a3c9194a348d65759ee0820c43&pageSize=10&page=1"
  );
  const json = await response.json();
  // console.log(json.articles);
  //   json.articles.map((ele) => {

  json.articles.map((ele) => {
    let urlLink = document.createElement("a");
    urlLink.setAttribute("href", `${ele.url}`);

    let cardData = document.createElement("div");
    cardData.setAttribute("class", "cards");
    cardData.setAttribute("data-aos", "fade-down");
    let cardImage = document.createElement("img");
    cardImage.setAttribute(
      "src",
      `${ele.urlToImage ? ele.urlToImage : "/News/images/images"}`
    );
    cardImage.setAttribute("alt", "");

    let cardDesc = document.createElement("div");
    cardDesc.setAttribute("class", "right-content");

    let h3 = document.createElement("h3");
    h3.innerHTML = `${ele.title}`;
    let p = document.createElement("p");
    p.innerHTML = `${
      ele.description ? ele.description.slice(0, 100) + "..." : ""
    }`;
    cardData.appendChild(cardImage);
    cardData.appendChild(cardDesc);
    cardDesc.append(h3);
    cardDesc.append(p);

    ///

    let author = document.createElement("span");
    author.setAttribute("class", "author");
    author.innerHTML = `${ele.author}`;

    let publish = document.createElement("span");
    publish.setAttribute("class", "publish");
    publish.innerHTML = `${ele.publishedAt}`;

    let content = document.createElement("p");
    content.setAttribute("class", "content");
    content.innerHTML = `${ele.content ? ele.content.slice(0, 80) : ""}`;

    cardDesc.append(author);
    cardDesc.append(publish);
    cardDesc.append(content);

    document.querySelector(".news-container").appendChild(urlLink);
    urlLink.appendChild(cardData);
  });
};
// fetchData();

// for infinite scroll
window.addEventListener("scroll", () => {
  let loading = document.getElementById("loading");
  if (
    window.innerHeight + document.documentElement.scrollTop + 1 >=
    document.documentElement.scrollHeight
  ) {
    loading.style.display = "flex";
    setTimeout(() => {
      fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=158ef0a3c9194a348d65759ee0820c43&pageSize=10&page=${page}`
      )
        .then((res) => res.json())
        .then((json) => {
          json.articles.map((ele) => {
            let urlLink = document.createElement("a");
            urlLink.setAttribute("href", `${ele.url}`);

            let cardData = document.createElement("div");
            cardData.setAttribute("class", "cards");
            cardData.setAttribute("data-aos", "fade-down");
            let cardImage = document.createElement("img");
            cardImage.setAttribute(
              "src",
              `${ele.urlToImage ? ele.urlToImage : "/News/images/images.png"}`
            );
            cardImage.setAttribute("alt", "");

            let cardDesc = document.createElement("div");
            cardDesc.setAttribute("class", "right-content");

            let h3 = document.createElement("h3");
            h3.innerHTML = `${ele.title}`;
            let p = document.createElement("p");
            p.innerHTML = `${
              ele.description ? ele.description.slice(0, 150) : ""
            }`;
            cardData.appendChild(cardImage);
            cardData.appendChild(cardDesc);
            cardDesc.append(h3);
            cardDesc.append(p);

            ///

            let author = document.createElement("span");
            author.setAttribute("class", "author");
            author.innerHTML = `${ele.author}`;

            let publish = document.createElement("span");
            publish.setAttribute("class", "publish");
            publish.innerHTML = `${ele.publishedAt}`;

            let content = document.createElement("p");
            content.setAttribute("class", "content");
            content.innerHTML = `${
              ele.content ? ele.content.slice(0, 80) : ""
            }`;

            cardDesc.append(author);
            cardDesc.append(publish);
            cardDesc.append(content);

            document.querySelector(".news-container").appendChild(urlLink);
            urlLink.appendChild(cardData);
          });
          loading.style.display = "none";
        });
    }, 3000);

    page += 1;
  }
});

fetchData();
