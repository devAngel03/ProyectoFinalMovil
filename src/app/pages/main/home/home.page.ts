import { Component, OnInit, inject } from '@angular/core';
import { Multa } from 'src/app/models/multa.mode';
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

  multa: Multa[] = []

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getMulta();
  }

  getMulta() {
    let path = `multas`;

    let sub =this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.multa =  res;
        sub.unsubscribe();
      }
    })
  }

  play(mAudio) {
    const base64Sound = mAudio;
    const mimeType = 'audio/webm;codecs=opus';

    const audioRef = new Audio(`data:${mimeType};base64,${base64Sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }

  //======= Agregar o actualizar multa ======
  addUpdateMulta() {

    this.utilsSvc.presentModal({
      component: AddUpdateMultaComponent,
      cssClass: 'add-update-modal'
    })
  }

}
