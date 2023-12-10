import { Component, OnInit, inject } from '@angular/core';
import { License } from 'src/app/models/licence.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateLicenseComponent } from 'src/app/shared/components/add-update-license/add-update-license.component';

@Component({
  selector: 'app-license',
  templateUrl: './license.page.html',
  styleUrls: ['./license.page.scss'],
})
export class LicensePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  cedula: string;
  licenses = [];
  noencontrada = false;


  constructor(private fireServise: FirebaseService) { }

  ngOnInit() {
       }

  //======= Obtener licensia ======
  getLicense() {
    this.fireServise.getLicenseByCedula(this.cedula).subscribe(res => {
      this.licenses = res;
      if (this.licenses.length == 0) {
        this.noencontrada = true;
      } else {
        this.noencontrada = false;
      }
    });
  }
  //======= Agregar o actualizar licensia ======
  addUpdateLicense() {

    this.utilsSvc.presentModal({
      component: AddUpdateLicenseComponent,
      cssClass: 'add-update-modal'
    })
  }

}
