import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../Services/Users/users.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { villaDetails } from '../Models/VillaDetails';
import { villaDescription } from '../Models/VillaDescription';
import { checkListVila } from '../Models/CheckListVila';
import { DataVillasService } from '../Services/data-villas.service';
import { forkJoin } from 'rxjs';
import { detailsAndDescription } from '../Models/DetailsAndDescription';

//import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-info-vila',
  templateUrl: './info-vila.component.html',
  styleUrls: ['./info-vila.component.css']
})
export class InfoVilaComponent implements OnInit{



  


//מערכים שמחזיקים את הפרטים מכל הטבלאות
  detailes:villaDetails[]=[]
  description:villaDescription[]=[]
  checkList:checkListVila[]=[]

  detailOneVila!: detailsAndDescription| undefined; // Contains all the details of the villa


  vilaId! : number ;
  imageUrls: string[] = [];
  selectedFiles:File[]=[];
  fileInputs: number[] = [];
  images: { url: string }[] = [];
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _userServic:UsersService, private http:HttpClient, private _DataVillasService:DataVillasService) {
   
  }
  currentImageIndex: number = 0;

  get currentImageUrl(): string {
    return this.imageUrls[this.currentImageIndex];
  }

  nextImage() {
    if (this.currentImageIndex < this.imageUrls.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }


// get vila by villaId from detailsAndDescription, and serv in detailOneVila 
findVillaById(vilaId: number): void {
  const foundVilla = this.detailes.find((villa) => villa.vilaId === vilaId);

  if (foundVilla) {
    const foundVillaDescription = this.description.find((desc) => desc.vilaId === vilaId);
    const foundCheckListVila = this.checkList.find((checkList) => checkList.vilaId === vilaId);

    this.detailOneVila = {
      villaDetails: foundVilla,
      villaDescription: foundVillaDescription || new villaDescription(), // Handle if not found
      checkListVila: foundCheckListVila || new checkListVila(), // Handle if not found
    };

    // Do something with the found villa (e.g., log its details)
    console.log("Found Villa:", this.detailOneVila);
  } else {
    console.log(`Villa with ID ${vilaId} not found.`);
  }
}


// Returns an array of the items marked true in the checklistVila table
getAmenities(): string[] {
  const amenities: string[] = [];
  const checkListVila = this.detailOneVila?.checkListVila;

  if (checkListVila) {
    for (const [key, value] of Object.entries(checkListVila)) {
      if (value === true) {
        amenities.push(key);
      }
    }
  }
  return amenities;
}


  
  
  
 
  ngOnInit(): void {
    
  

    //Gets a villa number and presents it
    this.route.params.subscribe(params => {
      this.vilaId = +params['id'];  
    });

    





    // Displaying a photo gallery of the villa
    this.http.get<string[]>(`https://localhost:44308/api/Users/getImages/${this.vilaId}`)
    .subscribe(
      (data: string[]) => {
        this.imageUrls = data.map(image => `data:image/jpeg;base64,${image}`);
      },
      (error) => console.error(error)
    );


   


    
  // List of all villas
  this._DataVillasService.getListvillaDetails().subscribe(res=>{
    this.detailes = res;
   console.log("detailes: ",this.detailes);
   this.findVillaById(this.vilaId);
  });
  this._DataVillasService.getListVillasDesctiption().subscribe(res=>{
    this.description = res;
    this.findVillaById(this.vilaId);
 //   console.log("description: ",this.description);
  });
  this._DataVillasService.getListVillasCheckList().subscribe(res=>{
    this.checkList = res;
    this.findVillaById(this.vilaId);
    this.getAmenities() 
  });



 
   

    

  }// end ngOnInit()

 
  


}
