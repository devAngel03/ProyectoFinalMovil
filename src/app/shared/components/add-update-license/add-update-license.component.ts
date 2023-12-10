import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { License } from 'src/app/models/licence.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-license',
  templateUrl: './add-update-license.component.html',
  styleUrls: ['./add-update-license.component.scss'],
})
export class AddUpdateLicenseComponent  implements OnInit {

  form = new FormGroup({
    image:  new FormControl(''),
    cedula:  new FormControl('', [Validators.required]),
    nombre:  new FormControl('', [Validators.required]),
    apellido:  new FormControl('', [Validators.required]),
    fecha:  new FormControl('', [Validators.required]),
    direccion:  new FormControl(''),
    telefono:  new FormControl('', [Validators.required]),
  });


  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  
  ngOnInit() {}

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Evidencia')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  async onSubmit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.addLicense(this.form.value as License)
        .then(res => {
          this.utilsSvc.presentToast({
            message: 'Licencia agregada con exito',
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
        })
        .catch(error => {
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
