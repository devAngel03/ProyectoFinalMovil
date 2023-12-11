import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car.mode';
import { License } from 'src/app/models/licence.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-add-update-car',
  templateUrl: './add-update-car.component.html',
  styleUrls: ['./add-update-car.component.scss'],
})
export class AddUpdateCarComponent  implements OnInit {

  form = new FormGroup({
    placa:  new FormControl('', [Validators.required]),
    marca:  new FormControl('', [Validators.required]),
    modelo:  new FormControl('', [Validators.required]),
    color:  new FormControl(''),
    anio:  new FormControl('', [Validators.required]),
  });


  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  
  ngOnInit() {}

  async onSubmit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.addcar(this.form.value as Car)
        .then(res => {
          this.utilsSvc.presentToast({
            message: 'Vehiculo agregada con exito',
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
