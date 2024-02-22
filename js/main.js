window.addEventListener("scroll", function () {
  toggleBacktop();
});

let backtop = document.getElementById("backtop");

const loading = document.getElementById("loading");
const loadingDuration = 1400;
setTimeout(() => {
  loading.classList.add(`loading-none`);
}, loadingDuration);

const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region") || "Aisa";
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
let allCountriesData;
let params;
let newdata = [
  1,

  2,

  3,

  4,

  5,
];
let limit = 12;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    fetchData(paginate(data, params[1] || limit, params[0] || 1));
  });

function getParams() {
  var idx = document.URL.indexOf("?");
  var params = new Array();
  if (idx != -1) {
    var pairs = document.URL.substring(idx + 1, document.URL.length).split("&");
    for (var i = 0; i < pairs.length; i++) {
      nameVal = pairs[i].split("=");
      params.push(nameVal[1]);
    }
  }
  return params;
}

params = getParams();

filterByRegion.addEventListener("change", (e) => {
  e.preventDefault();
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(paginate(data, params[1] || limit, params[0] || 1));
    });
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countriesContainer.append(countryCard);
  });
  newdata.forEach((p) => {
    countriesContainer.innerHTML += `
    <ul class="pagination pagination-lg">
      <li class="page-item px-2"><a class="page-link" href="?page=${p}&limit=${limit}">${p}</a></li>
    </ul>`;
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  countriesContainer.innerHTML = "";
  filteredCountries.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countriesContainer.append(countryCard);
  });
});

themeChanger.addEventListener("click", function () {
  if (document.body.className != "dark") {
    this.firstElementChild.src = "assets/images/light.svg";
  } else {
    this.firstElementChild.src = "assets/images/mode.svg";
  }
  document.body.classList.toggle("dark");
});

function fetchData(data) {
  let newdata = [
    1,

    2,

    3,

    4,

    5,
  ];
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countriesContainer.append(countryCard);
  });
  newdata.forEach((p) => {
    countriesContainer.innerHTML += `<nav aria-label="...">
    <ul class="pagination pagination-lg">
      <li class="page-item px-2"><a class="page-link" href="?page=${p}&limit=${limit}">${p}</a></li>
    </ul>
  </nav>`;
  });
}

function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

// ///////////////sort
let sort = document.querySelector(".region");

function Sort(data) {
  sort.addEventListener("change", (e) => {
    let value = e.target.value;
    countMis = 0;
    countMus = 16;
    if (value === "population") {
      data.sort((a, b) => b?.population - a?.population);
    }
    if (value === "all") {
      fetchData(api);
    }
    if (value === "region") {
      data.sort((a, b) => {
        let regionA = a.region.toLowerCase();
        let regionB = b.region.toLowerCase();
        if (regionA < regionB) {
          return -1;
        }
      });
    }
    if (value === "capital") {
      data.sort((a, b) => {
        let capitalA =
          Array.isArray(a.capital) && a.capital.length > 0
            ? a.capital[0].toLowerCase()
            : "";
        let capitalB =
          Array.isArray(b.capital) && b.capital.length > 0
            ? b.capital[0].toLowerCase()
            : "";
        if (capitalA < capitalB) {
          return -1;
        }
      });
    }
    if (value === "title") {
      data.sort((a, b) => {
        let regionA = a.name?.common?.toLowerCase();
        let regionB = b.name?.common?.toLowerCase();
        if (regionA < regionB) {
          return -1;
        }
      });
    }

    fetchCard(data);
  });
}
