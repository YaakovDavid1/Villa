import { Component, OnInit, Optional } from '@angular/core';
import { UsersService } from '../Services/Users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { villaDetails } from '../Models/VillaDetails';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { user } from '../Models/Users';
import { detailsAndDescription } from '../Models/DetailsAndDescription';
import { villaDescription } from '../Models/VillaDescription';
import { checkListVila } from '../Models/CheckListVila';
import { Observable } from 'rxjs';
import { VilaPhoto } from '../Models/VilaPhoto';





@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})

export class PersonalAreaComponent implements OnInit {
constructor(private _userService:UsersService, private fb: FormBuilder, private http:HttpClient){
}


// משתנים לעדכון וקבלת תמונות
  vilaId : number =3;
  imageUrls: string[] = [];
  selectedFiles:File[]=[];
  fileInputs: number[] = [];
  images1: { url: string }[] = [];







public users: any = []; 
public fullName : string = "";
public role! : string;

public userData!: user;
public listVilaByUserID: villaDetails[] =[];


public detailsAndDescription!: FormGroup;
public vilaDetails!: FormGroup;
public vilaDescription!: FormGroup;
public checkListVila!: FormGroup;
public testForm!: FormGroup;



formData: detailsAndDescription = {
  villaDetails: new villaDetails(),
  villaDescription: new villaDescription(),
  checkListVila: new checkListVila(),
 // imageForm:new VilaPhoto(),
};


public payload:any;


ngOnInit(){

//בדיקות שלי להצגת פרטים אישיים בעזרת טוקן
const token = localStorage.getItem('token');
  

if (token) {
  // מחזיר את המשתמש לפי אימייל
  this.payload = JSON.parse(atob(token.split('.')[1]));  
  this.payload.certserialnumber = +this.payload.certserialnumber; // convert string to number

  this.http.get("https://localhost:44308/api/Users/userID/"+this.payload.email).subscribe((data: any) => {
    this.userData = data;
    console.log('User Data from SQL Server:', this.userData); 
  });   
  
  // נטען בעת עליית הדף, מספר מזהה של היוזר נשלח לסרבר ומחזיר לנו ליסט של כל הוילות שלו
  this.http.get<villaDetails[]>("https://localhost:44308/api/Users/listVilasByUserID/"+this.payload.certserialnumber).subscribe(
    (data: villaDetails[]) =>{
      this.listVilaByUserID = data;
      console.log('Fetched listVilaByUserID:', this.listVilaByUserID);
  }); 
  
}





  this.vilaDetails = this.fb.group({
    nameVila: ['', Validators.required],
    location: ['', Validators.required],
    numBedroom: ['', Validators.required],
    numBathroom: ['', Validators.required],
    numShower: ['', Validators.required],
    description: [''],
    userID: [this.payload.certserialnumber],
  });

  this.vilaDescription = this.fb.group({
    outDescription: ['', Validators.required],
    inDescription: ['', Validators.required],
    audience: ['', Validators.required],
    importantInfo: ['', Validators.required],
  });
  

  this.checkListVila = this.fb.group({
    hairDryer: [false],
    cleaningProducts: [false],
    shampoo: [false],
    conditioner: [false],
    bodySoap: [false],
    showerGel: [false],
    washingMachine: [false],
    clothesDdryer: [false],
    towels: [false],
    bedLinen: [false],
    soap: [false],
    toiletPaper: [false],
    hangers: [false],
    iron: [false],
    clothingStorage: [false],
    crib: [false],
    childrensBooks: [false],
    wifi: [false],
    terrace: [false],
    pool: [false],
    heatedPool: [false],
    poolTable: [false],
    barbecue: [false],
    refrigerator: [false],
    microwave: [false],
    cookingBasics: [false],
    freezer: [false],
    wineGlasses: [false],
    coffeeMachine: [false],
  });





// get all users: for test
/*
  this._userService.getUsers().subscribe(res=>{
    this.users = res;
  });
*/


// version need to check
  this._userService.getFullNameFromStore()
  .subscribe(val=>{
    const fullNameFromToken = this._userService.getFullNameFromToken();
    this.fullName = val || fullNameFromToken
  })

  this._userService.getRoleFromStore()
  .subscribe(val=>{
    const roleeFromToken = this._userService.getRoleFromToken();
    this.role = val || roleeFromToken
  })
  
  





  } // ngOnInit() : the end

  
// Releases the token
logout(){
  this._userService.signOut();
}



// Area for filling in details about the villa
currentStep = 1;

  changeStep(step: number): void {
    this.currentStep = step;
  }

  // not use for now
  getStepName(step: number): string {
    switch (step) {
      case 1:
        return 'User Information';
      case 2:
        return 'Villa Information';
      case 3:
        return 'Photo Upload';
      case 4:
        return 'Amenities Selection';
      default:
        return 'Unknown Step';
    }
  }

  nextStep(step: number): void {
    this.currentStep = step;
  }
  previousStep(step: number): void {
    this.currentStep = step;
  }

  // Sending a new villa to the server and adding it to the database
  submitForm(){
    if (this.vilaDetails.valid && this.vilaDescription.valid) {
      const detailsFormData = this.vilaDetails.value;
      const descriptionFormData = this.vilaDescription.value;
      const checkListFormData = this.checkListVila.value;
      this.formData.villaDetails = { ...detailsFormData };
      this.formData.villaDescription = { ...descriptionFormData };
      this.formData.checkListVila = { ...checkListFormData}     
      this.http.post("https://localhost:44308/api/Users/VillaDetailsAndDescriptionDTO", this.formData)
        .subscribe({
          next: (res: any) => {
            alert(res.message);
          },
          error:(err)=>{
            alert(err?.error.message);
          }     
    })
  }else{
    alert('Form is not valid.');
  }


    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
      }

      this.http.post("https://localhost:44308/api/Users/addImagesssss", formData)
        .subscribe(res => {
          console.log(res);
        });
    } else {
      console.error("No files selected");
    }
}

 
  


  
  
  




email: string = "";
villaDetails: villaDetails[] = [];
getDetailUser() {
  this._userService.getListOfVilaByEmailUser(this.email).subscribe(
    (res: string[]) => {
      // Assuming the response is an array of nameVila
      this.villaDetails = res.map(nameVila => ({ nameVila }) as villaDetails);
      console.log(this.villaDetails);
    },
    error => {
      console.error(error);
    }
  );
}

showVillaForm = false;

toggleVillaForm() {
  // Toggle the showVillaForm flag to show/hide the form
  this.showVillaForm = !this.showVillaForm;
}




//  Photo upload area
onFileSelected1(event: any, index: number) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    this.images1[index] = { url: URL.createObjectURL(selectedFile) };
    this.selectedFiles[index] = selectedFile;
  }
  console.log("selectedFiles: ", this.selectedFiles)
}

addFileInput() {
  this.fileInputs.push(this.fileInputs.length);
}


onUpload() {
  if (this.selectedFiles.length > 0) {
    const formData = new FormData();
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    this.http.post("https://localhost:44308/api/Users/addImagesssss", formData)
      .subscribe(res => {
        console.log(res);
      });
  } else {
    console.error("No files selected");
  }
}





} // end class
