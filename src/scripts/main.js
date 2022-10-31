import '../components/search-bar.js'

const main = () => {

  const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
  const searchElement = document.querySelector('search-bar')

  const getCocktail = async (firstLetter = 'a') => {
    try {
      const response = await fetch(`${baseUrl}/search.php?f=${firstLetter}`);
      const responseJson = await response.json();
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderCocktails(responseJson.drinks);
      }
    } catch (error) {
      showResponseMessageL(firstLetter);
    }
  };


  const detailCocktail = async (idCocktail) => {
    try {
      const detailCocktailElement = document.querySelector('#detailCocktail');
      $('#search-bar').addClass('d-none')
      $('#listCocktail').addClass('d-none')
      $('#nav-list').addClass('d-none')
      const response = await fetch(`${baseUrl}/lookup.php?i=${idCocktail}`).then(r => r.json());
      renderDetailCocktail(response.drinks)

    } catch (error) {
      showResponseMessage(error);
    }
  };

  const searchCocktail = async (event) => {
    try {
      const nameCT = document.getElementById('searchElement').value
      const response = await fetch(`${baseUrl}/search.php?s=${nameCT}`);
      const responseJson = await response.json();

      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderCocktails(responseJson.drinks);
      }

    } catch (error) {
      const nameCT = document.getElementById('searchElement').value
      showResponseMessage(nameCT);
    }
  };

  const renderCocktails = (cocktails) => {
    const listCocktailElement = document.querySelector('#listCocktail');
    listCocktailElement.addEventListener('click', (event) => {
      const elClicked = event.target
      const classClicked = Object.values(elClicked.classList)
      if (classClicked.includes('btn-id-CT')) {
        detailCocktail(elClicked.dataset.ct)
      }
    })
    listCocktailElement.innerHTML = '';

    cocktails.forEach(cocktail => {
      listCocktailElement.innerHTML += `
      <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 12px;">
        <div class="card" style="">
          <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${cocktail.strDrink}</h5>
            <span style="font-weight: bold">Category: </span><br>
            <p class="card-text text-truncate">${cocktail.strCategory}.</p>
            <span style="font-weight: bold">Instruction: </span><br>
            <p class="card-text text-truncate">${cocktail.strInstructions}.</p>
            <a href="#" class="btn btn-info btn-id-CT btn-style" data-ct="${cocktail.idDrink}" >Check Detail</a>
          </div>
        </div>
      </div>
      `;
    });
  };

  const renderDetailCocktail = (cocktails) => {
    const detailCocktail = document.querySelector('#detailCocktail')

    detailCocktail.innerHTML = '';

    cocktails.forEach(cocktail => {
      detailCocktail.innerHTML += `
      <h3>Details Cocktail</h3>
      <div class="card mb-3 mt-3" style="max-width: 100%">
          <div class="row g-0">
            <div class="card-header bg-custom d-flex justify-content-between">
              <h5 class="card-title">${cocktail.strDrink}</h5>
              <a href="/" class="text-right link-custom">Back to Home</a>
            </div>
            <div class="col-md-3">
              <img
                src="${cocktail.strDrinkThumb}"
                class=""
                alt="..."
                style="padding: 20px 30px 30px 30px; width: 80%"
              />
            </div>
            <div class="col-md-3">
              <div class="card-body">
                <h6>Category</h6>
                <p class="card-text">${cocktail.strCategory}</p>
                <h6>Ingredient</h6>
                <p class="card-text">
                  1. ${cocktail.strIngredient1} <br />
                  2. ${cocktail.strIngredient2} <br />
                  3. ${cocktail.strIngredient3 ?? '-'} <br />
                  4. ${cocktail.strIngredient4 ?? '-'} <br />
                  5. ${cocktail.strIngredient5 ?? '-'} <br />
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h6>Instruction</h6>
                <p class="card-text">
                  ${cocktail.strInstructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    })
  }

  const showResponseMessage = (message = 'Check your internet connection') => {
    const listCocktailElement = document.querySelector('#listCocktail');
    listCocktailElement.innerHTML = '';
    listCocktailElement.innerHTML += `
    <div class="d-flex justify-content-center mt-3">
        <h3>Sorry, Cocktail with name "${message}" Not Found</h3>
      </div>`
  };

  const showResponseMessageL = (message = 'U') => {
    const listCocktailElement = document.querySelector('#listCocktail');
    listCocktailElement.innerHTML = '';
    listCocktailElement.innerHTML += `
    <div class="d-flex justify-content-center mt-3">
        <h3>Sorry, Cocktail with letter ${message} Not Found</h3>
      </div>`
  };

  document.addEventListener('DOMContentLoaded', () => {
    getCocktail();
  });
  searchElement.clickEvent = searchCocktail;

  document.addEventListener('DOMContentLoaded', () => {
    let list = ``
    'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('').forEach(char => {
      list += `<li class="nav-item">
          <a class="nav-link" aria-current="page" data-char="${char}" href="javascript:void(0)">${char}</a>
        </li>`
    })
    document.getElementById('nav-list').innerHTML = list

    document.querySelector('#nav-list').addEventListener('click', (event) => {
      const classClicked = Object.values(event.target.dataset.char)
      getCocktail(classClicked)
    })
  });
}

export default main;