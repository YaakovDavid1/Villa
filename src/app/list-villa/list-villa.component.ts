import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-villa',
  templateUrl: './list-villa.component.html',
  styleUrls: ['./list-villa.component.css']
})
export class ListVillaComponent {
  @Input() villas!: any[];
}
