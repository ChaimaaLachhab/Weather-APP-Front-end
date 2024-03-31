function showSection1() {
    document.getElementById('section1').style.display = 'block';
    document.getElementById('section2').style.display = 'none';
}

function showSection2() {
    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'block';
}


showSection1();

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const timeElementS = document.querySelector(".time-search");
const dateElementS = document.querySelector(".date-search");

function formatTime(date) {
    const hours12 = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const isAm = date.getHours() < 12;

    return `${hours12.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

function formatDate(date) {
    const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]
        } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
    const now = new Date();

    timeElement.textContent = formatTime(now);
    dateElement.textContent = formatDate(now);
    timeElementS.textContent = formatTime(now);
    dateElementS.textContent = formatDate(now);
}, 200);

async function fetchAndDisplayWeather(language) {
    const apiKey = '89fea7617aa9f99fb9afd111441466c1';
    const cities = ["Tanger", "Casablanca", "Beni Mellal", "Rabat"];
    const langCode = (language === 'Arab') ? 'ar' : 'en';

    clearWeatherCards();

    for (const city of cities) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=${langCode}`);
            const data = await response.json();
            displayWeather(city, data, language);
            console.log(data);
        } catch (error) {
            console.error('Erreur :', error);
        }
    }
}

function getImageSource(icon) {
    switch (icon) {
        case '01d':
            return './img/26.png';
        case '02d':
            return './img/27.png';
        case '03d':
            return './img/35.png';
        case '04d':
            return './img/35.png';
        case '09d':
            return './img/7.png';
        case '10d':
            return './img/8.png';
        case '11d':
            return './img/12.png';
        case '13d':
            return './img/18.png';
        case '50d':
            return './img/6.png';
        case '01n':
            return './img/10.png';
        case '02n':
            return './img/15.png';
        case '03n':
            return './img/35.png';
        case '04n':
            return './img/35.png';
        case '09n':
            return './img/7.png';
        case '10n':
            return './img/1.png';
        case '11n':
            return './img/12.png';
        case '13n':
            return './img/18.png';
        case '50n':
            return './img/2.2.png';
        default:
            return '';
    }
}

function displayWeather(city, data, language) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.setAttribute('class', 'd-flex justify-content-center flex-wrap gap-4 mt-3');
    const card = document.createElement('div');
    card.classList.add('weather-card', 'd-flex', 'flex-column', 'justify-content-between', 'align-items-center', 'p-4', 'pb-1', 'fade-in', 'color-change', 'text-light', 'rounded-4');
    card.innerHTML = `
      <div class="border-bottom w-100">
      <h1 class="location fs-4 fw-bolder text-center">${data.name}</h1>
      </div>
      <img src="${getImageSource(data.weather[0].icon)}" alt="Weather Icon" class="mt-3">
      <div class="details w-100">
      <p>${data.weather[0].description}</p>
          <div class="d-flex justify-content-between">
              ${language === 'Arab' ?
            `<p>${data.main.temp} °C</p>
                  <p class="fw-bolder" data-translate="Temperature">:${translations['Temperature'][language]}</p>` :
            `<p class="fw-bolder" data-translate="Temperature">${translations['Temperature'][language]}:</p>
                  <p>${data.main.temp} °C</p>`
        }
          </div>              
          <div class="d-flex justify-content-between">
              ${language === 'Arab' ?
            `<p>${data.main.humidity}%</p>
                  <p class="fw-bolder" data-translate="Humidity">:${translations['Humidity'][language]}</p>` :
            `<p class="fw-bolder" data-translate="Humidity">${translations['Humidity'][language]}:</p>
                  <p>${data.main.humidity}%</p>`
        }
          </div>
          <div class="d-flex justify-content-between">
              ${language === 'Arab' ?
            `<p>${data.wind.speed} m/s</p>
                  <p class="fw-bolder" data-translate="WindSpeed">:${translations['WindSpeed'][language]}</p>` :
            `<p class="fw-bolder" data-translate="WindSpeed">${translations['WindSpeed'][language]}:</p>
                  <p>${data.wind.speed} m/s</p>`
        }
          </div>
      </div>
    `;

    cardContainer.appendChild(card);
}

// Traductions pour les chaînes de texte
const translations = {

    'WeatherWiseDescription': {
        'Arab': '  هو رفيقك النهائي للبقاء محدثًا بشكل مستمر مع الظروف الجوية المتغيرة باستمرار WeatherWise',
        'English': 'WeatherWise is your ultimate companion for staying updated with the ever-changing weather conditions.'
    },
    'Home': {
        'Arab': 'الرئيسية',
        'English': 'Home'
    },
    'Map': {
        'Arab': 'الخريطة',
        'English': 'Map'
    },
    'Calendar': {
        'Arab': 'التقويم',
        'English': 'Calendar'
    },
    'Language': {
        'Arab': 'اللغة',
        'English': 'Language'
    },
    'DarkMode': {
        'Arab': 'الوضع اليلي/الصباحي',
        'English': 'Dark/Light Mode'
    },
    'Setting': {
        'Arab': 'الإعدادات',
        'English': 'Setting'
    },
    'Logout': {
        'Arab': 'تسجيل الخروج',
        'English': 'Logout'
    },
    'Temperature': {
        'Arab': 'درجة الحرارة',
        'English': 'Temperature'
    },
    'Conditions': {
        'Arab': 'الظروف',
        'English': 'Conditions'
    },
    'Humidity': {
        'Arab': 'الرطوبة',
        'English': 'Humidity'
    },
    'WindSpeed': {
        'Arab': 'سرعة الرياح',
        'English': 'Wind Speed'
    }
};

