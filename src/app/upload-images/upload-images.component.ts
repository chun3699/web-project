import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}
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
          // Set imageUrl to display the uploaded image
          this.imageUrl = response.data.imageUrl;

          this.isFirstUpload = false;
          // await this.delay(10000);
          // console.log('10 seconds ' + new Date());
        
        } catch (error) {
          console.error('Error:', error);
        }
    } else {
      alert('Please select only jpeg and png');
    }
      
        
    
    }
  }
}
