import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule,
      ButtonModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  ProfileImage(){
    console.log("ทำอยู่นะ");
  }
}
