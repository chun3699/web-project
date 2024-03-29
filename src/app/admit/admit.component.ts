import { Component, SimpleChange  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from '../services/api/service.service';
import axios from "axios";
import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { image } from '../../model/image';
import { getImage } from '../../model/getImage';


@Component({
  selector: 'app-admit',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
  ],
  templateUrl: './admit.component.html',
  styleUrl: './admit.component.scss'
})
export class AdmitComponent {
  getRank : getImage [] = []; 
  constructor(private http: HttpClient,private service: ServiceService ) {
    
  }
  async ngOnInit(){
    this.getRank = await this.service.appearRank();
    console.log(this.getRank);
    console.log('Call Completed');
    console.log('time ' + new Date());
  } 
}
