import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { EventService } from 'src/app/core/services/event.service';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})

/**
 * Vertical component
 */
export class VerticalComponent implements OnInit, AfterViewInit {
  currentUser: any;
  userlogo=localStorage.getItem('user_logo')
  isCondensed = false;
  merchantsData={balance:0};
  socket;
  count: any;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  constructor(private eventService: EventService,public formBuilder: FormBuilder,private modalService: NgbModal,private router: Router,  private authFackservice: AuthfakeauthenticationService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        document.body.classList.remove('sidebar-enable');
      }
    });
    
    this.merchantsData= this.authFackservice.currentstatusvalue;

  }
  setupSocketConnection() {
  
  }
  getcount(){
   
  }
  changePassword(largeDataModal: any) {
    this.typesubmit=false;
    this.initForm();
   this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
  }
  get type() {
    return this.typeValidationForm.controls;
  }
  initForm(){
    this.typeValidationForm = this.formBuilder.group({
      current_password:['',Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^(?=(.*[a-zA-Z]){1,})(?=(.*[!@#$%^&*()_+|~=\`<{}:;’>?,./\"]){1,})(?=(.*[0-9]){1,}).{1,}$')]],
      confirm_password: ['',Validators.required],
    }, {
        validator: this.MustMatch('new_password', 'confirm_password'),
      });
    
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }
  showBalance(b){
    if(b<0)
    return b*-1;
    else return b;
  }
  ngOnInit() {
    this.initForm();

    this.setupSocketConnection();
    this.eventService.subscribe('currentstatus', (layout) => {
      this.merchantsData=layout
    })
    this.getcount();
    document.body.removeAttribute('data-layout');
    document.body.removeAttribute('data-topbar');
    document.body.removeAttribute('data-layout-size');
    document.body.classList.remove('sidebar-enable');
    document.body.classList.remove('vertical-collpsed');
    document.body.removeAttribute('data-sidebar-size');
    this.currentUser = this.authFackservice.currentUserValue;

  }
  logout() {
    this.authFackservice.logout();
  this.router.navigate(['/account/login']);
}
  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }

  ngAfterViewInit() {
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }

  /**
   * On mobile toggle button clicked
   */
   typeSubmit() {
    this.typesubmit = true;
    if(this.typeValidationForm.status=='INVALID')
    return;
    var formData: any = new FormData();
    formData.append("current_password", this.typeValidationForm.value.current_password);
    formData.append("new_password", this.typeValidationForm.value.new_password);
    formData.append("confirm_password", this.typeValidationForm.value.confirm_password);
    this.authFackservice.postMultipart('api/changePassword',formData).subscribe(
      res => {
        if(res['status']==true){
          Swal.fire('Success!', 'Password has been changed.', 'success');
          this.modalService.dismissAll()
          this.authFackservice.logout()
        }else{
          Swal.fire('Error!', res['message'], 'error');

        }
      });  
  }
  onToggleMobileMenu() {
    this.isCondensed = !this.isCondensed;
    document.body.classList.toggle('sidebar-enable');
    document.body.classList.toggle('vertical-collpsed');

    if (window.screen.width <= 768) {
      document.body.classList.remove('vertical-collpsed');
    }
  }
}
