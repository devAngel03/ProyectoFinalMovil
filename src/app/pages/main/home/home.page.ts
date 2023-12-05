import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateMultaComponent } from 'src/app/shared/components/add-update-multa/add-update-multa.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  //===== Cerrar Sesion =====
  signOut() {
    this.firebaseSvc.signOut();
  }

  //======= Agregar o actualizar multa ======
  addUpdateMulta() {

    this.utilsSvc.presentModal({
      component: AddUpdateMultaComponent,
      cssClass: 'add-update-modal'
    })
  }

}
