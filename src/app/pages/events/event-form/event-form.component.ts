import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public data;
  @Input() public title;
  constructor(public activeModal: NgbActiveModal,private authFackservice: AuthfakeauthenticationService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.event_id=this.activatedRouter.snapshot.params['id']?this.activatedRouter.snapshot.params['id']:'';
    this.initForm();
    if(this.data){
      this.typeValidationForm.patchValue({
        event_id: this.data.id,
        event_name: this.data.event_name,
        event_purpose: this.data.event_purpose,
        number_of_attendees: this.data.number_of_attendees,
        location: parseInt(this.data.location),
        duration_in_days: this.data.duration_in_days,
        event_date: this.data.event_date,
        event_organiser: this.data.event_organiser,
        main_contact: this.data.main_contact,
        contact_email: this.data.contact_email,
      });
    }
  }
  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      event_id: 0,
      event_name: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      event_purpose: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      number_of_attendees: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      location: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      duration_in_days: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      event_date: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      event_organiser: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      main_contact: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1),]],
      contact_email: ['', [Validators.required, Validators.email]],
    });

  }

  get f() {
    return this.typeValidationForm.controls;
  }

  typeSubmit() {
    this.typesubmit = true;
    if (this.typeValidationForm.status == 'INVALID')
      return;
    var formData: any = new FormData();
    formData.append("event_name", this.typeValidationForm.value.event_name);
    formData.append("event_purpose", this.typeValidationForm.value.event_purpose);
    formData.append("number_of_attendees", this.typeValidationForm.value.number_of_attendees);
    formData.append("location", this.typeValidationForm.value.location);
    formData.append("duration_in_days", this.typeValidationForm.value.duration_in_days);
    formData.append("event_date", this.typeValidationForm.value.event_date);
    formData.append("event_organiser", this.typeValidationForm.value.event_organiser);
    formData.append("main_contact", this.typeValidationForm.value.main_contact);
    formData.append("contact_email", this.typeValidationForm.value.contact_email);

    let data = this.typeValidationForm.value;

    if (data.event_id == 0 || data.event_id == null) {
      this.authFackservice.postMultipart('events', formData).subscribe(
        res => {
          if (res['status'] == true) {
            this.passEntry.emit();
            this.activeModal.dismiss()
            Swal.fire('Success!', 'New Event has been added.', 'success');
          } else {
            Swal.fire('Error!', res['message'], 'error');
          }
        });
    } else {
      formData.append("event_id", this.typeValidationForm.value.event_id);
      this.authFackservice.putMultipart('events', formData).subscribe(
        res => {
          if (res['status'] == true) {
            this.passEntry.emit();
            this.activeModal.dismiss()

            Swal.fire('Success!', 'Selected Event has been updated.', 'success');

          } else {
            Swal.fire('Error!', res['message'], 'error');

          }

        });
    }
  }
}
