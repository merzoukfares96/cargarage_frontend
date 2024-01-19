import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { CarService } from './car.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
declare var window:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public editCar: Car | null;
  addModal: any;
  registerModal: any;
  updateModal: any;
  deleteModal: any;
  public cars: Car[];
  public deleteCar: Car | null;
  private readonly notifier: NotifierService;

  constructor(private carService: CarService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getCars();
    this.registerModal = new window.bootstrap.Modal(
      document.getElementById("registerModal")
    );
    this.addModal = new window.bootstrap.Modal(
      document.getElementById("addCarModal")
    );
    this.updateModal = new window.bootstrap.Modal(
      document.getElementById("updateCarModal")
    );
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteCarModal")
    );
  }
  
  public onOpenModal(car: Car, mode: string): void {
    if (mode === 'add') {
      this.addModal.show();
    }
    else if (mode === 'register') {
      this.registerModal.show();
    }
    else if (mode === 'edit') {
      this.editCar = car
      this.updateModal.show();
    }
    else if (mode === 'delete') {
      this.deleteCar = car;
      this.deleteModal.show();
    }
  }
  public onCloseModal(modal:any){
    modal.hide();
  }

  public getCars(): void {
    this.carService.getCars().subscribe(
      (response: Car[]) => {
        this.cars = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public searchCars(key: string): void{
    const results: Car[] = [];
    for (const car of this.cars){
      if ((car.brand.toLowerCase().indexOf(key.toLowerCase()) !== -1) || 
      (car.model.toLowerCase().indexOf(key.toLowerCase()) !== -1) ||
      (car.year.toString().indexOf(key.toLowerCase()) !== -1)) {
        results.push(car);
      }
    }
    this.cars = results;
    if (!key){
      this.getCars();
    }
  }

  public onAddCar(addForm: NgForm): void {
    this.carService.addCar(addForm.value).subscribe(
      (response: Car) => {
        this.getCars();
        this.onCloseModal(this.addModal);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCar(car: Car): void {
    this.carService.updateCar(car).subscribe(
      (response: Car) => {
        this.getCars();
        this.onCloseModal(this.updateModal);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCar(carId: number): void {
    console.log(carId);
    this.carService.deleteCar(carId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCars();
        this.onCloseModal(this.deleteModal);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
