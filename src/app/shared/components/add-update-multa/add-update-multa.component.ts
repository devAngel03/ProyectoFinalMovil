import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-multa',
  templateUrl: './add-update-multa.component.html',
  styleUrls: ['./add-update-multa.component.scss'],
})
export class AddUpdateMultaComponent  implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    cedula:  new FormControl('', [Validators.required]),
    placa:  new FormControl('', [Validators.required]),
    motivo:  new FormControl('', [Validators.required]),
    image:  new FormControl(''),
    comment:  new FormControl(''),
    audio:  new FormControl(''),
    latitud:  new FormControl('', [Validators.required]),
    longitud:  new FormControl('', [Validators.required]),
    fecha:  new FormControl('', [Validators.required]),
    hora:  new FormControl('', [Validators.required]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Evidencia')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc
        .signUp(this.form.value as User)
        .then( async res => {

          await this.firebaseSvc.updateUser(this.form.value.cedula)

          let uid = res.user.uid;


        })
        .catch((error) => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }


}
