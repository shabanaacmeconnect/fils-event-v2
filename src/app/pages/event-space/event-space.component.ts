import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-event-space',
  templateUrl: './event-space.component.html',
  styleUrls: ['./event-space.component.scss']
})
export class EventSpaceComponent implements OnInit{
  page={totalElements:0,pageNumber:1,size:10};
  sortBy='';
  order='';
  event_id='';
  
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  dataList:any=[];
  hrefLink: any;
  blob: Blob;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>=Object.create(null);
  title='Add';
  keyword: string='';
  constructor( private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private route:ActivatedRoute,
  private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder) { }
  
  ngOnInit() {
   this.breadCrumbItems = [{label:'My Dashboard',href:'/dashboard'},{ label: 'Event Space', active: true }];
  //  this.event_id=this.activatedRouter.snapshot.params['id']?this.activatedRouter.snapshot.params['id']:'';

  this.route.parent.params.subscribe(params => {
    this.event_id= params["id"];
   });  
    this.initForm();
    this._fetchData();
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
  initForm(){
    this.typeValidationForm = this.formBuilder.group({
      event_id:0,
      id: 0,
      country_id : ['',[ Validators.required, ]],
      name : ['',[ Validators.required, Validators.maxLength(60),Validators.minLength(1),]],
      date : ['',[ Validators.required]],
      num_hours : ['',[ Validators.required, Validators.maxLength(60),Validators.minLength(1),]],
      approx_size : ['',[ Validators.required, Validators.maxLength(60),Validators.minLength(1),]],
      unit : ['',[ Validators.required, Validators.maxLength(60),Validators.minLength(1),]],
     
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
  search(){  
    this.page.pageNumber=1
    this._fetchData()
  }
  
  public _fetchData() {
    let url='events/section3/event_space?event_id='+this.event_id+'&page='+this.page.pageNumber+'&perPage='+this.page.size+'&keyword='+this.keyword
    if(this.sortBy!='' && this.order!=''){
      url+='&sortBy='+this.sortBy+'&order='+this.order;
    }
    this.authFackservice.get(url).subscribe(
      res => {
        if(res['status']==true){
          this.dataList =res['data'];
          this.page.totalElements=res['elementCount'];
  
        }
      });
    
  }
  get f() {
    return this.typeValidationForm.controls;
  }
  largeModal(largeDataModal: any) {
    this.title='Add';
    this.typesubmit=false;
    this.typeValidationForm.reset();
    this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
  }
  editModal(largeDataModal: any,item) {  
    this.typesubmit=false;
    this.title='Edit';
    this.initForm();
    this.typeValidationForm.patchValue({
      id: item.id,
      country_id:item.country_id,
      num_hours:item.num_hours,
      name:item.name,
      date:item.date,
      approx_size:item.approx_size,
      unit:parseInt(item.unit),
     
    });
    this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
  }
  // toggleFunction(event,id){
  //   let currentTarget=event.currentTarget.checked==false?1:0;
  //   let text='Are you sure to Disable';let confirmButtonText='Yes. Disable it!'
  //   if(currentTarget==0){
  //     text='Are you sure to enable'; confirmButtonText='Yes. Enable it!'
  //   }
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: text,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#34c38f',
  //     cancelButtonColor: '#f46a6a',
  //     confirmButtonText: confirmButtonText
  //   }).then(result => {
  //     if (result.value) {
  //     this.authFackservice.put('admin/merchants/status?value='+currentTarget+'&id='+id,{}).subscribe(
  //       res => {
  //         if(res['status']==true){
  //           if(currentTarget==0)
  //           Swal.fire('Enabled!', 'Selected Event Space has been enaled.', 'success');
  //           else
  //           Swal.fire('Disabled!', 'Selected Event Space has been disabled.', 'success');
  //           this._fetchData();
  //         }
  //       });  
  //   }else this._fetchData();
  //   })
  // }
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
        this.authFackservice.delete('events/section3/event_space?id='+item.id+'&event_id='+item.event_id).subscribe(
          res => {
            if(res['status']==true){
              Swal.fire('Deleted!', 'Selected Event Space has been deleted.', 'success');
              this._fetchData();
              this.eventDetails()
            }
          });  
      }
    });
  }
  typeSubmit() {
    this.typesubmit = true;
    if(this.typeValidationForm.status=='INVALID')
    return;
    var formData: any = new FormData();
    formData.append("country_id", this.typeValidationForm.value.country_id);
    formData.append("num_hours", this.typeValidationForm.value.num_hours);
    formData.append("approx_size", this.typeValidationForm.value.approx_size);
    formData.append("unit", this.typeValidationForm.value.unit);
    formData.append("name", this.typeValidationForm.value.name);
    formData.append("date", this.typeValidationForm.value.date);
    formData.append("event_id", this.event_id);
  
   
    let data=this.typeValidationForm.value;
  
    if(data.id==0 || data.id==null){
      this.authFackservice.postMultipart('events/section3/event_space',formData).subscribe(
        res => {
          if(res['status']==true){
            this._fetchData();
            this.eventDetails()

            Swal.fire('Success!', 'New Event Space has been added.', 'success');
          }else{
            Swal.fire('Error!', res['message'], 'error');
          }
          this.modalService.dismissAll()
        });  
    }else{
      // formData.append("event_id", this.typeValidationForm.value.event_id);
      formData.append("id", this.typeValidationForm.value.id);

      this.authFackservice.putMultipart('events/section3/event_space',formData).subscribe(
        res => {
          if(res['status']==true){
            this._fetchData();
            this.eventDetails()

            
            Swal.fire('Success!', 'Selected Event Space has been updated.', 'success');
  
          }else{
            Swal.fire('Error!', res['message'], 'error');
  
          }
          this.modalService.dismissAll()
  
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
