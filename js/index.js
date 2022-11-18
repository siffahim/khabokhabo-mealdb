const loader = document.querySelector(".loader")
loader.style.width = '0%'


var searchBtn = document.getElementById("search-btn");
var searchField = document.getElementById("search-field");

searchField.addEventListener("keypress", function (event) {
    searchBtn.style.background = '#24c468'
    if (event.key === 'Enter') {
        searchBtn.click();
        searchBtn.style.background = '#17a350'
    }

});

//error message
document.getElementById('error-message').style.display = 'none'

//search food
const searchFood = () => {
    const searchField = document.querySelector("#search-field")
    const searchText = searchField.value;
    loader.style.width = '40%'

    if (searchText === '') {
        alert("Please write something")
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                displaySearchResult(data.meals)
                loader.style.width = '100%'
            })
    }

    searchField.value = ''
}

//without display food
const searchBeforeDisplayFood = async () => {
    loader.style.width = '40%'
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken`
    const res = await fetch(url)
    const data = await res.json()

    displaySearchResult(data.meals)
    loader.style.width = '100%'
}

searchBeforeDisplayFood()


//show on the html element
const searchResult = document.getElementById('search-result');
const searchFoodDetail = document.getElementById('search-food-detail');

const displaySearchResult = meals => {

    searchResult.textContent = '';
    searchFoodDetail.textContent = '';

    try {
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.className = "rounded-lg bg-white text-light p-3 rounded-lg cursor-pointer hover:opacity-90"
            div.innerHTML = `
            <div onclick="loadFoodDetail(${meal.idMeal})">
                <div class="overflow-hidden rounded-lg">
                     <img src=${meal.strMealThumb} class="rounded-lg hover:scale-110 duration-300"  alt="">
                </div>
                <h1 class="text-lg text-gray-500 font-semibold">${meal.strMeal}</h1>
            </div>
        `
            searchResult.appendChild(div)
        })
        document.getElementById('error-message').style.display = 'none'
    } catch (err) {
        document.getElementById('error-message').style.display = 'block'
    }
}


const loadFoodDetail = async (mealId) => {
    loader.style.width = '70%'
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    const res = await fetch(url)
    const data = await res.json()
    displayLoadFoodDetail(data.meals[0])
    loader.style.width = '100%'
}

const displayLoadFoodDetail = (foodDetail) => {
    console.log(foodDetail)
    searchResult.textContent = '';
    searchFoodDetail.textContent = '';

    const div = document.createElement('div');
    div.className = "text-light p-4 hover:opacity-90"
    div.innerHTML = `
            <div class="flex items-center">
                <img src=${foodDetail.strMealThumb} class="rounded-lg w-1/4"  alt="">
                <div class="ml-10">
                     <h1 class="text-2xl text-gray-500 font-semibold">${foodDetail.strMeal}</h1>
                     <p>${foodDetail.strInstructions.substr(0, 800)}</p>
                        <dl>
                            <dt class="text-lg mt-2 font-semibold text-gray-500">Materials</dt>
                            <dd>- ${foodDetail.strIngredient1}</dd>
                            <dd>- ${foodDetail.strIngredient2}</dd>
                            <dd>- ${foodDetail.strIngredient3}</dd>
                            <dd>- ${foodDetail.strIngredient4}</dd>
                            <dd>- ${foodDetail.strIngredient5}</dd>
                            <dd>- ${foodDetail.strIngredient6}</dd>
                        </dl>
                     <a href=${foodDetail.strYoutube}  class="bg-red-500 text-white py-2 px-4 rounded uppercase inline-block mt-5 hover:bg-red-600">Watch Youtube</a>
                </div>
            </div>
        `
    searchFoodDetail.appendChild(div)
}