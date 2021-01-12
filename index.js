//https://www.metaweather.com/api/location/search/?query=stuff+goes+here
//https://www.metaweather.com/api/location/44418/

const form = document.getElementById('city-search')
const minTempSpan = document.getElementById('min-temp')
const maxTempSpan = document.getElementById('max-temp')

form.addEventListener('submit', function(event){
  event.preventDefault()
  fetchCity()
})

function fetchCity(){
  let value = document.getElementById('city-input').value //"San Francisco" but we need it to be "san+francisco"
  let formattedValue = value.toLowerCase().split(" ").join("+")
  console.log("About to fetch!");
  fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${formattedValue}`)
    .then(jsonify)
    .then(fetchWeather)
    .catch(function(error){
      console.log(error.message)
    })
}

function fetchWeather(json){
  let id = json[0].woeid
  fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}`)
    .then(jsonify)
    .then(function(json){
      addTemp(minTempSpan, json.consolidated_weather[0].min_temp)
      addTemp(maxTempSpan, json.consolidated_weather[0].max_temp)
    })
}

function jsonify(resp){
  console.log("Got response! ");
  return resp.json()
}

function addTemp(el, temp){
  el.innerText = temp
}















//
