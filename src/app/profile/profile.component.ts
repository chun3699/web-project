import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from '../services/api/service.service';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '../../model/model_uid';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule,
      CommonModule,
      ButtonModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  showProfile: boolean = true;
  getUid : User [] = [];
  constructor(private http: HttpClient,private service: ServiceService ){}
  async ngOnInit(){
    this.getUid = await this.service.UserIsYou();
    console.log(this.getUid);
    console.log(this.getUid[0].profile);
    console.log('Call Completed');
  }
  ProfileImage(){
    console.log("ทำอยู่นะ");
  }
}
