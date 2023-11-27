import { Component,ViewChild, NgModule } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @ViewChild('roomCountMenu') roomCountMenu!: MatMenuTrigger;

  openDropdown(event: Event) {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    this.roomCountMenu.openMenu();
  }

  selectRoomCount(roomCount: string) {
    // Handle the selected room count here, e.g., set it as the input's value
    const inputField = document.querySelector('.form-control') as HTMLInputElement;
    inputField.value = roomCount;
    this.roomCountMenu.closeMenu();
  }

  showAlertDialog: boolean = false;


  // not use
  openAlertDialog() {
    this.showAlertDialog = true;
  }

  

}
