// Inside popup.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Implement your authentication logic here
    const authenticated = true;

    // Send a message to the main window indicating successful authentication
    window.opener.postMessage({ authenticated }, '*');

    // Close the popup window (optional)
    window.close();
  }
}
