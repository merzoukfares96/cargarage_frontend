import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarService } from './car.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AddCarModalComponent } from './add-car-modal/add-car-modal.component';
import { UpdateCarModalComponent } from './update-car-modal/update-car-modal.component';
import { DeleteCarModalComponent } from './delete-car-modal/delete-car-modal.component';
import { NotifierModule } from 'angular-notifier';
import { CarouselComponent } from './carousel/carousel.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, AddCarModalComponent, UpdateCarModalComponent, DeleteCarModalComponent, CarouselComponent, RegisterComponent, LoginComponent],
  imports: [BrowserModule, HttpClientModule, NgbModule, FormsModule, NotifierModule.withConfig({
    position: {
      horizontal: {
        position: 'right'
      },
      vertical: {
        position: 'bottom',
        distance: 12
      }
    },
    behaviour: {
      onClick: "hide",
      autoHide: 2000
    }
  })],
  providers: [CarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
