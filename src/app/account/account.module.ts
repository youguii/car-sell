import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountComponent,
    EditProfileComponent,
    EditInfoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
