import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private commonService : CommonService){

  }

  videoList : any[] =[]

  ngOnInit(){
    console.log('inIt')
    this.commonService.getVideoList().subscribe((res:any)=>{
      if(res){
        this.videoList = res;
      }
    })
  }

  @ViewChild('videoPlayer') videoplayer: any;
public startedPlay:boolean = false;
public show:boolean = false;
pauseVideo(videoplayer:any)
{
  videoplayer.nativeElement.play();
  // this.startedPlay = true;
  // if(this.startedPlay == true)
  // {
     setTimeout(() => 
     {
      videoplayer.nativeElement.pause();
       if(videoplayer.nativeElement.paused)
      {
        this.show = !this.show;       
      } 
     }, 5000);
  // }
}

closebutton(videoplayer:any){
  this.show = !this.show; 
  videoplayer.nativeElement.play();
}

}
