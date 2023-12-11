import { Component,Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.page.html',
  styleUrls: ['./modal-map.page.scss'],
})
export class ModalMapPage implements OnInit {

  @Input() marker: any;
  @Input() res: any;
  
  dta = [];
  constructor() {
  
   }

  ngOnInit() {

  }

  play(mAudio) {
    const base64Sound = mAudio;
    const mimeType = 'audio/webm;codecs=opus';

    const audioRef = new Audio(`data:${mimeType};base64,${base64Sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }

}
