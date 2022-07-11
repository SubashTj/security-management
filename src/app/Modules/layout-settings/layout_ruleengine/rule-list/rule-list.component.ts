import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { PaginationDTO } from 'src/app/modules/model/paginationDTO';
import Swal from 'sweetalert2';
import { RuleEngine } from '../../Model/ruleengine.model';
import { LayoutService } from '../../service/layout.service';
import { RuleCreateComponent } from '../rule-create/rule-create.component';
import { RuleUpdateComponent } from '../rule-update/rule-update.component';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit {
  paginationDTO: PaginationDTO = new PaginationDTO();
  displayedColumns: string[] = ['select','layoutCategoryName','layoutPositionName','activeStatus'];
  dataSource = new MatTableDataSource<RuleEngine>();
  selection = new SelectionModel<RuleEngine>(true, []);
  rule: any;
  id: string;
  pageSizeOptions: any = 0;
  value = "";
  customerId: string;
  districtId: string;
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
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

  checkboxLabel(row?: RuleEngine): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ruleId + 1}`;
  }
  isMultiStatus(status: string) {
    const others = this.getCheckedValue().filter(rol => {
      if (rol.activeStatus != status) {
        return rol;
      }
    });
    return others.length > 0;
  }
  getCheckedValue(): RuleEngine[] {
    let transList: RuleEngine[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  constructor(private config:ConfigService,public dialog: MatDialog,private getService:LayoutService,private loader:AppLoaderService) { 
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
    this. getData();
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
    this.selection = new SelectionModel<RuleEngine>(true, []);

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
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getRule(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<RuleEngine>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }
  create() {
    const dialogRef = this.dialog.open(RuleCreateComponent, {
      disableClose: true,
    });
  }
  Delete(option){
    {
      if (this.getCheckedValue().length >= 1) {
        Swal.fire({
          title: 'Confirm?',
          text: "Are you sure? You want to " + option + " !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, ' + option + ' it!'
        }).then((result) => {
          if (result.value) {
            let ids = [];
 
            this.getCheckedValue().forEach(item => { ids.push(item.ruleId)
          })
  let obj={
    'customerId': this.customerId,
    'districtId': this.districtId,
    'ruleId':ids,
  }
  this.getService.deleterule(obj).subscribe((data) => {
    Swal.fire({
      icon: "success",
      title: "Layout-Rule Deleted Successfull",
      timer: 2500
    }).then(function(){
      window.location.reload();
  });
  })
          } else {
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Layout-Rule",
          text: "Please Select One Layout-Rule!",
        });
      }
  }
  }
  action(option) {
    if (this.getCheckedValue().length == 1) {
      Swal.fire({
        title: 'Confirm?',
        text: "Are you sure? You want to " + option + " !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ' + option + ' it!'
      }).then((result) => {
        if (result.value) {
          this.rule = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(RuleUpdateComponent, {
            disableClose: true,
            data: { payload: this.rule },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.dataSource.sort = this.sort;
            }
          });
        } else {
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Layout-Rule",
        text: "Please Select One Layout-Rule!",
      });
    }
}
  setStaus(activeStatus: number) {
    let lblAction = '';
    if (activeStatus == 1) {
      lblAction = 'active';
    }
    else if (activeStatus == 0) {
      lblAction = 'Inactive';
    }
    // else if (employeeActiveStatus == 2) {
    //   lblAction = 'delete';
    // }
    if (this.getCheckedValue().length >= 1) {
      let oppStatus = activeStatus == 1 ? 0 : 1;
      if (activeStatus == 2) {
        this.statusAlert(lblAction, activeStatus);
      } else if (this.getCheckedValue()[0].activeStatus== '3') {
        Swal.fire({
          icon: 'error',
          title: 'Layout-Rule Status',
          text: 'Layout-Rule registration incompleted so can not ' + lblAction + '!',
        })
      }
      else if (!this.isMultiStatus(String(oppStatus))) {
        this.statusAlert(lblAction, activeStatus);
      } else {
        let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
        Swal.fire({
          icon: 'error',
          title: 'Layout-Rule Status',
          text: 'Please select the ' + opplblAction + ' status of the Layout-Rule!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: activeStatus == 2 ? 'Delete Layout-Rule' : 'Change Layout-Rule Status',
        text: 'Please Select Altleast One Layout-Rule!',
      });
    }
  }
  statusAlert(lblAction: string, activeStatus) {
    Swal.fire({
      title: 'Confirm?',
      text: "Are you sure? You want to " + lblAction + " it !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ' + lblAction + ' it!'
    }).then((result) => {
      if (result.value) {
        this.saveStatus(activeStatus);
      }
    });
  }
  saveStatus(activeStatus) {
    let ids = [];
    this.getCheckedValue().forEach(item => { ids.push(item.ruleId)
   
  })
    let obj =  {
      "ruleId":ids,
      "customerId":this.customerId,
      "districtId":this.districtId,
      "activeStatus":activeStatus
  }  
    this.getService.StatusRule(obj).subscribe((res) => {
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: " Layout-Rule Status Changed Successfull",
          timer: 2500
        }).then(function(){
          window.location.reload();
      });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Layout-Rule Status Change Failed",
          timer: 2500
      
        }).then(function(){
          window.location.reload();
      });
        
      }
    });
  }
}
