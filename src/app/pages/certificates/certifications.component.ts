import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';
import Swal from 'sweetalert2';
import { Observable, Subscription } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { NgbdSortableHeader } from '../table-sortable';
import { first } from 'rxjs/operators';

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1:number|string, v2:number|string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string|null;
  direction: SortDirection;
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
})
export class certificationsComponent implements OnInit {
  from_date ;
  to_date; 
  socket;
  document: any;
  page={totalElements:0,pageNumber:1,size:10};
  elementCount=0;
  currentpage=1;
  breadCrumbItems: Array<{}>;
  merchantsData:any=[];
  keyword: string='';
  hrefLink: any;
  blob: Blob;
  transfer_type='';channel_id='';
  merchant_id='';charity_id=''; merchants=[];charities=[];
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>=Object.create(null);

  term="";sortBy='';order='';
  details: any;
  constructor(private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder) { }
   ngOnInit() {
    // this.setupSocketConnection();
    this.breadCrumbItems = [{label:'My Dashboard',href:'/dashboard'},{label:'Certificates', active: true }];
    this.currentpage = 1;
    this._fetchData();
  }
 
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '') {       this.order='';this.sortBy=''; this._fetchData();

    } else {
      this.order=direction;this.sortBy=column
      this._fetchData();
    }
  }  
  search(){
    this.page.pageNumber=1
    this.currentpage=1;
    this._fetchData()
  }
  public _fetchData() {
   
    let url='issued_certificates?page='+this.page.pageNumber+'&perPage='+this.page.size+'&keyword='+this.keyword
    if(this.sortBy!='' && this.order!=''){
      url+='&sortBy='+this.sortBy+'&order='+this.order;
    }   
    if(this.from_date!=undefined ||this.to_date!=undefined || this.from_date<this.to_date)
    {
      url+='&from_date='+this.from_date+'&to_date='+this.to_date
    }
  
     this.authFackservice.get(url).subscribe(      res => {
        if(res['status']==true){
          this.merchantsData =res['data'];
          this.page.totalElements=res['elementCount'];
        }
      });
     
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
  clearfilter(){
    this.from_date=undefined;
    this.merchant_id=undefined;this.charity_id=undefined;
    this.to_date=undefined; this.transfer_type=undefined; this.channel_id=undefined
    this.keyword='';
    this.search()
  }
  datesearch(){
    if(this.from_date==undefined ||this.to_date==undefined || this.from_date>this.to_date)
      {
        return;
      }else{
        this.currentpage=1;
        this.page.pageNumber=1
        this._fetchData();
      }
   }
   openModel(item,largeDataModal: any) {
    this.details=item
 
     this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
   }
}
