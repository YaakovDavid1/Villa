import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { UsersService } from '../Services/Users/users.service';
import { DataVillasService } from '../Services/data-villas.service';
import { villaDetails } from '../Models/VillaDetails';

@Component({
  selector: 'app-card-villa',
  templateUrl: './card-villa.component.html',
  styleUrls: ['./card-villa.component.css']
})
export class CardVillaComponent {
  constructor(private _service:UsersService, private _DataVillasService:DataVillasService){}
  detailes:villaDetails[]=[]
  @Input() villa: any;
  @Input() image!: string;
  @Output() viewDetailsClicked: EventEmitter<number> = new EventEmitter<number>();

  viewDetails(id: number) {
    this.viewDetailsClicked.emit(id);
  }

  ngOnInit(): void {
    this._DataVillasService.getListvillaDetails().subscribe(res=>{
      this.detailes = res;
   //   console.log("detailes from card: ",this.detailes);
    });


  }






  
}
