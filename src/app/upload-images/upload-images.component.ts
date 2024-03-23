import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from '../services/api/service.service';
import axios from "axios";

const HOST: string = "http://localhost:3000";

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    HttpClientModule 
    ],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {
  imageUrl: string | null = null;
  isFirstUpload: boolean = true;
  constructor(private http: HttpClient,private service: ServiceService ) {}
  ngOnInit():void{
  }
  async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
  async onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type == 'image/png' || file.type == 'image/jpeg') {
        const formData = new FormData();
        formData.append('image', file);
        const url = `${HOST}/images/`;
        console.log(url)
        try {
          // ตรวจสอบว่าเป็นการส่งข้อมูลครั้งแรกหรือไม่
          if (!this.isFirstUpload) {
            // ล่าช้าการส่งข้อมูลถัดไป 5 วินาที (5000 milliseconds)
            alert('Data sent after 5 seconds delay');
            await this.delay(5000);
          }
          const response = await axios.post(url, formData);
          
          console.log('Success:', response.data); // Log the response data if needed
         
          //ออกมาเป็น array
          console.log(JSON.parse(JSON.stringify(response.data)));

          const imgArray = response.data.img; // ดึง array ของ URL จาก response.data
          console.log(imgArray);
          const imageUrl = imgArray[0];

           // Set imageUrl to display the uploaded image
          this.imageUrl = response.data.imageUrl;
          this.isFirstUpload = false;

           //UploadImage in to Mysql
           const body = {
              img: imageUrl,
              uid: 1
           };
           console.log(body);

          //  const upImageMysql = await this.service.getUploadImega(body);

        } catch (error) {
          console.error('Error:', error);
        }
    } else {
      alert('Please select only jpeg and png');
    }
      
        
    
    }
  }
}
