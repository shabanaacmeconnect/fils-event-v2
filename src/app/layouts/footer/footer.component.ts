import { Component, OnInit } from '@angular/core';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

/**
 * Footer component
 */
export class FooterComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  footer=''
  constructor( private authFackservice:AuthfakeauthenticationService) { }

  ngOnInit() {
    this.getsystemSettings()
  }
  getsystemSettings(){
    this.authFackservice.get('/systemSettings').subscribe(res=>{
      this.footer=res['data']['footer_text']
    })
  }
  

}
