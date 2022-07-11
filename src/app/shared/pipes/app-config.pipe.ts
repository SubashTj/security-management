import { Pipe, PipeTransform } from "@angular/core";
import { format, isValid } from 'date-fns';
import { getDateFnsFormat, getTimeFnsFormat, getUniqDateFnsFormat } from "src/app/core/helpers/app-config.helper";
import {
    DomSanitizer,
    SafeHtml,
    SafeStyle,
    SafeScript,
    SafeUrl,
    SafeResourceUrl,
} from "@angular/platform-browser";
import * as moment from "moment";

@Pipe({ name: 'displayDate' })
export class AppDisplayDatePipe implements PipeTransform {
    transform(value: string): string {
        var dateValue = new Date(value);
        return isValid(dateValue) ? format(dateValue, getDateFnsFormat()) : '';
    }
}

@Pipe({ name: 'uniqDisplayDate' })
export class AppUniqDisplayDatePipe implements PipeTransform {
    transform(value: string): string {
        var dateValue = new Date(value);
        return isValid(dateValue) ? format(dateValue, getUniqDateFnsFormat()) : '';
    }
}
@Pipe({ name: 'displayTime' })
export class AppDisplayTimePipe implements PipeTransform {
    transform(value: string): string {
        let formattedDate = moment().format('YYYY-MM-DD');
        let formattedTime = value;
        let format = getTimeFnsFormat();
        let dispTime = moment(`${formattedDate} ${formattedTime}`).format(format);
        return value ? dispTime : '';
    }
}

@Pipe({ name: 'displayDateTime' })
export class AppDisplayDateTimePipe implements PipeTransform {
    transform(value: string): string {
        var dateValue = new Date(value);
        let format = getTimeFnsFormat();
        return isValid(dateValue) ? moment(dateValue).format(format) : '';
    }
}

@Pipe({ name: 'serverDate' })
export class AppServerDatePipe implements PipeTransform {
    transform(value: string): string {
        var dateValue = new Date(value);
        return isValid(dateValue) ? format(dateValue, 'yyyy-MM-dd') : '';
    }
}


@Pipe({ name: 'serverDateTime' })
export class AppServerDateTimePipe implements PipeTransform {
    transform(value: string): string {
        var dateValue = new Date(value);
        return isValid(dateValue) ? format(dateValue, 'yyyy-MM-dd HH') : '';
    }
}

@Pipe({ name: 'serverMonth' })
export class AppServerMonthPipe implements PipeTransform {
    transform(value: string): string {
        var dateValue = new Date(value);
        return isValid(dateValue) ? format(dateValue, 'MM') : '';
    }
}

@Pipe({ name: 'serverYear' })
export class AppServerYearPipe implements PipeTransform {
    transform(value: string): string {
        var dateValue = new Date(value);
        return isValid(dateValue) ? format(dateValue, 'yyyy') : '';
    }
}
@Pipe({
    name: "safeHtml",
})
export class SafePipe {
    constructor(protected sanitizer: DomSanitizer) { }
    transform(htmlString: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(htmlString);
    }
}