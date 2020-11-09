import { Storage } from '@ionic/storage';
import { IPlayer } from './api.service';
import { Injectable } from '@angular/core';

const PROFILE_KEY = 'profile';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  AddProfile(profile: IPlayer){
    this.storage.set(PROFILE_KEY, profile);
  }
  getProfile(): Promise<IPlayer>{
    return this.storage.get(PROFILE_KEY);
  }
}
