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
import { Motivo } from '../models/motivo.mode';
import { Car } from '../models/car.mode'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Firestore,
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
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
  sendRecoveryEmail(email: string) {
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
    return collectionData(
      query(licenseRef, where('cedula', '==', cedula))
    ) as Observable<License[]>;
  }

  getLicense(): Observable<License[]> {
    const licenseRef = collection(this.fires, 'license');
    return collectionData(licenseRef) as Observable<License[]>;
  }

  //====== Crud Motivo=======

  addMotive(motive: Motivo) {
    const motiveRef = collection(this.fires, 'motive');
    return addDoc(motiveRef, motive);
  }

  getMotive(): Observable<Motivo[]> {
    const motiveRef = collection(this.fires, 'motive');
    return collectionData(motiveRef) as Observable<Motivo[]>;
  }

  //====== Crud Carro =======

  addcar(car: Car) {
    const carRef = collection(this.fires, 'car');
    return addDoc(carRef, car);
  }

  getcar(): Observable<Car[]> {
    const carRef = collection(this.fires, 'car');
    return collectionData(carRef) as Observable<Car[]>;
  }

  //========================= Base de Datos ===================

  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path)
    return collectionData(query(ref, collectionQuery), {idField: 'id'})
  }

  //====== Setear un documento ======
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //====== Obtener un documento ======
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //====== Agregar un documento ======
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  // ================= Almacenamiento ==============

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  async uploadAudio(path: string, base64: string) {
    return uploadString(ref(getStorage(), path), base64, 'base64').then(() => {
      return getDownloadURL(ref(getStorage(), path));
    });
  }
}
