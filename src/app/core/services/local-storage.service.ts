import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem(key: string, value: string | object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): string | object | null {
    const localStorageItem = localStorage.getItem(key);
    if (localStorageItem) {
      return JSON.parse(localStorageItem);
    }
    return null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
