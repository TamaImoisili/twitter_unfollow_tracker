import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  private popupWindow: Window | null = null;

  signIn(): void {
     // Open the popup window
     this.popupWindow = window.open('http://localhost:3000/twitter/login', '_blank', 'height=400,width=600');

     // Listen for messages from the popup window
     window.addEventListener('message', (event) => {
       if (event.data === 'authenticated') {
         this.closePopup();
       }
     });
  }
  closePopup(): void {
    //if popup window is not null close
    if (this.popupWindow) {
      this.popupWindow.close();
    }
  }
  testWithDefault(): void {
  }
}
