import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';
import { NgbdSortableHeader } from '../table-sortable';

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1:number|string, v2:number|string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
column: string|null;
direction: SortDirection;
}
@Component({
  selector: 'app-stay',
  templateUrl: './stay.component.html',
  styleUrls: ['./stay.component.scss']
})
export class stayComponent {
 
  event_id='';
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  dataList:any=[];
 
  constructor( private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private route:ActivatedRoute,
  private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder) { }
  
  ngOnInit() {
   this.breadCrumbItems = [{label:'My Dashboard',href:'/dashboard'},{ label: 'stay', active: true }];
  //  this.event_id=this.activatedRouter.snapshot.params['id']?this.activatedRouter.snapshot.params['id']:'';

  this.route.parent.params.subscribe(params => {
    this.event_id= params["id"];
   });  
   this.initForm()
    this.getDetails();
  
    this.eventDetails()

  }
  // initForm(){
  //   this.typeValidationForm = this.formBuilder.group({
     
  //     id: 0,
  //     participant_count:['', [Validators.required]],
  //     kms_count:['', [Validators.required]],
  //     mode:['', [Validators.required]]
      
  //   });
  // }
  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      event_id: 0,
      num_hotel_stay_attendee: ['', [Validators.required]],
      num_hotel_stay_presenter: ['', [Validators.required]],
      num_hotel_stay_performer: ['', [Validators.required]],
    });
  

  }
 
  get f() {
    return this.typeValidationForm.controls;
  }
 
  details;
  eventDetails() {
  this.authFackservice.get("events/details?event_id="+this.event_id).subscribe(res=>{
    if(res['status']){
      this.details=res['data'];
    }
  })
}  
  getDetails() {
    console.log("hcfhaegvjd",this.event_id)
    this.authFackservice.get('events/section1Staydetails?event_id='+this.event_id).subscribe(
      res => {
        if (res['status'] == true) {
          if (res['data'].length != 0) {
            let item = res['data'];
            this.typeValidationForm.patchValue({
              event_id: item.event_id,
            
              num_hotel_stay_attendee: item.num_hotel_stay_attendee,
              num_hotel_stay_presenter: item.num_hotel_stay_presenter,
              num_hotel_stay_performer: item.num_hotel_stay_performer,
            });
          }

        }
      })

  }
 

  typeSubmit() {
    this.typesubmit = true;
    if (this.typeValidationForm.status == 'INVALID')
      return;

    var formData: any = new FormData();
  
    formData.append("num_hotel_stay_attendee", this.typeValidationForm.value.num_hotel_stay_attendee);
    formData.append("num_hotel_stay_presenter", this.typeValidationForm.value.num_hotel_stay_presenter);
    formData.append("num_hotel_stay_performer", this.typeValidationForm.value.num_hotel_stay_performer);
    formData.append("event_id", this.event_id);

    this.authFackservice.putMultipart('events/section1Stay', formData).subscribe(
      res => {
        if (res['status'] == true) {
          Swal.fire('Success!', 'details have been updated.', 'success');
          this.eventDetails()
        } else {
          Swal.fire('Error!', res['message'], 'error'); 

        }
        this.modalService.dismissAll()
      });

  }
 
}
