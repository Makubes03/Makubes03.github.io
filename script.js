function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

// 将经纬度转换为城市名
function getCityName(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village;
            return city;
        })
        .catch(error => {
            console.error('Failed to fetch city name:', error);
            return null;
        });
}





function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getCityName(lat, lon)
        .then(city => {
            if (city) {
                document.getElementById("location").innerHTML = "City: " + city;
              	  
                fetchAQI(lat, lon);
                fetchWeather(lat, lon);
              
              
              	 
           
            } else {
                document.getElementById("location").innerHTML = "Failed to fetch city name";
            }
        });
}





function showError(error) {
   
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "用户拒绝了定位请求。"
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "无法获取位置信息。"
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "请求用户位置超时。"
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "发生未知错误。"
            break;
    }
}

function fetchAQI(lat, lon) {
    // 这里模拟从API获取空气质量指数，实际应用中需要替换成API请求
    document.getElementById("aqi").innerHTML = "空气质量指数 (AQI): 50";
}

function fetchWeather(lat, lon) {
    const apiKey = 'b916cd01f73711c12d7569fe2fc5471c'; // OpenWeatherMap API密钥
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=zh_cn`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data); // 显示天气信息的函数
        })
        .catch(error => {
            console.error('Could not fetch weather:', error);
        });
}

function displayWeather(data) {
    const weather = data.weather[0].description; // 获取天气描述
    const temp = data.main.temp; // 获取当前温度
    document.getElementById('weather').innerHTML = `天气: ${weather}, 温度: ${temp}°C`;
}

function fetchAQI(lat, lon) {
    const token = '21b156634c43ce95b56e273b81df809da239419c'; // 替换为你的AQICN API密钥
    const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayAQI(data); // 显示空气质量信息的函数
        })
        .catch(error => {
            console.error('Could not fetch AQI:', error);
        });
}

function displayAQI(data) {
    const aqi = data.data.aqi; // 获取空气质量指数
    document.getElementById('aqi').innerHTML = `空气质量指数 (AQI): ${aqi}`;
}
