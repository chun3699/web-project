import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ServiceService } from '../services/api/service.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private service: ServiceService) {}
}
