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
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent {
  page={totalElements:0,pageNumber:1,size:10};
  sortBy='';
  order='';
  event_id='';
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  typeValidationForm1: FormGroup; // type validation form
  typesubmit1: boolean = false;
  dataList:any=[];
  hrefLink: any;
  blob: Blob;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>=Object.create(null);
  title='Add';
  Mode: any=[];
  keyword: string='';
  constructor( private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private route:ActivatedRoute,
  private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder) { }
  
  ngOnInit() {
   this.breadCrumbItems = [{label:'My Dashboard',href:'/dashboard'},{ label: 'participants', active: true }];
  //  this.event_id=this.activatedRouter.snapshot.params['id']?this.activatedRouter.snapshot.params['id']:'';

  this.route.parent.params.subscribe(params => {
    this.event_id= params["id"];
   });  
    this.initForm();
    this._fetchData();
    this.getDetails();
    this.modes();
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
      // pll_count: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // pll_kms: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // pll_mode: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptwc_count: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptwc_kms: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptwc_mode: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptfac_count: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptfac_kms: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptfac_mode: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptfacnt_count: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptfacnt_kms: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      // ptfacnt_mode: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      avg_dist_hotel_event_kms: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      avg_dist_hotel_event_mode: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      avg_num_Staff_event_each_day_count: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      avg_num_Staff_event_each_day_kms: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
        });
  

  }
  initForm2(){
    this.typeValidationForm1=this.formBuilder.group({
      participant_count: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      kms_count: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      mode: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      id:0,
    });
  }
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '') {
      this.order='';this.sortBy=''; this._fetchData();
    } else {
      this.order=direction;this.sortBy=column
      this._fetchData();
    }
  }  
  get f() {
    return this.typeValidationForm.controls;
  }
  get f1() {
    return this.typeValidationForm1.controls;
  }

  search(){  
    this.page.pageNumber=1
    this._fetchData()
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
    this.authFackservice.get('events/section1details?event_id='+this.event_id).subscribe(
      res => {
        if (res['status'] == true) {
          if (res['data'].length != 0) {
            let item = res['data'];
            this.typeValidationForm.patchValue({
              event_id: item.event_id,
              // pll_count: item.pll_count,
              // pll_kms: item.pll_kms,
              // pll_mode: item.pll_mode,
              // ptwc_count: item.ptwc_count,
              // ptwc_kms: item.ptwc_kms,
              // ptwc_mode: item.ptwc_mode,
              // ptfac_count: item.ptfac_count,
              // ptfac_kms: item.ptfac_kms,
              // ptfac_mode: item.ptfac_mode,
              // ptfacnt_count: item.ptfacnt_count,
              // ptfacnt_kms: item.ptfacnt_kms,
              // ptfacnt_mode: item.ptfacnt_mode,
              avg_dist_hotel_event_kms: item.avg_dist_hotel_event_kms,
              avg_dist_hotel_event_mode: item.avg_dist_hotel_event_mode,
              avg_num_Staff_event_each_day_count: item.avg_num_Staff_event_each_day_count,
              avg_num_Staff_event_each_day_kms: item.avg_num_Staff_event_each_day_kms,
             
            });
          }

        }
      })

  }
  public _fetchData() {
    let url='events/section2/participants?event_id='+this.event_id
    // +'&page='+this.page.pageNumber+'&perPage='+this.page.size+'&keyword='+this.keyword
    // if(this.sortBy!='' && this.order!=''){
    //   url+='&sortBy='+this.sortBy+'&order='+this.order;
    // }
    this.authFackservice.get(url).subscribe(
      res => {
        if(res['status']==true){
          this.dataList =res['data'];
          this.page.totalElements=res['elementCount'];
  
        }
      });
    
  }
  public modes() {

    let url='events/travel_modes';
    this.authFackservice.get(url).subscribe(
      res => {
        if(res['status']==true){
          this.Mode =res['data'];
        }
      });
  }
  largeModal(largeDataModal: any) {
    this.title='Add';
    this.initForm2()
    this.typesubmit1=false;
    this.typeValidationForm1.reset();
    this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
  }
  editModal(largeDataModal: any,item) {
    

    this.typesubmit1=false;
    this.title='Edit';
    this.initForm2();
    this.typeValidationForm1.patchValue({
      event_id: item.event_id,
      participant_count:item.participant_count,
      kms_count:item.kms_count,
      mode:item.mode,
      id:item.id
    });
    this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
  }
  toggleFunction(event,id){
    let currentTarget=event.currentTarget.checked==false?1:0;
    let text='Are you sure to Disable';let confirmButtonText='Yes. Disable it!'
    if(currentTarget==0){
      text='Are you sure to enable'; confirmButtonText='Yes. Enable it!'
    }
    Swal.fire({
      title: 'Are you sure?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: confirmButtonText
    }).then(result => {
      if (result.value) {
      this.authFackservice.put('events/status?value='+currentTarget+'&event_id='+id,{}).subscribe(
        res => {
          if(res['status']==true){
            if(currentTarget==0)
            Swal.fire('Enabled!', 'Selected Participant has been enaled.', 'success');
            else
            Swal.fire('Disabled!', 'Selected Participant has been disabled.', 'success');
            this._fetchData();
          }
        });  
    }else this._fetchData();
    })
  }
 
  deleteRow(item){
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
        this.authFackservice.delete('events/section2/participants?id='+item.id+'&event_id='+this.event_id).subscribe(
          res => {
            if(res['status']==true){
              Swal.fire('Deleted!', 'Selected Participant has been deleted.', 'success');
              this._fetchData();
              this.eventDetails()

            }
          });  
      }
    });
  }
  typeSubmit() {
    this.typesubmit = true;
    if (this.typeValidationForm.status == 'INVALID')
      return;

    var formData: any = new FormData();
    // formData.append("pll_count", this.typeValidationForm.value.pll_count);
    // formData.append("pll_kms", this.typeValidationForm.value.pll_kms);
    // formData.append("pll_mode", this.typeValidationForm.value.pll_mode);
    // formData.append("ptwc_count", this.typeValidationForm.value.ptwc_count);
    // formData.append("ptwc_kms", this.typeValidationForm.value.ptwc_kms);
    // formData.append("ptwc_mode", this.typeValidationForm.value.ptwc_mode);
    // formData.append("ptfac_count", this.typeValidationForm.value.ptfac_count);
    // formData.append("ptfac_kms", this.typeValidationForm.value.ptfac_kms);
    // formData.append("ptfac_mode", this.typeValidationForm.value.ptfac_mode);
    // formData.append("ptfacnt_count", this.typeValidationForm.value.ptfacnt_count);
    // formData.append("ptfacnt_kms", this.typeValidationForm.value.ptfacnt_kms);
    // formData.append("ptfacnt_mode", this.typeValidationForm.value.ptfacnt_mode);
    formData.append("avg_dist_hotel_event_kms", this.typeValidationForm.value.avg_dist_hotel_event_kms);
    formData.append("avg_dist_hotel_event_mode", this.typeValidationForm.value.avg_dist_hotel_event_mode);
    formData.append("avg_num_Staff_event_each_day_count", this.typeValidationForm.value.avg_num_Staff_event_each_day_count);
    formData.append("avg_num_Staff_event_each_day_kms", this.typeValidationForm.value.avg_num_Staff_event_each_day_kms);
    formData.append("event_id", this.event_id);

    this.authFackservice.putMultipart('events/section1', formData).subscribe(
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
  typeSubmit1() {
    this.typesubmit1 = true;
    if(this.typeValidationForm1.status=='INVALID')return;
    var formData = new FormData();
    formData.append("participant_count", this.typeValidationForm1.value.participant_count);
    formData.append("kms_count", this.typeValidationForm1.value.kms_count);
    formData.append("mode", this.typeValidationForm1.value.mode);
    formData.append("event_id", this.event_id);

     
      let data=this.typeValidationForm1.value;
      if(data.id==0 || data.id==null){
         this.authFackservice.postMultipart('events/section2/participants',formData).subscribe(
           res => {
             if(res['status']==true){
               this._fetchData();
               Swal.fire('Success!', 'New participant has been added.', 'success');
               this.modalService.dismissAll()
               this.eventDetails()

             }else{
               Swal.fire('Error!', res['data'], 'error');
             }
           });  
       }else{
         formData.append("id", this.typeValidationForm1.value.id);
         this.authFackservice.putMultipart('events/section2/participants',formData).subscribe(
           res => {
             if(res['status']==true){
               this._fetchData();
               Swal.fire('Success!', 'Selected participant has been updated.', 'success');
               this.eventDetails()
               this.modalService.dismissAll()
             }else{
               Swal.fire('Error!', res['data'], 'error');
               this.modalService.dismissAll()
   
             }
           }); 
       }
    
  }
  sorting(){
    if(this.sortBy!='' && this.order!=''){
      this._fetchData()
    }
  }
  pageChange(){
    this._fetchData();
  }
  pageCopy(){
    return {...this.page}
  }
  
  changePage(event){
    this.page.pageNumber=event;
    this._fetchData()
  }
}
