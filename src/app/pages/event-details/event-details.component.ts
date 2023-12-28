import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import Swal from 'sweetalert2';
import { EventFormComponent } from '../events/event-form/event-form.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  breadCrumbItems = [{label:'My Dashboard',href:'/dashboard'},{ label: 'Events', href:'/events'},{ label: 'Event Details', active: true }];
  id=''; details;
  payenabled=false;
  constructor(private modalService: NgbModal, public route: ActivatedRoute, public authfackService:AuthfakeauthenticationService, private router: Router) {
    this.route.params.subscribe(params => {
      this.id= params["id"];
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

  editModal( ) {
    let modalRef=this.modalService.open(EventFormComponent, { size: 'lg', windowClass: 'modal-holder', centered: true });
    modalRef.componentInstance.title ='Edit'
    modalRef.componentInstance.data =this.details
    modalRef.componentInstance.passEntry.subscribe(() => {
      this.getDetails();
      
    })
 
  }

  deleteRow(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.authfackService.delete('events?event_id=' + item.id).subscribe(
          res => {
            if (res['status'] == true) {
              Swal.fire('Deleted!', 'Selected Event has been deleted.', 'success');
              this.router.navigate(['/events']);
            }
          });
      }
    });
  }
}
