import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  url=''
  constructor(private mediaObserver:MediaObserver) { }
  isSmallDevice(){
    return this.mediaObserver.asObservable();
  }
}
