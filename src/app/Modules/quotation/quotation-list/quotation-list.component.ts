import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { PaginationDTO } from '../../model/paginationDTO';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { Expense } from '../../expense/Model/expense.model';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseService } from '../../expense/service/expense.service';
import { Router } from '@angular/router';
import { QuotationService } from '../service/quotation.service';
import { Quotation } from '../Model/quotation.model';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit {
  displayedColumns: string[] = ['select','quotationName','date','clientName','amount','activeStatus'];
  dataSource = new MatTableDataSource<Quotation>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<Quotation>(true, []);
  pageSizeOptions: any = 0;
  responseModel:any;
  value = "";
  customerId: string;
  districtId: string;
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  recordAddedSub: Subscription;
  recordUpdatedSub: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  quotation: Quotation;
  quotationId: string;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  isMultiStatus(status: string) {
    const others = this.getCheckedValue().filter(rol => {
      if (rol.activeStatus != status) {
        return rol;
      }
    });
    return others.length > 0;
  }
  getCheckedValue(): Quotation[] {
    let transList: Quotation[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  checkboxLabel(row?: Quotation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.quotationId + 1}`;
  }
  constructor(public config: ConfigService,public dialog: MatDialog, private router: Router, private getService:QuotationService,private loader:AppLoaderService) { 
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
    this.pageSizeOptions = constant().app.table.filtering.pageSizeOptions;
    this.paginationDTO = new PaginationDTO();
    this.offset= this.paginationDTO.offset
    this.limit= this.paginationDTO.limit
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  private refreshTable(actionType) {
    //reset the filter element
    this.filter.nativeElement.value = "";
    this.value = "";


    this.paginationDTO.offset = this.paginator.pageIndex
 
    this.paginationDTO.limit = this.paginator.pageSize;
  
    this.paginationDTO.totalSize = this.paginator.length;


    if (actionType == 'add') {
      this.paginationDTO.offset = 0;
    }
    
    if (actionType == 'delete') {
      if (this.getCheckedValue().length == this.currentPageDataSize) {
        this.paginationDTO.offset = this.paginator.pageIndex > 0 ? this.paginator.pageIndex - 1 : 0;
      }
    }
    this.getData()
    this.paginator.pageIndex = this.paginationDTO.offset;
    this.paginator.pageSize = this.paginationDTO.limit;
    this.paginator.length = this.paginationDTO.totalSize;
    //clear selection
    this.selection = new SelectionModel<Quotation>(true, []);

    // Refreshing table using paginator

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.paginationDTO.searchWith = filterValue;
    this.getData();
  }
  onPaginateChange(event) {
    this.offset = event.pageIndex;
    this.limit = event.pageSize;
    this.getData();
  }
  Filter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  getData(){
    var obj = {
      'limit':this.limit,
      'offset':this.offset,
    }
    this.getService.getQuotation(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Quotation>(data.responseModel);
      this.dataSource.sort = this.sort;
    })
  }
  create() {
    this.router.navigate(['quotation/quotation-create'])
  }

  // Delete(option){
  //   {
  //     if (this.getCheckedValue().length >= 1) {
  //       Swal.fire({
  //         title: 'Confirm?',
  //         text: "Are you sure? You want to " + option + " !",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes, ' + option + ' it!'
  //       }).then((result) => {
  //         if (result.value) {
            
  // let quotationId = [];
  // this.getCheckedValue().forEach(item => { quotationId.push(item.quotationId)
  // })
  // let obj={
  //   'customerId': this.customerId,
  //   'districtId': this.districtId,
  //   'quotationId':quotationId,
  // }
  // this.getService.Delete(obj).subscribe((data) => {
  //   Swal.fire({
  //     icon: "success",
  //     title: "Deleted Quotation Successfull",
  //     timer: 2500
  //   }).then(function(){
  //     window.location.reload();
  // });
   
  // })
  // }
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Delete Quotation",
  //         text: "Please Select One Quotation !",
  //       });
  //     }
  // }
  // }
}
