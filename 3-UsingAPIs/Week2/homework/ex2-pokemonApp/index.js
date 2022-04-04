'use strict';

/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
const button = document.createElement('button');
button.textContent = 'Get pokemon';
button.style.display = 'block';
button.type = 'submit';
document.body.appendChild(button);

async function fetchData(url) {
  const response = await fetch(`${url}`);
  return await response.json();
}

async function fetchAndPopulatePokemons(data) {
  await button.addEventListener(
    'click',
    function () {
      const select = document.createElement('select');
      select.name = 'pokemons';
      select.setAttribute('id', 'pokemons');
      select.style.display = 'block';
      select.addEventListener('change', function () {
        fetchImage(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${select.value}.png`
        );
      });
      document.body.appendChild(select);

      for (const pokemon of data) {
        const option = document.createElement('option');
        option.value = data.indexOf(pokemon) + 1;
        option.text = pokemon.name;
        select.appendChild(option);
      }
    },
    { once: true }
  );
}

function fetchImage(url) {
  const checkImage = document.querySelector('img');
  if (checkImage) {
    document.body.removeChild(checkImage);
  }
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'pokemon';
  document.body.appendChild(img);
}

async function main() {
  try {
    const response = await fetchData(
      'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'
    );
    const pokemons = response.results;
    await fetchAndPopulatePokemons(pokemons);
  } catch (error) {
    console.error;
  }
}

window.addEventListener('load', main);
