import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './dashboards/default/default.component';
import { EventSpaceComponent } from './event-space/event-space.component';
import { EventsComponent } from './events/events.component';
import { FoodConsumptionComponent } from './food-consumption/food-consumption.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { ParticipantsComponent } from './participants/participants.component';
import { PowerConsumptionComponent } from './power-consumption/power-consumption.component';
import { PromotionalComponent } from './promotional/promotional.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { stayComponent } from './stay/stay.component';
import { summaryComponent } from './summary/summary.component';
import { certificationsComponent } from './certificates/certifications.component';




const routes: Routes = [
  { path: '', pathMatch:"full",redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'events', component: EventsComponent},
  { path: 'certificates', component: certificationsComponent},
  { path: 'events/:id', component: EventDetailsComponent,
  children:[
    { path: '', pathMatch:"full",redirectTo: 'overview' },

    { path: 'food', component: FoodConsumptionComponent},
    { path: 'eventspace', component: EventSpaceComponent},
    { path: 'gifting', component: PromotionalComponent},
    { path: 'marketing', component: PromotionalComponent},
    { path: 'clothing', component: PromotionalComponent},
    { path: 'powerconsumption', component: PowerConsumptionComponent},
    { path: 'fooddetails', component: FoodDetailsComponent},
    { path: 'travel', component: ParticipantsComponent},
    { path: 'stay', component: stayComponent},
    { path: 'overview', component: summaryComponent},
    { path: 'overview/:tid', component: summaryComponent},
    
  ]},
  // { path: 'events/:id/food', component: FoodConsumptionComponent},
  // { path: 'events/:id/eventspace', component: EventSpaceComponent},
  // { path: 'events/:id/promotional', component: PromotionalComponent},
  // { path: 'events/:id/powerconsumption', component: PowerConsumptionComponent},
  // { path: 'events/:id/fooddetails', component: FoodDetailsComponent},
  // { path: 'events/:id/participent', component: ParticipantsComponent},

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
