import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class summaryComponent {
  breadCrumbItems = [{label:'My Dashboard',href:'/dashboard'},{ label: 'Events', href:'/events'},{ label: 'Event Details', active: true }];
  id=''; details;
  payenabled=false;
  amount=100;
  tid='';
  state=''
  constructor(public route: ActivatedRoute, public authfackService:AuthfakeauthenticationService) {
    this.route.parent.params.subscribe(params => {
      this.id= params["id"];
     });  
    this.state=this.route.snapshot.url[2]?this.route.snapshot.url[2].path:''
     this.route.params.subscribe(params => {
      this.tid=params['tid'];
      console.log(this.tid)
     });  
    this.getDetails();
  }
  getDetails(){
    this.authfackService.get("events/details?event_id="+this.id).subscribe(res=>{
      if(res['status']){
        this.details=res['data'];
      }
    })
  }
  neutralize(details){
    this.payenabled=true
  //   Swal.fire({
  //     title: 'Are you sure to Neutralize?',
  //     text: "You need to pay 100 AED to neutralize the carbon emission",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#34c38f',
  //     cancelButtonColor: '#f46a6a',
  //     confirmButtonText: 'Pay Now'
  //   }).then(result => {
  //     if (result.value) {
  //       let modalRef=this.modalService.open(PaymentComponent, { size: 'lg', windowClass: 'modal-holder', centered: true });
    // modalRef.componentInstance.title ='Add'
    // modalRef.componentInstance.passEntry.subscribe(() => {
    //   this._fetchData()
    // })
              // Swal.fire('Congrats!', 'Event neutralized successfully.', 'success');
            // }
  //   })
  }

  finalize(details){
    Swal.fire({
      title: 'Are you sure to finalize?',
      text: "You won't be able to edit any values again!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, finalize it!'
    }).then(result => {
      if (result.value) {
        this.authfackService.put('events/state?event_state=1&event_id=' + details.id,{}).subscribe(
          res => {
            if (res['status'] == true) {
              Swal.fire('Congrats!', 'Event finalyzed successfully.', 'success');
              this.getDetails();
            }
          });
      }
    })
  }
}
