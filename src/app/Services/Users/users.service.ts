import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest  } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from 'src/app/Models/Users';
import { test } from 'src/app/Models/Test';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl:string="https://localhost:44308/api/Users/"
  private UrlTest:string="https://localhost:44308/api/Users/AddTest"
  private Urlregister:string="https://localhost:44308/api/Users/rregister"
  constructor(private http:HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken(); 
  }


 signUp(userObj:any){
  console.log(userObj);
 
    return this.http.post<any>(`${this.baseUrl}rregister`,userObj);
 }

 signIn(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
 }


  getUsers(): Observable<user[]>{
    return this.http.get<user[]>(this.baseUrl);
  }

  testServices(item:any){
    console.log(item);
    let httpOP= {
      headers:{"Content-Type":"application/json;charset=utf-8"}
    }
    return this.http.post<any>(this.UrlTest,item,httpOP)
  } 

  getListOfVilaByEmailUser(email:string){
    let httpOP= {
      headers:{"Content-Type":"application/json;charset=utf-8"}
    }
    var a =this.http.get<any>("https://localhost:44308/api/Users/getListOfVilaByEmailUser/"+email);
    console.log(a);
    return this.http.get<any>("https://localhost:44308/api/Users/getListOfVilaByEmailUser/"+email);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }




  
  // Token area
  storeToken(tokenValue: string){         // Update the token in localStorage
    localStorage.setItem('token', tokenValue);
  }
  
  getToken(){                            // Retrieving the token from localStorage
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  


  // user-store
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  public getRoleFromStore(){
    return this.role$.asObservable();
  }
  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullName:string){
    this.fullName$.next(fullName);
  }

  private userPayload:any;
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.name;
    }
  }
  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }


// העלאת תמונות טסט 
/*
uploadImages(images: File[]): Observable<string> {
  const formData = new FormData();

  images.forEach((image, index) => {
    formData.append(`image${index + 1}`, image, image.name);
  });
  return this.http.post<string>("https://localhost:44308/api/Users/addImages", formData);
}
*/


apiFile = 'https://localhost:44308/api/Users';




/*
// מקבל את התמונות לפי מזהה וילה
getPhotosByVilaId(vilaId: number): Observable<string[]> {
  return this.http.get<string[]>("https://localhost:44308/api/Users/getPhotoByVilaID/"+ vilaId);
}

*/


}
