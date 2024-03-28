import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ServiceService } from '../services/api/service.service';
import { User } from '../../model/model_uid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatToolbarModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  uuser: User[] = [];

  constructor(private service: ServiceService) {}


  async ngOnInit(){
    const user = this.service.getUserCredentials();
    if (user) {
      this.uuser = await this.service.login(user.username, user.password);

    } else {
      // ไม่พบข้อมูล user และ password ใน sessionStorage
    }
  }

  logout(){
    this.service.clearUserCredentials();
    window.location.reload();
  }
  
}
