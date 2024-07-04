//?HTML ELEMENTS START========
const searchInput = document.querySelector('#search');
const submitButton = document.querySelector('#submit');
const alertElement = document.querySelector('.alert');
const closeAlertIcon = document.querySelector('#close-alert');
const dropDown = document.querySelector('.d-list');
const dropbars = document.querySelector('.bars')
//?HTML ELEMENTS END==========


//*DROPDOWN
let isOpen = false;

dropbars.addEventListener('click', function () {
    if (!isOpen) {
        dropDown.classList.replace('d-none', 'd-block');
        isOpen = true;
    } else {
        dropDown.classList.replace('d-block','d-none');
        isOpen = false;
    }
})

//*DROPDOWN

//*=========================================================
//?API START===========
const apiKey = '5b551db9024347638d2180620240307';
const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';
//?API END=============

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        let city = `${lat},${long}`
        weatherData(city);
    }
    )
} else {
    alert('please turn on ur geolocation')
}


async function weatherData(makan) {
    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${makan}&days=3&aqi=no&alerts=no`);
    const data = await response.json();
    console.log(data);

    if (data.location.country.toLowerCase() === 'israel') {
        alertElement.classList.replace('d-none', 'd-block');
    } else {
        displayWeatherCards(data);

    }
}

searchInput.addEventListener('input', function (e) {
    
    //remove the alert in case of a previous wrong location search
    alertElement.classList.replace('d-block', 'd-none');

    let location = e.target.value;
    e.target = "";

    //rejex for numbers check
    const hasNumber = /\d/;
    weatherData(location);
    if (hasNumber.test(location)||data.location.country === 'israel') {
        console.error('Error: Location contains a number');
        alertElement.classList.replace('d-none', 'd-block');
        displayWeatherCards();
    } else {
        displayWeatherCards(data);
    }


});

closeAlertIcon.addEventListener('click', function () {
    alertElement.classList.add('d-none')
})

function displayWeatherCards(res) {
    //CURRENT DAY
    //to get just the date
    let dateType = res.current.last_updated.split(' ')[0];
    let date = new Date(dateType);
    let dayName = date.toLocaleString('en-us', { weekday: 'long' });
    let dayNumber = date.toLocaleString('en-us', { day: 'numeric' });
    let month1 = date.toLocaleString('en-us', { month: 'long' });

    //TOMORROW
    let tomorrowDateType = res.forecast.forecastday[1].date;
    let tomorrowDate = new Date(tomorrowDateType);
    let tomorrowDayName = tomorrowDate.toLocaleDateString('en-us', { weekday: 'long' })
    let tomorrowDayNumber = tomorrowDate.toLocaleDateString('en-us', { day: 'numeric' })
    let month2 = tomorrowDate.toLocaleString('en-us', { month: 'long' });

    //AFTER TOMORROW
    let afterTomorrowDateType = res.forecast.forecastday[2].date;
    let afterTomorrowDate = new Date(afterTomorrowDateType);
    let afterTomorrowDayName = afterTomorrowDate.toLocaleString('en-us', { weekday: 'long' });
    let afterTomorrowDayNumber = afterTomorrowDate.toLocaleString('en-us', { day: 'numeric' });
    let month3 = afterTomorrowDate.toLocaleString('en-us', { month: 'long' });


    // Update card 1 with res for today
    document.querySelector('#card1-day').innerText = dayName;
    document.querySelector('#card1-date').innerText = `${dayNumber} ${month1}`;
    document.querySelector('#card1-location').innerText = `${res.location.name}, ${res.location.country}`;
    document.querySelector('#card1-temp').innerText = `${res.current.temp_c}°C`;
    document.querySelector('#card1-icon').src = `https:${res.current.condition.icon}`;
    document.querySelector('#card1-condition').innerText = res.current.condition.text;
    document.querySelector('#card1-humidity').innerText = `${res.current.humidity}%`;
    document.querySelector('#card1-wind').innerText = `${res.current.wind_kph} km/h`;
    document.querySelector('#card1-direction').innerText = res.current.wind_dir;
    // Update card 2 with res for tomorrow
    document.querySelector('#card2-day').innerText = tomorrowDayName;
    document.querySelector('#card2-date').innerText = `${tomorrowDayNumber} ${month2}`;
    document.querySelector('#card2-location').innerText = `${res.location.name}, ${res.location.country}`;
    document.querySelector('#card2-temp').innerText = `${res.forecast.forecastday[1].day.avgtemp_c}°C`;
    document.querySelector('#card2-icon').src = `https:${res.forecast.forecastday[1].day.condition.icon}`;
    document.querySelector('#card2-condition').innerText = res.forecast.forecastday[1].day.condition.text;

    // Update card 3 with res for the day after tomorrow
    document.querySelector('#card3-day').innerText = afterTomorrowDayName;
    document.querySelector('#card3-date').innerText = `${afterTomorrowDayNumber} ${month3}`;
    document.querySelector('#card3-location').innerText = `${res.location.name}, ${res.location.country}`;
    document.querySelector('#card3-temp').innerText = `${res.forecast.forecastday[2].day.avgtemp_c}°C`;
    document.querySelector('#card3-icon').src = `https:${res.forecast.forecastday[2].day.condition.icon}`;
    document.querySelector('#card3-condition').innerText = res.forecast.forecastday[2].day.condition.text;
}
