import { Component, SimpleChange  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from '../services/api/service.service';
import axios from "axios";
import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { image } from '../../model/image';
import { getImage } from '../../model/getImage';



@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {
  getRank : getImage [] = []; 
  Number = 1;

  constructor(private http: HttpClient,private service: ServiceService ) {
    
  }
  async ngOnInit(){
    this.getRank = await this.service.appearRank();
    console.log(this.getRank);
    console.log('Call Completed');
    console.log('time ' + new Date());
  }
  

  
  
}
