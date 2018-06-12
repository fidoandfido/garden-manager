import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserService } from '../shared/services/user.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [UserService]
})
export class AccountModule { }
