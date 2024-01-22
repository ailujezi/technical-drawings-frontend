import { Component, Output, EventEmitter } from '@angular/core';

import {MatIconModule} from '@angular/material/icon'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatGridListModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() isMenuOpen = new EventEmitter<boolean>();

  isMenuOpenValue: boolean = true;

  toggleMenu() {
    this.isMenuOpenValue = !this.isMenuOpenValue;
    this.isMenuOpen.emit(this.isMenuOpenValue);
  }
}
