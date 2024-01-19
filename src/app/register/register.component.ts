import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  username: string = "";
  
  email: string = "";
  password: string = "";
  private readonly notifier: NotifierService;

  constructor(private http: HttpClient, notifierService: NotifierService){
    this.notifier = notifierService;
  }
  
  onCloseModal(): void {
    // ... other logic ...
    this.closeModal.emit();
  }

  save() {
    if (this.username == "") {
      this.notifier.notify("error", "Username required");
      return;
    } else if (this.email == ""){
      this.notifier.notify("error", "Email required");
      return;
    } else if (this.password == ""){
      this.notifier.notify("error", "Password required");
      return;
    }
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    if (!isEmailValid) {
      // Email is not valid, stop the function
      this.notifier.notify("error", "Email not valid");
      return;
    }
    let bodyData = {
      "username": this.username,
      "email": this.email,
      "password": this.password
    };
    this.http.get("http://localhost:8080/api/v1/user/check", {
      params: { 
        username: this.username,
        email: this.email
      },
      responseType: 'json'
    }).subscribe(
      (resultData: any) => {
        console.log("this is the check return : ", resultData.status);
        // Handle the result data, and if needed, notify the user
        if (resultData.status === 'user_exists') {
          this.notifier.notify("error", "User already exists!");
          return;
        }
        this.http.post("http://localhost:8080/api/v1/user/save", bodyData, {responseType: 'text'}).subscribe((resultData: any)=>
        {
          this.notifier.notify("success", "User registered successfully !");
        })
      },
      (error) => {
        console.error("Error occurred:", error);
        // Handle error if needed
      }
    );
  }
}
