import axios from "axios";

export default function Search() {
  function handleResponse(response) {
    alert(`The weather in Paris is ${response.data.main.temp} °C`);
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=64469ac67e6dc941feb5b50915a18dc7&units=metric`;
  axios.get(apiUrl).then(handleResponse);
}
