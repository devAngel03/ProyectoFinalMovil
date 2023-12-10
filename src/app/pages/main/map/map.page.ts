import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {GoogleMap, Marker} from '@capacitor/google-maps';
import {ModalController} from '@ionic/angular';
import {ModalMapPage} from '../modal-map/modal-map.page';
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
 
  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;

  name: string;
  lastname: string;
  latitude: number;
  longitude: number;
  city: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }
  async crearMapa(){
    if(this.mapRef && this.mapRef.nativeElement){
      this.map = await GoogleMap.create({
        id: 'my-map',
        apiKey: environment.mapsKey,
        element: this.mapRef.nativeElement,
        config:{
          center:{
            lat: 18.482450,
            lng: -69.884684,
          },
          zoom: 8,
        }
      });
      this.addMarkers();
    } else {
      console.log('mapRef is not defined')
    }
  }
  
async addMarkers(){
  const markers: Marker[] =[
    {
      coordinate:{
        lat: this.latitude,
        lng: this.longitude,
      },
      title: this.name + ' ' + this.lastname + ' / ' + this.city,
    },
  ];

  await this.map.addMarkers(markers);

  this.map.setOnMarkerClickListener(async (marker) => 
  {
    const modal = await this.modalCtrl.create({
      component: ModalMapPage,
      componentProps:{
        marker,
      },
      breakpoints: [0,0.3],
      initialBreakpoint: 0.3,
    });
    modal.present();
  });
}

ionViewDidEnter(){
    this.crearMapa();
  
}

}
