import { Injectable } from '@angular/core';
import { villaDetails } from '../Models/VillaDetails';
import { villaDescription } from '../Models/VillaDescription';
import { checkListVila } from '../Models/CheckListVila';
import { HttpClient, HttpEvent, HttpRequest  } from '@angular/common/http'
import { Observable, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataVillasService {

  baseAPI = "https://localhost:44308/api/Users/";
  detailes:villaDetails[]=[]
  description:villaDescription[]=[]
  checkList:checkListVila[]=[]

  constructor(private http:HttpClient, private router: Router) { }
  ngOnInit(){}

 getListvillaDetails(): Observable<villaDetails[]>{
    return this.http.get<villaDetails[]>(this.baseAPI+"getAllVillasDetail");
  }
  getListVillasDesctiption(): Observable<villaDescription[]>{
    return this.http.get<villaDescription[]>(this.baseAPI+"getAllVillasDesctiption");
  }
  getListVillasCheckList(): Observable<checkListVila[]>{
    return this.http.get<checkListVila[]>(this.baseAPI+"getAllVillasCheckList");
  }
  getFirstImageOfEachVilla(): Observable<any>{
    return this.http.get<any>(this.baseAPI+"getFirstImageOfEachVilla");
  }


  // Gets a villa number and returns an object of the villa from all the tables
  getVillaDetails(villaId: number): Observable<any> {
    // Combine the results from all three API calls
    return forkJoin({
      details: this.http.get<any>(`${this.baseAPI}getAllVillasDetail`),
      description: this.http.get<any>(`${this.baseAPI}getAllVillasDesctiption`),
      checklist: this.http.get<any>(`${this.baseAPI}getAllVillasCheckList`)
    }).pipe(
      // Process the combined data and filter based on villaId
      mergeMap(data => {
        const combinedData = {
          details: data.details.find((item: any) => item.vilaId === villaId),
          description: data.description.find((item: any) => item.vilaId === villaId),
          checklist: data.checklist.find((item: any) => item.vilaId === villaId)
        };
        return [combinedData];
      })
    );
  }

}
