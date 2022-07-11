import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Positions } from '../../job-position/Model/positions.model';
import { Category } from '../Model/category.model';
import { LayoutPosition } from '../Model/layoutposition.model';
import { RuleEngine } from '../Model/ruleengine.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public recordAddedSubject = new BehaviorSubject<Category[]>([{}] as Category[]);
  constructor(private apiService:ApiService) { }
  getLayout(obj): Observable<Category> {
    let params = new HttpParams();
    return this.apiService.getlayout(`get-category-dropdown`, obj).pipe(map(Category => {
      return Category;
  }));
}
getposition(obj): Observable<Positions> {
  let params = new HttpParams();
  return this.apiService.getjob(`get-job-positions-dropdown`, obj).pipe(map(Positions => {
    return Positions;
}));
}
getDepartment(obj){
let params = new HttpParams();
return this.apiService.getdep(`get-department-dropdown`, obj).pipe(map(Department => {
  return Department;
}));
}






getLayouts(obj): Observable<Category> {
  let params = new HttpParams();
  return this.apiService.getlayout(`get-layout-category`, obj).pipe(map(Category => {
    return Category;
}));
}

create(post) : Observable<Category>{

  return this.apiService.posts(`set-layout-category`, post).pipe(map(response =>(response)));
}
Create(model) : Observable<Category>{
  return this.apiService.posts(`post-layout-positions`, model).pipe(map(response =>(response)));
}
CreateRule(model) : Observable<Category>{
  return this.apiService.posts(`set-hub-rule`, model).pipe(map(response =>(response)));
}
Delete(obj){
  return this.apiService.delete(`delete-layout-category`, obj).pipe(map(response => (response)));
}
delete(obj){
  return this.apiService.delete(`delete-layout-positions`, obj).pipe(map(response => (response)));
}
update(post:Category){
  return this.apiService.Update(`update-layout-category`, post).pipe(map(response => (response)));
}
Update(post:Category){
  return this.apiService.Update(`update-layout-positions`, post).pipe(map(response => (response)));
}

status(obj): Observable<Category>{
  return this.apiService.Status(`update-category-active-status`, obj).pipe(map(response => (response)));
}
Status(obj): Observable<Category>{
  return this.apiService.status(`update-layout-active-status`, obj).pipe(map(response => (response)));
}
getlayoutposition(obj):Observable<LayoutPosition> {
  let params = new HttpParams();
  return this.apiService.getlayout(`get-layout-positions`, obj).pipe(map(LayoutPosition => {
    return LayoutPosition;
}));
}
getPosition(obj):Observable<LayoutPosition> {
    let params = new HttpParams();
    return this.apiService.getlayout(`get-layout-positions-dropdown`, obj).pipe(map(LayoutPosition => {
      return LayoutPosition;
  }));
}
getRule(obj):Observable<RuleEngine> {
  let params = new HttpParams();
  return this.apiService.getlayout(`get-hub-rule`, obj).pipe(map(Category => {
    return Category;
}));
}
deleterule(obj):Observable<RuleEngine>{
  return this.apiService.delete(`delete-hub-rule`, obj).pipe(map(response => (response)));
}
StatusRule(obj): Observable<RuleEngine>{
  return this.apiService.status(`update-hub-rule-status`, obj).pipe(map(response => (response)));
}
UpdateRule(post:RuleEngine){
  return this.apiService.Update(`update-hub-rule`, post).pipe(map(response => (response)));
}
}