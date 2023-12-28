import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule,NgbAlertModule, NgbTooltipModule , NgbCollapseModule,NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbdSortableHeader } from './table-sortable';
import { NgSelectModule } from '@ng-select/ng-select';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EventsComponent } from './events/events.component';

import { FoodConsumptionComponent } from './food-consumption/food-consumption.component';
import { EventSpaceComponent } from './event-space/event-space.component';
import { PromotionalComponent } from './promotional/promotional.component';
import { PowerConsumptionComponent } from './power-consumption/power-consumption.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { ParticipantsComponent } from './participants/participants.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { stayComponent } from './stay/stay.component';
import { summaryComponent } from './summary/summary.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { PaymentComponent } from './payment/payment.component';
import { certificationsComponent } from './certificates/certifications.component';




@NgModule({
  declarations: [
    NgbdSortableHeader,
    EventsComponent,
    FoodConsumptionComponent,
    EventSpaceComponent,
    PromotionalComponent,
    PowerConsumptionComponent,
    FoodDetailsComponent,
    ParticipantsComponent,
    EventDetailsComponent,
    stayComponent, summaryComponent,
    certificationsComponent,
     EventFormComponent, PaymentComponent
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbDatepickerModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgSelectModule,
    NgbAlertModule,
    CKEditorModule
  ],
  exports:[NgbdSortableHeader],
  entryComponents:[EventFormComponent,PaymentComponent]
})
export class PagesModule { }