// Fonction pour changer les chaînes de texte en fonction de la langue sélectionnée
function changeLanguage(language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.dataset.translate;
        if (translations[key] && translations[key][language]) {
            element.textContent = translations[key][language];
        }
    });
}

// Fonction pour effacer les cartes météorologiques
function clearWeatherCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
}

changeLanguage('English');

const languageItems = document.querySelectorAll('.dropdown-item');

languageItems.forEach(item => {
    item.addEventListener('click', async function (event) {
        event.preventDefault();
        const language = this.textContent.trim();
        console.log('Language selected:', language);
        changeLanguage(language);
        await fetchAndDisplayWeather(language);
    });
});

fetchAndDisplayWeather('English');

// :::::::::::::::::::::::::::::::::::::::ther__datetime::::::::::::::::::::::::::::::

document.querySelector(".weather__search").addEventListener('submit', (e) => {
    e.preventDefault();
    let searchInput = document.querySelector(".weather__searchform").value;
    getWeather(searchInput);
    getFiveDaysForecast(searchInput);
    showSection2();
    document.querySelector(".weather__searchform").value = "";
});

function getWeather(city) {
    const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw new Error('City not found');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            updateWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('City not found. Please enter a valid city name.');
        });
}

function updateWeather(data) {
    const cityElement = document.querySelector('.weather__city');
    const forecastElement = document.querySelector('.weather__forecast');
    const temperatureElement = document.querySelector('.weather__temperature');
    const iconElement = document.querySelector('.weather__icon');
    const humidityElement = document.querySelector('.weather__humidity');
    const windElement = document.querySelector('.weather__wind');
    const pressureElement = document.querySelector('.weather__pressure');

    cityElement.innerHTML = `${data.name}`;
    forecastElement.innerHTML = data.weather[0].main;
    temperatureElement.innerHTML = `${data.main.temp.toFixed()}°C`;
    iconElement.innerHTML = `<img src="${getImageSource(data.weather[0].icon)}" alt="Weather Icon"/>`;
    humidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${data.wind.speed} m/s`;
    pressureElement.innerHTML = `${data.main.pressure} hPa`;
}

function getFiveDaysForecast(city) {
    const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5';
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw new Error('City not found');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            updateFiveDaysForecast(data);
        })
        .catch(error => {
            console.error('Error fetching five days forecast:', error);
            alert('City not found. Please enter a valid city name.');
        });
}

function updateFiveDaysForecast(data) {
    const forecastContainer = document.getElementById('card-container-search');
    forecastContainer.innerHTML = '';

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const currentDate = new Date();
    let currentDayIndex = currentDate.getDay(); 

    const nextFourDays = data.list.filter(forecastItem => {
        const forecastDate = new Date(forecastItem.dt * 1000);
        return forecastDate.getDay() !== currentDayIndex;
    }).slice(0, 4);

    nextFourDays.forEach((forecastItem, index) => {
        const dayIndex = (currentDayIndex + index) % 7;
        const dayName = dayNames[dayIndex];

        let weatherIcon = '';
        if (forecastItem.weather && forecastItem.weather.length > 0 && forecastItem.weather[0].icon) {
            weatherIcon = getImageSource(forecastItem.weather[0].icon);
        }

        const html = `
            <div class="weather-card-search-week d-flex flex-column align-items-center gap-2 p-3 rounded-4">
                <div class="border-bottom w-100">
                    <h6 class="location fw-bolder text-center">${dayName}</h6>
                </div>
                <img src="${weatherIcon}" alt="Weather Icon">
                <div class="d-flex justify-content-between">
                    <p class="condition">${forecastItem.weather[0].description}</p>
                </div>
            </div>
        `;
        // Insert the HTML into the forecast container
        forecastContainer.insertAdjacentHTML('beforeend', html);
    });
}

document.getElementById("home").addEventListener('click' , function() {
    showSection1();
});

document.getElementById("map").addEventListener('click' , function() {
    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'none';
    document.getElementById('section3').style.display = 'block';

});

document.getElementById("calendar").addEventListener('click' , function() {
    showSection1();
    const datetimeElement = document.getElementById('datetime');
    datetimeElement.classList.add('change-color');

    datetimeElement.style.backgroundColor = "black";

    setTimeout(() => {
        datetimeElement.classList.add('change-color');
        datetimeElement.style.backgroundColor = "";
    }, 900); 
});