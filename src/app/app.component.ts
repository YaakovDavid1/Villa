import { Component, ViewChild, NgModule, Directive, ElementRef, HostListener, Input   } from '@angular/core';
import { user } from 'src/app/Models/Users';
import { UsersService } from './Services/Users/users.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'; 
import { Injectable } from '@angular/core'; 
import { MatMenuTrigger } from '@angular/material/menu';
import { test } from './Models/Test';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataVillasService } from './Services/data-villas.service';
import { villaDetails } from './Models/VillaDetails';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    // נותן לנו את מספר הוילות שיש
    getArray(villaDetails: number): number[] {
      return Array.from({ length: villaDetails }, (_, index) => index);
    }
    villaImages: string[] = []; // מערך שמחזיק תמונה ראשית של כל וילה




    villaDetails: villaDetails[] = [];
    user!:user[];
    public testForm!: FormGroup;

    constructor(private fb: FormBuilder,private _service:UsersService, private _DataVillasService:DataVillasService,private router:Router){}

    ngOnInit(): void {
      this.testForm = this.fb.group({
        name: ['', Validators.required],
        city: ['', Validators.required],
      });

      this._DataVillasService.getListvillaDetails().subscribe(res => {
        this.villaDetails = res;
        
    });

    // מקבל את התמונה הראשית של כל וילה
      this._DataVillasService.getFirstImageOfEachVilla().subscribe(
        (data: string[]) => {
          this.villaImages = data.map(image => `data:image/jpeg;base64,${image}`);
        },
        (error) => console.error(error)
      );
      
      

    }

    getUsers(){
      this._service.getUsers().subscribe(res => this.user = res);
      console.log(this.user);
    }
    
    // test area
    Addtest(){
      this._service.testServices(this.testForm.value).subscribe();
    }
 



    getDummyVillaData(index: number): any {
      // Replace this with actual data from your service
      return {
        photos: [{ url: 'placeholder-image-url' }],
        nameVila: this.villaDetails[index]?.nameVila || 'Default Name',
        location: this.villaDetails[index]?.location || 'Default Location',
        numBedroom: this.villaDetails[index]?.numBedroom || 'Default numBedroom',
        vilaId: this.villaDetails[index]?.vilaId || 'Default vilaId',

        
      };
    }

    onViewDetailsClicked(id: number) {
      this.router.navigate(['/info-vila', id]);
    }

    
}
