const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

let data;

fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(jsonData => {

        data = jsonData;

     
      if (window.location.pathname.includes("results.html")) {

    const keyword = localStorage.getItem("searchKeyword");

    if (keyword) {
        searchInput.value = keyword;
        showResults(keyword);
    }
}
    });



searchBtn.addEventListener("click", () => {

    const keyword = searchInput.value.toLowerCase().trim();

    if (keyword === "") {
        return;
    }

    localStorage.setItem("searchKeyword", keyword);

    window.location.href = "results.html";
});


function showResults(keyword) {

    results.innerHTML = "";

    let matchedResults = [];

    if (keyword.includes("beach")) {
        matchedResults = data.beaches;
    }
    else if (keyword.includes("temple")) {
        matchedResults = data.temples;
    }
    else if (keyword === "country") {
        data.countries.forEach(country => {
            matchedResults.push(...country.cities);
        });
    }
    else {
        data.countries.forEach(country => {
    
            if (country.name.toLowerCase().includes(keyword)) {
                matchedResults.push(...country.cities);
            }
    
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(keyword)) {
                    matchedResults.push(city);
                }
            });
    
        });
    }

    matchedResults.forEach(place => {

        const card = document.createElement("div");

        card.classList.add("result-card");

        card.innerHTML = `
            <img src="${place.imageUrl}">
            <h2>${place.name}</h2>
            <p>${place.description}</p>
        `;

        results.appendChild(card);
    });
}



clearBtn.addEventListener("click", () => {

    searchInput.value = "";
    results.innerHTML = "";

    localStorage.removeItem("searchKeyword");
});
