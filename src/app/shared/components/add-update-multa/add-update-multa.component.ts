import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Geolocation } from '@capacitor/geolocation';
import { VoiceRecorder } from 'capacitor-voice-recorder';

@Component({
  selector: 'app-add-update-multa',
  templateUrl: './add-update-multa.component.html',
  styleUrls: ['./add-update-multa.component.scss'],
})
export class AddUpdateMultaComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(''),
    cedula: new FormControl('', [Validators.required]),
    placa: new FormControl('', [Validators.required]),
    motivo: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    comment: new FormControl(''),
    audio: new FormControl(''),
    latitud: new FormControl(''),
    longitud: new FormControl(''),
    fecha: new FormControl(''),
    hora: new FormControl(''),
  });

  isRecording: boolean = false;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  motives = [];
  noencontrada = false;

  user = {} as User;
  motive = []

  constructor(private fireServise: FirebaseService) { }

  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');

    this.getDeviceLocation();
    this.getDate();

    this.fireServise.getMotive().subscribe(res => {
      console.log(res);
      this.motives = res;
      if (this.motives.length == 0) {
        this.noencontrada = true;
      } else {
        this.noencontrada = false;
      }
    });


    VoiceRecorder.hasAudioRecordingPermission().then((result) => {
      if (!result.value) {
        VoiceRecorder.requestAudioRecordingPermission();
      }
    });
  }

  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Evidencia')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }

  recorder() {
    if (this.isRecording) {
      return;
    }
    this.isRecording = true;
    VoiceRecorder.startRecording();
  }

  stop() {
    if (!this.isRecording) {
      return;
    }
    VoiceRecorder.stopRecording().then((result) => {
      if (result.value) {
        var recordData = result.value.recordDataBase64;
        this.form.controls.audio.setValue(recordData);
        //this.saveFile(recordData);
      }
    });
  }

  // saveFile(recordData: string) {
  //   const fileName = ``
  // }

  play() {
    const base64Sound = this.form.value.audio;
    const mimeType = 'audio/webm;codecs=opus';

    const audioRef = new Audio(`data:${mimeType};base64,${base64Sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }

  async getDeviceLocation() {
    const coordinates = await Geolocation.getCurrentPosition();

    const latitud = coordinates.coords.latitude;
    const longitud = coordinates.coords.longitude;

    this.form.controls.latitud.setValue(latitud.toString());
    this.form.controls.longitud.setValue(longitud.toString());

    console.log(
      'Ubicación actual',
      coordinates.coords.latitude,
      coordinates.coords.longitude
    );
  }

  async getDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Nota: Los meses comienzan desde 0, por lo que sumamos 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    this.form.controls.fecha.setValue(formattedDate);

    let horas: number = currentDate.getHours();
    let minutos: number = currentDate.getMinutes();

    const minutosFormateados: string =
      minutos < 10 ? '0' + minutos : minutos.toString();

    const tiempoFormato24Horas: string = `${horas}:${minutosFormateados}`;

    this.form.controls.hora.setValue(tiempoFormato24Horas);
  }

  async submit() {
    if (this.form.valid) {
      
      let path = `multas`;

      const loading = await this.utilsSvc.loading();
      await loading.present();

      //====== Subir Imagen y obtener URL =========
      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.id;

      this.firebaseSvc
        .addDocument(path, this.form.value)
        .then(async (res) => {
          this.utilsSvc.dismissModal({ success: true });

          this.utilsSvc.presentToast({
            message: 'Multa creada exitosamente',
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
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


