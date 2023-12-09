import { Component, OnInit, inject } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }


  //======= Agregar o actualizar multa ======
  addUpdateLicense() {

    this.utilsSvc.presentModal({
      component: AddUpdateLicenseComponent,
      cssClass: 'add-update-modal'
    })
  }

}
