import { Component, Input, OnInit, inject } from '@angular/core';
import { Multa } from 'src/app/models/multa.mode';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-modal-multa',
  templateUrl: './modal-multa.component.html',
  styleUrls: ['./modal-multa.component.scss'],
})
export class ModalMultaComponent  implements OnInit {

  @Input() multaId: string;

  multa: any;

  firebaseSvc = inject(FirebaseService)

  constructor() { }

  ngOnInit() {
    console.log(this.multaId);
    

    this.getMultaById();
  }

  async getMultaById() {
    try {
      let path = `/multas/${this.multaId}`;
      console.log(path);

      this.multa = await this.firebaseSvc.getDocument(path);
      console.log(this.multa); // Asegúrate de que obtienes los datos correctamente
    } catch (error) {
      console.error('Error obteniendo datos de la multa:', error);
    }
  }
  

  play(mAudio) {
    const base64Sound = mAudio;
    const mimeType = 'audio/webm;codecs=opus';

    const audioRef = new Audio(`data:${mimeType};base64,${base64Sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }
}
