import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Inicio', url: '/main/home', icon: 'home-outline'},
    { title: 'Motivo', url: '/main/penalty', icon: 'albums-outline'},
    { title: 'Perfil', url: '/main/profile', icon: 'person-outline'},
    { title: 'Licencia', url: '/main/license', icon: 'card-outline'},
    { title: 'Mapa', url: '/main/map', icon: 'map-outline'},
    { title: 'Vehiculo', url: '/main/car', icon: 'car-outline'},
    { title: 'Clima', url: '/main/weather', icon: 'cloud-outline'},
    { title: 'Noticias', url: '/main/news', icon: 'newspaper-outline'},
    { title: 'Zodiaco', url: '/main/zodiac', icon: 'planet-outline'},
  ]

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event: any)  => {
      if(event?.url) this.currentPath = event.url;
    })
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }


  // ==== Cerrar sesion =====
  signOut() {
    this.firebaseSvc.signOut();
  }

}
