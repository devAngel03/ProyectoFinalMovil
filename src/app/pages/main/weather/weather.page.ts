import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  weatherData: any;

  latitud: number;
  longitud: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDeviceLocationAndFetchWeather();
  }

  async getDeviceLocationAndFetchWeather() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();

      this.latitud = coordinates.coords.latitude;
      this.longitud = coordinates.coords.longitude;

      this.updateWeatherData();
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    }
  }

  updateWeatherData() {
    const apiKey = 'bdb78169da71fa9a1dc21eb068f3a83c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitud}&lon=${this.longitud}&appid=${apiKey}`;
    console.log('Vamos a ver');
    

    this.http.get(apiUrl).subscribe((data: any) => {
      this.weatherData = data; // Asigna la información del tiempo a la variable
    }, error => {
      console.error('Error al obtener datos del tiempo', error);
    });
  }
}
