import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {
  public isLoading = new Subject<boolean>();

  constructor() {}

  public runLoading() {
    this.isLoading.next(true);
  }

  public stopLoading() {
    this.isLoading.next(false);
  }
}
