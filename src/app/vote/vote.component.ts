import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceService } from '../services/api/service.service';
import { getImage } from '../../model/getImage';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
  
  ],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent {
  
  imgvote: getImage[] = []; //ภาพที่ชนะ[0] แพ้[1]
  images: getImage[] = []; 
  selectedImages: getImage[] = [];

  constructor(private service: ServiceService) {}

  async ngOnInit(){
    this.images = await this.service.allimg();
    this.selectRandomImages();
  }

  selectRandomImages() {
    const index1 = Math.floor(Math.random() * this.images.length);
    let index2 = Math.floor(Math.random() * this.images.length);
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * this.images.length);
    }
    this.selectedImages = [this.images[index1], this.images[index2]];
  }

  calculateEloScore(scoreA: number, scoreB: number): number {
    const K = 32; // ค่าคงที่ K สำหรับ Elo Rating Algorithm
    const E = 1 / (1 + Math.pow(10, (scoreB - scoreA) / 400)); // คำนวณค่าคาดการณ์ความน่าจะเป็นของการชนะ
    const S = 1; // ในกรณีนี้ สมมติว่าผู้ใช้โหวตภาพที่แสดงออกมาคือภาพที่ 1
    let newScore = scoreA + K * (S - E); // คำนวณคะแนนใหม่
    if (newScore < 0) {
        newScore = 0; // ตรวจสอบและกำหนดให้คะแนนใหม่ไม่ต่ำกว่า 0
    }
    return Math.round(newScore); // คืนค่าคะแนนใหม่เป็นจำนวนเต็ม
  }

  vote(index: number): void {
    this.imgvote = [];

    if (this.selectedImages[0].did === index) {
      // ถ้ารูปภาพที่โหวตเป็นรูปภาพที่ 1
      this.imgvote.push(this.selectedImages[0]);
      this.imgvote.push(this.selectedImages[1]);
      
  } else if (this.selectedImages[1].did === index) {
      // ถ้ารูปภาพที่โหวตเป็นรูปภาพที่ 2
      this.imgvote.push(this.selectedImages[1]);
      this.imgvote.push(this.selectedImages[0]);
  }else{
    console.log("error");
  }

    
  //   if (this.votedIndices.length >= 2) {
  //       // คำนวณคะแนนโดยใช้ Elo Rating Algorithm
  //       const image1Score = this.calculateEloScore(this.imageScores[0], this.imageScores[1]);
  //       const image2Score = this.calculateEloScore(this.imageScores[1], this.imageScores[0]);

  //       // แสดงผลลัพธ์บนหน้าจอ
  //       console.log('คะแนนภาพที่ 1:', image1Score);
  //       console.log('คะแนนภาพที่ 2:', image2Score);

  //       // ล้างรายการโหวต
       
        
  //   }
  }
}
