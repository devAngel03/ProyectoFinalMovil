import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.mode';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-zodiac',
  templateUrl: './zodiac.page.html',
  styleUrls: ['./zodiac.page.scss'],
})
export class ZodiacPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  signo: string = '';
  horoscopo: any;
  userdata = [];

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  constructor(private http: HttpClient) { }

  getdata() {
    this.firebaseSvc.getUser(this.user().uid).subscribe(res => {
      this.userdata = res;
      this.signo = this.getZodiacSign(this.userdata['birth']);

      const apiUrl = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${this.signo}&day=today`;

      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.horoscopo = [data.data]; // Asigna el objeto data
          console.log(this.horoscopo);
        },
        error => {
          console.error('Error fetching horoscope:', error);
        }
      );
    });
  }
  


 getZodiacSign(birthDate: string): string {
    
    const month = parseInt(birthDate.split('-')[1], 10); // convierte a número base 10
    const day = parseInt(birthDate.split('-')[2], 10); // convierte a número base 10

    // Determine el signo del zodíaco basándose en el mes y el día
    switch (true) {
      case (month === 3 && day >= 21) || (month === 4 && day <= 19):
        return 'Aries';
      case (month === 4 && day >= 20) || (month === 5 && day <= 20):
        return 'Tauro';
      case (month === 5 && day >= 21) || (month === 6 && day <= 20):
        return 'Géminis';
      case (month === 6 && day >= 21) || (month === 7 && day <= 22):
        return 'Cáncer';
      case (month === 7 && day >= 23) || (month === 8 && day <= 22):
        return 'Leo';
      case (month === 8 && day >= 23) || (month === 9 && day <= 22):
        return 'Virgo';
      case (month === 9 && day >= 23) || (month === 10 && day <= 22):
        return 'Libra';
      case (month === 10 && day >= 23) || (month === 11 && day <= 21):
        return 'Escorpio';
      case (month === 11 && day >= 22) || (month === 12 && day <= 21):
        return 'Sagitario';
      case (month === 12 && day >= 22) || (month === 1 && day <= 19):
        return 'Capricornio';
      case (month === 1 && day >= 20) || (month === 2 && day <= 18):
        return 'Acuario';
      case (month === 2 && day >= 19) || (month === 3 && day <= 20):
        return 'Piscis';
      default:
        return 'Desconocido';
    }
  }

  
  ngOnInit() {
    
    this.getdata();
  
  }

}
