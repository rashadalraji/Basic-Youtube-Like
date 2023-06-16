import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: any;
  public startedPlay: boolean = false;
  public show: boolean = false;

  constructor(private commonService: CommonService) {

  }

  videoList: any

  ngOnInit() {
    this.getVideList()
    
  }

  getVideList(){
    this.commonService.getVideoList().subscribe((res: any) => {
      if (res) {
        this.videoList = res;
      }
    })
  }


  pauseVideo(videoplayer: any) {
    videoplayer.nativeElement.play();
    // this.startedPlay = true;
    // if(this.startedPlay == true)
    // {
    setTimeout(() => {
      videoplayer.nativeElement.pause();
      if (videoplayer.nativeElement.paused) {
        this.show = !this.show;
      }
    }, 5000);
    // }
  }

  closebutton(videoplayer: any) {
    this.show = !this.show;
    videoplayer.nativeElement.play();
  }

  search : any = '';
  onClickSearchBtn() {
    if (this.search) {
      this.videoList = this.videoList.filter((el: any) => el.title.toLowerCase().includes(this.search.toLowerCase()))
    } else {
      this.getVideList()
    }
  }

}
