import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  /**
   * 
   */
  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  /**
   * 
   * @param role 
   */
  public setRoleForStore(role: string) {
    return this.role$.next(role);
  }

  /**
   * 
   */
  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  /**
   * 
   * @param name 
   */
  public setFullNameForStore(name: string) {
    return this.fullName$.next(name);
  }
}
