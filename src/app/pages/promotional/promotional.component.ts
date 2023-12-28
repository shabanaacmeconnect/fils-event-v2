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
  selector: 'app-promotional',
  templateUrl: './promotional.component.html',
  styleUrls: ['./promotional.component.scss']
})
export class PromotionalComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;
  typeValidationForm1: FormGroup; // type validation form
  typesubmit1: boolean = false;
  event_id = '';
  types: any = [];
  typespaper: any = [];
  typesplastic: any = [];
  typeswood: any = [];
  path=''
  constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal, public notificationService: notificationService,
    public authFackservice: AuthfakeauthenticationService, public formBuilder: FormBuilder) { }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboard', link: '/dashboard' }, { label: 'Event', link: '/events' }, { label: 'Promotional Materials Details', active: true }];
    // this.event_id = this.activatedRouter.snapshot.params['id'] ? this.activatedRouter.snapshot.params['id'] : '';
   this.route.url.subscribe(x=>{
    this.path=this.route.snapshot.routeConfig.path
    
   })
    this.route.parent.params.subscribe(params => {
      this.event_id= params["id"];
     });  
    this.initForm();
    this.getDetails();
    this.type();
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
  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      event_id: 0,
      clothing_item_type: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      total_clothing_weight: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      plastic_item_type: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      total_plastic_weight: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      paper_item_type: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      total_paper_weight: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      wood_item_type: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      total_wood_weight: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      mkt_paper_details: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      mkt_paper_qty: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      mkt_cardboard_details: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      mkt_cardboard_qty: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      mkt_paper_billboard: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      mkt_paper_billboard_qty: ['', [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_tshirt_count: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_shirt_count: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_jacket_count: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_jumper_count: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_trouser_count: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_shoe_count: [0, [ Validators.maxLength(60), Validators.minLength(1),]],

      clothing_tshirt_weight: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_shirt_weight: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_jacket_weight: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_jumper_weight: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_trouser_weight: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
      clothing_shoe_weight: [0, [ Validators.maxLength(60), Validators.minLength(1),]],
    });


  }

  get f() {
    return this.typeValidationForm.controls;
  }
  public type() {

    let url = 'events/promotional_materials';
    this.authFackservice.get(url).subscribe(
      res => {
        if (res['status'] == true) {
          this.types = res['data']['clothingitem'];
          this.typespaper = res['data']['paperitem'];
          this.typesplastic = res['data']['plasticitem'];
          this.typeswood = res['data']['wooditem'];

        }
      });
   
  }
  getDetails() {
    this.authFackservice.get('events/section4details?event_id=' + this.event_id).subscribe(
      res => {
        if (res['status'] == true) {
          if (res['data'].length != 0) {
            let item = res['data'];
            this.typeValidationForm.patchValue({
              event_id: item.event_id,
              clothing_item_type: item.clothing_item_type?Number(item.clothing_item_type):0,
              total_clothing_weight: item.total_clothing_weight,
              plastic_item_type: item.plastic_item_type?Number(item.plastic_item_type):0,
              total_plastic_weight: item.total_plastic_weight,
              paper_item_type:item.paper_item_type? Number(item.paper_item_type):0,
              total_paper_weight: item.total_paper_weight,
              wood_item_type: item.wood_item_type?Number(item.wood_item_type):0,
              total_wood_weight: item.total_wood_weight,
              mkt_paper_details: item.mkt_paper_details,
              mkt_paper_qty: item.mkt_paper_qty,
              mkt_cardboard_details: item.mkt_cardboard_details,
              mkt_cardboard_qty: item.mkt_cardboard_qty,
              mkt_paper_billboard: item.mkt_paper_billboard,
              mkt_paper_billboard_qty: item.mkt_paper_billboard_qty,
              clothing_tshirt_count: item.clothing_tshirt_count,
              clothing_shirt_count: item.clothing_shirt_count,
              clothing_jacket_count: item.clothing_jacket_count,
              clothing_jumper_count: item.clothing_jumper_count,
              clothing_trouser_count: item.clothing_trouser_count,
              clothing_shoe_count: item.clothing_shoe_count,
              clothing_tshirt_weight: item.clothing_tshirt_weight,
              clothing_shirt_weight: item.clothing_shirt_weight,
              clothing_jacket_weight: item.clothing_jacket_weight,
              clothing_jumper_weight: item.clothing_jumper_weight,
              clothing_trouser_weight: item.clothing_trouser_weight,
              clothing_shoe_weight: item.clothing_shoe_weight,
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
    let url=''
    if(this.path=='gifting'){
      formData.append("clothing_item_type", this.typeValidationForm.value.clothing_item_type);
      formData.append("total_clothing_weight", this.typeValidationForm.value.total_clothing_weight);
      formData.append("plastic_item_type", this.typeValidationForm.value.plastic_item_type);
      formData.append("total_plastic_weight", this.typeValidationForm.value.total_plastic_weight);
      formData.append("paper_item_type", this.typeValidationForm.value.paper_item_type);
      formData.append("total_paper_weight", this.typeValidationForm.value.total_paper_weight);
      formData.append("wood_item_type", this.typeValidationForm.value.wood_item_type);
      formData.append("total_wood_weight", this.typeValidationForm.value.total_wood_weight);
      url='gifting'
    }
   if(this.path=='marketing'){
    formData.append("mkt_paper_details", this.typeValidationForm.value.mkt_paper_details);
    formData.append("mkt_paper_qty", this.typeValidationForm.value.mkt_paper_qty);
    formData.append("mkt_cardboard_details", this.typeValidationForm.value.mkt_cardboard_details);
    formData.append("mkt_cardboard_qty", this.typeValidationForm.value.mkt_cardboard_qty);
    formData.append("mkt_paper_billboard", this.typeValidationForm.value.mkt_paper_billboard);
    formData.append("mkt_paper_billboard_qty", this.typeValidationForm.value.mkt_paper_billboard_qty);
    url='marketing'
   }
   if(this.path=='clothing'){
    formData.append("clothing_tshirt_count", this.typeValidationForm.value.clothing_tshirt_count);
    formData.append("clothing_shirt_count", this.typeValidationForm.value.clothing_shirt_count);
    formData.append("clothing_jacket_count", this.typeValidationForm.value.clothing_jacket_count);
    formData.append("clothing_jumper_count", this.typeValidationForm.value.clothing_jumper_count);
    formData.append("clothing_trouser_count", this.typeValidationForm.value.clothing_trouser_count);
    formData.append("clothing_shoe_count", this.typeValidationForm.value.clothing_shoe_count);
    formData.append("clothing_tshirt_weight", this.typeValidationForm.value.clothing_tshirt_weight);
    formData.append("clothing_shirt_weight", this.typeValidationForm.value.clothing_shirt_weight);
    formData.append("clothing_jacket_weight", this.typeValidationForm.value.clothing_jacket_weight);
    formData.append("clothing_jumper_weight", this.typeValidationForm.value.clothing_jumper_weight);
    formData.append("clothing_trouser_weight", this.typeValidationForm.value.clothing_trouser_weight);
    formData.append("clothing_shoe_weight", this.typeValidationForm.value.clothing_shoe_weight);
    url='clothing'
   }
   
    formData.append("event_id", this.event_id);

    this.authFackservice.putMultipart('events/section4/'+url, formData).subscribe(
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
  calculateweight(type){
    if(type=='t-shirt'){
      this.typeValidationForm.patchValue({
        clothing_tshirt_weight: this.typeValidationForm.value.clothing_tshirt_count?parseFloat(String((this.typeValidationForm.value.clothing_tshirt_count)*99/1000)).toFixed(1):0
      })
    }
    if(type=='shirt'){
      this.typeValidationForm.patchValue({
        clothing_shirt_weight: this.typeValidationForm.value.clothing_shirt_count?parseFloat(String((this.typeValidationForm.value.clothing_shirt_count)*150/1000)).toFixed(1):0
      })
    }
    if(type=='jacket'){
      this.typeValidationForm.patchValue({
        clothing_jacket_weight: this.typeValidationForm.value.clothing_jacket_count?parseFloat(String((this.typeValidationForm.value.clothing_jacket_count)*570/1000)).toFixed(1):0
      })
    }
    if(type=='jumber'){
      this.typeValidationForm.patchValue({
        clothing_jumper_weight: this.typeValidationForm.value.clothing_jumper_count?parseFloat(String((this.typeValidationForm.value.clothing_jumper_count)*301/1000)).toFixed(1):0
      })
    }   
    if(type=='trouser'){
      this.typeValidationForm.patchValue({
        clothing_trouser_weight: this.typeValidationForm.value.clothing_trouser_count?parseFloat(String((this.typeValidationForm.value.clothing_trouser_count)*273/1000)).toFixed(1):0
      })
    }
    if(type=='shoe'){
      this.typeValidationForm.patchValue({
        clothing_shoe_weight: this.typeValidationForm.value.clothing_shoe_count?parseFloat(String((this.typeValidationForm.value.clothing_shoe_count)*921/1000)).toFixed(1):0
      })
    }
  }
}
