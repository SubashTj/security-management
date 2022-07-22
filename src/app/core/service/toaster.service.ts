import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public snackBar: MatSnackBar) {

  }

  present(message: string, action?: string, position?: string) {

    var option = {
      duration: 2000,
     
    };

    var posKey = '';
  
    position = position ??  "top";

    if (position == 'center') {
      posKey = 'horizontalPosition';
    } else if (position == "top") {
      posKey = 'verticalPosition';
    } else if (position == 'bottom') {
      posKey = 'verticalPosition';
    }

    Object.defineProperty(option, posKey, {
      value: position
      
    });
    this.snackBar.open(message, action, option);
  }


}
