import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';
import { NgbdSortableHeader } from '../table-sortable';

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1: number | string, v2: number | string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string | null;
  direction: SortDirection;
}
@Component({
  selector: 'app-power-consumption',
  templateUrl: './power-consumption.component.html',
  styleUrls: ['./power-consumption.component.scss']
})
export class PowerConsumptionComponent {
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;
  typeValidationForm1: FormGroup; // type validation form
  typesubmit1: boolean = false;
  event_id = '';



  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, public notificationService: notificationService,
    public authFackservice: AuthfakeauthenticationService, public formBuilder: FormBuilder) { }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', link: '/dashboard' }, { label: 'Event', link: '/events' }, { label: 'Power Consumption', active: true }];
    // this.event_id = this.activatedRouter.snapshot.params['id'] ? this.activatedRouter.snapshot.params['id'] : '';
   
    this.route.parent.params.subscribe(params => {
      this.event_id= params["id"];
     });   this.initForm();
    this.getDetails();
  }
  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      electricity_consumption_count: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      gas_consumption_count: ['', [Validators.required]],
      water_consumption_count: ['', Validators.required],
      event_id: 0,
    });


  }

  get f() {
    return this.typeValidationForm.controls;
  }

  getDetails() {
    console.log("hcfhaegvjd", this.event_id)
    this.authFackservice.get('events/section3details?event_id=' + this.event_id).subscribe(
      res => {
        if (res['status'] == true) {
          if (res['data'].length != 0) {
            let item = res['data'];
            this.typeValidationForm.patchValue({
              electricity_consumption_count: item.electricity_consumption_count,
              gas_consumption_count: item.gas_consumption_count,
              water_consumption_count: item.water_consumption_count,
              event_id: item.id,
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
    formData.append("electricity_consumption_count", this.typeValidationForm.value.electricity_consumption_count);
    formData.append("gas_consumption_count", this.typeValidationForm.value.gas_consumption_count);
    formData.append("water_consumption_count", this.typeValidationForm.value.water_consumption_count);
    formData.append("event_id", this.event_id);

    this.authFackservice.putMultipart('events/section3', formData).subscribe(
      res => {
        if (res['status'] == true) {
          Swal.fire('Success!', 'section1 have been updated.', 'success');

        } else {
          Swal.fire('Error!', res['message'], 'error');

        }
        this.modalService.dismissAll()
      });

  }
}
