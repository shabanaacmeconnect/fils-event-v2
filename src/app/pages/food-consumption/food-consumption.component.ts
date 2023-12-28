import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
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
  selector: 'app-food-consumption',
  templateUrl: './food-consumption.component.html',
  styleUrls: ['./food-consumption.component.scss']
})
export class FoodConsumptionComponent implements OnInit,OnChanges{
  page={totalElements:0,pageNumber:1,size:10};
  sortBy='';
  order='';
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  dataList:any=[];
  hrefLink: any;
  blob: Blob;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>=Object.create(null);
  title='Add';
  keyword: string='';
 @Output() newItemEvent = new EventEmitter<string>();
  @Input() event_id=''
  constructor( private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private route:ActivatedRoute,
  private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder) { }
  
  ngOnInit() {
   this.breadCrumbItems = [{label:'My Dashboard',href:'/dashboard'},{ label: 'Food Consumption', active: true }];
  //  this.event_id=this.activatedRouter.snapshot.params['id']?this.activatedRouter.snapshot.params['id']:'';
  this.eventDetails();
    this.initForm();
    this._fetchData();

  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  initForm(){
    this.typeValidationForm = this.formBuilder.group({
      event_id:0,
      id: 0,
      food_type:['', [Validators.required]],
      food_option:['', [Validators.required]],
      num_of_meals:['', [Validators.required]],
      date:['', [Validators.required]]
      
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

  search(){  
    this.page.pageNumber=1
    this._fetchData()
  }
  
  public _fetchData() {
    let url='events/section2/food_consumption?event_id='+this.event_id
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
      event_id: item.event_id,
      food_type:parseInt(item.food_type),
      food_option:parseInt(item.food_option),
      num_of_meals:item.num_of_meals,
      id:item.id,
      date:item.date
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
            Swal.fire('Enabled!', 'Selected Food Consumption has been enaled.', 'success');
            else
            Swal.fire('Disabled!', 'Selected Food Consumption has been disabled.', 'success');
            this._fetchData();
          }
        });  
    }else this._fetchData();
    })
  }
  details;
  eventDetails() {
  this.authFackservice.get("events/details?event_id="+this.event_id).subscribe(res=>{
    if(res['status']){
      this.details=res['data'];
    }
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
        this.authFackservice.delete('events/section2/food_consumption?id='+item.id+'&event_id='+this.event_id).subscribe(
          res => {
            if(res['status']==true){
              Swal.fire('Deleted!', 'Selected Food Consumption has been deleted.', 'success');
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
   
    formData.append("food_type",this.typeValidationForm.value.food_type);
    formData.append("food_option",this.typeValidationForm.value.food_option);
    formData.append("num_of_meals",this.typeValidationForm.value.num_of_meals);
    formData.append("date",this.typeValidationForm.value.date);

    formData.append("event_id", this.event_id);

    let data=this.typeValidationForm.value;
  
    if(data.id==0 || data.id==null){
      this.authFackservice.postMultipart('events/section2/food_consumption',formData).subscribe(
        res => {
          if(res['status']==true){
            this._fetchData();
            this.newItemEvent.emit();

            Swal.fire('Success!', 'New Food Consumption has been added.', 'success');
          }else{
            Swal.fire('Error!', res['message'], 'error');
          }
          this.modalService.dismissAll()
        });  
    }else{
      formData.append("id", this.typeValidationForm.value.id);
      this.authFackservice.putMultipart('events/section2/food_consumption',formData).subscribe(
        res => {
          if(res['status']==true){
            this._fetchData();
            this.newItemEvent.emit();

            Swal.fire('Success!', 'Selected Food Consumption has been updated.', 'success');
  
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
