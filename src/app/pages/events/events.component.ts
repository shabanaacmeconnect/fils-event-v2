import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';
import { NgbdSortableHeader } from '../table-sortable';
import { EventFormComponent } from './event-form/event-form.component';

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1: number | string, v2: number | string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string | null;
  direction: SortDirection;
}
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };
  sortBy = '';
  order = '';

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;
  dataList: any = [];
  hrefLink: any;
  blob: Blob;
  // event_id='';
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> = Object.create(null);
  title = 'Add';
  keyword: string = '';
  constructor(private router: Router, private modalService: NgbModal, public notificationService: notificationService,
    private authFackservice: AuthfakeauthenticationService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'My Dashboard', href: '/dashboard' }, { label: 'Event', active: true }];
    // this.event_id=this.activatedRouter.snapshot.params['id']?this.activatedRouter.snapshot.params['id']:'';
    this._fetchData();
  }
 
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '') {
      this.order = ''; this.sortBy = ''; this._fetchData();
    } else {
      this.order = direction; this.sortBy = column
      this._fetchData();
    }
  }
  search() {
    this.page.pageNumber = 1
    this._fetchData()
  }

  public _fetchData() {
    let url = 'events?page=' + this.page.pageNumber + '&perPage=' + this.page.size + '&keyword=' + this.keyword
    if (this.sortBy != '' && this.order != '') {
      url += '&sortBy=' + this.sortBy + '&order=' + this.order;
    }
    this.authFackservice.get(url).subscribe(
      res => {
        if (res['status'] == true) {
          this.dataList = res['data'];
          this.page.totalElements = res['elementCount'];

        }
      });

  }
 
  largeModal() {
   
    let modalRef=this.modalService.open(EventFormComponent, { size: 'lg', windowClass: 'modal-holder', centered: true });
    modalRef.componentInstance.title ='Add'
    modalRef.componentInstance.passEntry.subscribe(() => {
      this._fetchData()
    })
   }

 
  
  sorting() {
    if (this.sortBy != '' && this.order != '') {
      this._fetchData()
    }
  }
  pageChange() {
    this._fetchData();
  }
  pageCopy() {
    return { ...this.page }
  }

  changePage(event) {
    this.page.pageNumber = event;
    this._fetchData()
  }
}
