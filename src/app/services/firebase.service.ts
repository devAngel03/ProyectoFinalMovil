import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { User } from '../models/user.mode';
import { License } from '../models/licence.mode';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Firestore ,getFirestore, collection, setDoc, doc, getDoc, addDoc, collectionData, query, where} from '@angular/fire/firestore'
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore)
  utilsSvc = inject(UtilsService);
  fires = inject(Firestore);
  


  // =====================Autenticacion====================
  getAuth() {
    return getAuth();
  }

  //============Acceder==============
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //============Crear Usuario==============
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //============Actualizar Usuario==============
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  //============ Enviar email para restablecer contraseña ==============
  sendRecoveryEmail(email:string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  //====== Cerrar sesion =======
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  //====== Crud Licencias=======

  addLicense(license: License) {
    const licenseRef = collection(this.fires, 'license');
    return addDoc(licenseRef, license);
  }
  
  
  getLicenseByCedula(cedula: string): Observable<License[]> {
    const licenseRef = collection(this.fires, 'license');
    return collectionData(query(licenseRef, where('cedula', '==', cedula))) as Observable<License[]>;
  }
  
  
  getLicense() {
    const licenseRef = collection(this.fires, 'license');
    return collectionData(licenseRef);    
  }
  

  //========================= Base de Datos ===================

  //====== Setear un documento ======
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //====== Obtener un documento ======
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}
