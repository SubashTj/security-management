import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  FilterDownloadFile: any;
  constructor(
    private http: HttpClient,
  ) { }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  employeeGet(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    );
  }

  // Overview(path: string, params: HttpParams = new HttpParams()): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}${path}`, { params });
  // }
  Overview(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  fileUpload(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`, body
    );
  }
  getdep(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }

  downloadFile(path: string, body: Object = {}): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'GET',
      `${environment.apiUrl}${path}`,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }
  downloadMonthly(path: string, body: Object = {}): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'POST',
      `${environment.apiUrl}${path}`, body,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }
  getjob(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getqual(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getspec(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  updatespec(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  getnationl(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getblood(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getreligion(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getcountry(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getlayout(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getholiday(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  forgot(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  forgotpass(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    );
  }

  update(path: string, body: Object = {}): Observable<any> {
    console.log(`${environment.apiUrl}${path}`,
      body)
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }

  deleteDep(path: string, body: Object = {}): Observable<any> {

    console.log(`${environment.apiUrl}${path}`, body)
    return this.http.post(
      `${environment.apiUrl}${path}`, body
    );
  }
  deleteFile(path: string, body: Object = {}): Observable<any> {

    console.log(`${environment.apiUrl}${path}`, body)
    return this.http.post(
      `${environment.apiUrl}${path}`, body
    );
  }
  //  deleteFile(path: string, params: HttpParams = new HttpParams()): Observable<any> {
  //     return this.http.post(`${environment.apiUrl}${path}`, { params });
  //   }
  posts(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  postsemp(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  Update(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  Updates(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  statuss(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  postqual(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  postspec(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  postjob(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  deleteJob(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`,
      body);
  }
  updatejob(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  delete(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, body);
  }
  Status(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  status(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  deletespec(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, body);
  }
  updatespeci(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    )
  }
  deletequal(path: string, body: Object = {}): Observable<any> {

    return this.http.post(`${environment.apiUrl}${path}`, body);
  }
  updatequal(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body
    );
  }
  //Report Api
  getReport(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getTimeReport(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getIndividualTimeReport(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  getMonthlyTimeReport(path: string, body: Object = {}): Observable<any> {
    console.log(`${environment.apiUrl}${path}`, body)
    return this.http.post(`${environment.apiUrl}${path}`, body);
  }
  deviceget(path: string, body: Object = {}): Observable<any> {
    console.log(`${environment.apiUrl}${path}`, body)
    return this.http.post(`${environment.apiUrl}${path}`, body);
  }
  ManualAttendance(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, body);
  }
}
