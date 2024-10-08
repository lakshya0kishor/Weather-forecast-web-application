const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details')
const icon = document.querySelector('.icon img')
const forecast = new Forecast();


const updateUI = (data) => {

    const {cityDets,weather} = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;c</span>
        </div>
    `;

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    localStorage.setItem('city',city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}