import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Motivo } from 'src/app/models/motivo.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-motive',
  templateUrl: './add-update-motive.component.html',
  styleUrls: ['./add-update-motive.component.scss'],
})
export class AddUpdateMotiveComponent  implements OnInit {

  form = new FormGroup({
  
    motivo:  new FormControl('', [Validators.required]),
    precio:  new FormControl(0 , [Validators.required]),
    detalle:  new FormControl('', [Validators.required]),
  
  });

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  

  ngOnInit() {}

  
  async onSubmit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.addMotive(this.form.value as Motivo)
        .then(res => {
          this.utilsSvc.presentToast({
            message: 'Motivo agregada con exito',
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
