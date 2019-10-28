const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();




const updateUI =(data) =>{

    console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather; either, this way or -> destructuring way

    // destructure properties
    const{cityDets, weather}= data;   // NEw property in javascipt!!!!
    

    //update details template
    details.innerHTML= `
    <h5 class="my-3">${cityDets.EnglishName}(${cityDets.Country.EnglishName})</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    <div>local Date and Time:   </div>
    `;  // private eye, magnum pi,
    // update the night and day images!!

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    // using the Tenary Operator will look like this
    let timeSrc = weather.IsDayTime? 'img/day.svg': 'img/night.svg';
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg'
    // }
    time.setAttribute('src',timeSrc);

    // remove the d-none if present
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) =>{


// when the property name is the same as the value name then apply the 
// OBJECT SHORT HAND  NOTATION
}

cityForm.addEventListener('submit', e => {
    // prevent Default Action 
    e.preventDefault();

    // get city Value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with now city
    forecast.updateCity(city)
    .then(data =>{
        updateUI(data) ;
        console.log(data);} )
    .catch(err => console.log(err));

    //setLocalStorage
    localStorage.setItem('city',city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err=> console.log(err));
}