import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateCarComponent } from 'src/app/shared/components/add-update-car/add-update-car.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  placa: string;
  cars = [];
  noencontrada = false;


  constructor(private fireServise: FirebaseService) { }

  ngOnInit() {
       }

  //======= Obtener vehiculo ======
  getCar() {
    this.fireServise.getCarByPlaca(this.placa).subscribe(res => {
      this.cars = res;
      if (this.cars.length == 0) {
        this.noencontrada = true;
      } else {
        this.noencontrada = false;
      }
    });
  }
  //======= Agregar o actualizar vehiculo ======
  addUpdateCar() {

    this.utilsSvc.presentModal({
      component: AddUpdateCarComponent,
      cssClass: 'add-update-modal'
    })
  }

}
