import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/model_uid';
import { ServiceService } from '../services/api/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = '';
  pass = '';
  uuser: User[] = []; 

  constructor(private service: ServiceService,private router: Router) {}

  async login(user: string, pass: string):Promise<void>  {
    // ทำสิ่งที่คุณต้องการทำหลังจากการเข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน
    console.log('Username:', user);
    console.log('Password:', pass);

    this.uuser = await this.service.login(user, pass);
      if(this.uuser.length > 0){
        console.log("name: " + this.uuser[0].name);
        // this.service.uuser = this.uuser;
        this.service.setUserCredentials(user, pass);
        if(this.uuser[0].status === 'admin'){
          //ไปหน้าadmit
          this.router.navigate(['/admit']);
        }else{
        //ไปหน้า vote
        this.router.navigate(['/vote']);
        }

      }else{console.log("error");
      alert("ไม่พบข้อมูลผู้ใช้");
      }
                
  }
}
