import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { ModalMapPage } from '../modal-map/modal-map.page';
import { environment } from 'src/environments/environment';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  multas: any;

  constructor(private modalCtrl: ModalController, private firebase: FirebaseService) { }

  ngOnInit() { }

  async crearMapa() {
    if (this.mapRef && this.mapRef.nativeElement) {
      this.map = await GoogleMap.create({
        id: 'my-map',
        apiKey: environment.mapsKey,
        element: this.mapRef.nativeElement,
        config: {
          center: {
            lat: 18.482450,
            lng: -69.884684,
          },
          zoom: 8,
        }
      });
      this.addMarkers();
    } else {
      console.log('mapRef is not defined');
    }
  }

  getmaltas() {
    return this.firebase.getMulta();
  }

  async addMarkers() {
    this.getmaltas().subscribe(res => {

      const markers: Marker[] = [];
      res.forEach(element => {
        console.log(element);
        const lat = parseFloat(element['latitud']);
        const lng = parseFloat(element['longitud']);
        const title = element['id'] ? element['id'].toString() : '';
  
        markers.push({
          coordinate: {
            lat,
            lng,
          },
          title,
        });
      });
  
      this.map.addMarkers(markers);
  
      this.map.setOnMarkerClickListener(async (marker) => {
        const modal = await this.modalCtrl.create({
          component: ModalMapPage,
          componentProps: {
            marker,
            res
          },
          breakpoints: [0, 0.8],
          initialBreakpoint: 0.8,
        });
        modal.present();
      });
    });
  }
  
  
  
  ionViewDidEnter() {
    this.crearMapa();
  }

}
