import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ResetComponent } from './reset/passwordreset.component';
import { CertificateComponent } from './certificate/certificate.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    // {
    //     path: 'signup',
    //     component: SignupComponent
    // },
    {
        path: 'forgot-password',
        component: PasswordresetComponent
    },
    {
        path: 'forgot-password/:token',
        component: ResetComponent
    },
    { path: 'certificate/:id', component: CertificateComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
