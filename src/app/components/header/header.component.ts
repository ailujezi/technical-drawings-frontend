import { Component } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatGridListModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
