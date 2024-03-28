import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ServiceService } from '../services/api/service.service';
import { HttpClient } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatIconModule,
    MatInputModule,
    FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  name='';
  username='';
  password='';
  constructor(private http: HttpClient,private service: ServiceService ) {}
  async btnCrateUid(){
    const body = {
      username: this.username,
      password: this.password,
      name:     this.name
   };
   console.log(body);
   const Crate_uid = await this.service.CrateUid(body);
   console.log(Crate_uid);
  }
}
