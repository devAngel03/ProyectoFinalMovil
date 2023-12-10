import { Component, OnInit, inject } from '@angular/core';
import { Motivo } from 'src/app/models/motivo.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateMotiveComponent } from 'src/app/shared/components/add-update-motive/add-update-motive.component';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.page.html',
  styleUrls: ['./penalty.page.scss'],
})
export class PenaltyPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  cedula: string;
  motives = [];
  noencontrada = false;

  constructor(private fireServise: FirebaseService) { }

  ngOnInit() {
    this.fireServise.getMotive().subscribe(res => {
      console.log(res);
      this.motives = res;
      if (this.motives.length == 0) {
        this.noencontrada = true;
      } else {
        this.noencontrada = false;
      }
    });
  }

   
    //======= Agregar o actualizar licensia ======
    addUpdateMotivo() {
  
      this.utilsSvc.presentModal({
        component: AddUpdateMotiveComponent,
        cssClass: 'add-update-modal'
      })
    }
  

}
