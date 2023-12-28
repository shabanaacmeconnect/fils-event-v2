import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1: number | string, v2: number | string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string | null;
  direction: SortDirection;
}
@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss']
})
export class FoodDetailsComponent {
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;
  typeValidationForm1: FormGroup; // type validation form
  typesubmit1: boolean = false;
  event_id = '';



  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, public notificationService: notificationService,
    public authFackservice: AuthfakeauthenticationService, public formBuilder: FormBuilder) { }
  ngOnInit() {
      this.breadCrumbItems = [{ label: 'Dashboard', link: '/dashboard' }, { label: 'Event', link: '/events' }, { label: 'Food Details', active: true }];
      this.route.parent.params.subscribe(params => {
       this.event_id= params["id"];
      });  
      //  this.event_id = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : '';
    this.initForm();
    this.getDetails();
    this.eventDetails()

  }
  details;
  eventDetails() {
  this.authFackservice.get("events/details?event_id="+this.event_id).subscribe(res=>{
    if(res['status']){
      this.details=res['data'];
    }
  })
}  
addItem(event){
  this.eventDetails();
}
  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      total_food_weight: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      total_food_truck_count: ['', [Validators.required]],
      food_sources: ['', Validators.required],
      food_waste_perc: [0, [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      food_dispose_method: ['', [Validators.required]],
      event_id: 0,
    });


  }

  get f() {
    return this.typeValidationForm.controls;
  }

  getDetails() {
    this.authFackservice.get('events/section2details?event_id=' + this.event_id).subscribe(
      res => {
        if (res['status'] == true) {
          if (res['data'].length != 0) {
            let item = res['data'];
            this.typeValidationForm.patchValue({
              total_food_weight: item.total_food_weight,
              total_food_truck_count: item.total_food_truck_count,
              food_sources: item.food_sources,
              food_waste_perc: item.food_waste_perc,
              food_dispose_method: item.food_dispose_method,
              event_id: item.event_id,
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
    formData.append("total_food_weight", this.typeValidationForm.value.total_food_weight);
    formData.append("total_food_truck_count", this.typeValidationForm.value.total_food_truck_count);
    formData.append("food_sources", this.typeValidationForm.value.food_sources);
    formData.append("food_waste_perc", this.typeValidationForm.value.food_waste_perc);
    formData.append("food_dispose_method", this.typeValidationForm.value.food_dispose_method);
    formData.append("event_id", this.event_id);

    this.authFackservice.putMultipart('events/section2', formData).subscribe(
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
