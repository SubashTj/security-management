
import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import { format } from 'date-fns';
import { Injectable } from '@angular/core';
import { getDateFnsFormat } from 'src/app/core/helpers/app-config.helper';
@Injectable({
    providedIn: "root",
  })
  
export class AppDateAdapter extends NativeDateAdapter {
    // format(date: Date, displayFormat: Object): string {
    //     if (displayFormat === 'input') {
    //         return format(date, getDateFnsFormat());
    //     }
    //     return date.toDateString();
    // }
}

export const APP_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: {
            year: 'numeric', month: 'long', day: 'numeric'
        },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};