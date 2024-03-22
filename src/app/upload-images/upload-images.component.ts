import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}
  ngOnInit():void{
  }
  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type == 'image/png' || file.type == 'image/jpeg') {
        const formData = new FormData();
        formData.append('file', file);
        this.http.post('/images/', formData).subscribe((res: any) => {
          console.log(res); // For debugging purposes
        });
      } else {
        alert('Please select only jpeg and png');
      }
    }
  }
}
