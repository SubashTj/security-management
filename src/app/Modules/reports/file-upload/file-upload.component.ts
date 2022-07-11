import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { PaginationDTO } from '../../model/paginationDTO';
import { FileUploadCreateComponent } from '../file-upload-create/file-upload-create.component';
import { FileUpload } from '../Model/file.model';
import { ReportService } from '../service/report.service';
import { ApiService } from 'src/app/core/service/api.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  displayedColumns: string[] = ['select', 'documentTitle', 'fileName', 'activeStatus'];
  dataSource = new MatTableDataSource<FileUpload>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<FileUpload>(true, []);
  pageSizeOptions: any = 0;
  responseModel: any;
  department: any;
  departmentId: any;
  value = "";
  customerId: string;
  districtId: string;
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  pdfName: any;
  recordAddedSub: Subscription;
  recordUpdatedSub: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  id: any;

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
  getCheckedValue(): FileUpload[] {
    let transList: FileUpload[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  checkboxLabel(row?: FileUpload): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pdfFile + 1}`;
  }
  constructor(public config: ConfigService, public dialog: MatDialog, private getService: ReportService, private modelService: ApiService, private loader: AppLoaderService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
    this.pageSizeOptions = constant().app.table.filtering.pageSizeOptions;
    this.paginationDTO = new PaginationDTO();
    this.offset = this.paginationDTO.offset
    this.limit = this.paginationDTO.limit
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
    this.selection = new SelectionModel<FileUpload>(true, []);

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
  getData() {
    // var obj = {
    //   'limit':this.limit,
    //   'offset':this.offset,
    //   'customerId': this.customerId,
    //   'districtId': this.districtId
    // }
    this.getService.getFile().subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<FileUpload>(data.responseModel);
      this.dataSource.sort = this.sort;
    })
  }



  create() {
    const dialogRef = this.dialog.open(FileUploadCreateComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.sort = this.sort;
      }
    });
  }
  // action(download){
  //   if (this.getCheckedValue().length == 1) {
  //   this.getService.getFile().subscribe((data) => {
  //   })
  // }
  // }
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

          this.department = this.getCheckedValue()[0];
          // let obj = { 'file': this.department.fileName }
          this.modelService.downloadFile(`pdf/get-pdf/${this.department.fileName}`).subscribe((data) => {
            switch (data.type) {
              case HttpEventType.DownloadProgress:
                this.loader.close();
                break;
              case HttpEventType.Response:
                const downloadedFile = new Blob([data.body], {
                  type: data.body.type,
                });
                const a = document.createElement("a");
                a.setAttribute("style", "display:none;");
                document.body.appendChild(a);
                a.download =
                  this.pdfName ??
                  this.department.fileName;
                a.href = URL.createObjectURL(downloadedFile);
                a.target = "_blank";
                a.click();
                document.body.removeChild(a);
                this.loader.close();
                break;
            }
          });
        } else {
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Download File",
        text: "Please Select One File!",
      });
    }
  }
  Delete(option) {
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

            let id = [];
            this.getCheckedValue().forEach(item => {
              id.push(item.id)
              this.id = item.id
            })
            let obj = {
              // 'customerId': this.customerId,
              // 'districtId': this.districtId,
              'id': this.id,
            }
            this.getService.Delete(obj).subscribe((data) => {
              Swal.fire({
                icon: "success",
                title: "Deleted File Successfull",
                timer: 2500
              }).then(function () {
                window.location.reload();
              });

            })
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete File",
          text: "Please Select One File !",
        });
      }
    }
  }
  // setStaus(activeStatus: number) {
  //   let lblAction = '';
  //   if (activeStatus == 1) {
  //     lblAction = 'active';
  //   }
  //   else if (activeStatus == 0) {
  //     lblAction = 'Inactive';
  //   }

  //   if (this.getCheckedValue().length >= 1) {
  //     let oppStatus = activeStatus == 1 ? 0 : 1;
  //     if (activeStatus == 2) {
  //       this.statusAlert(lblAction, activeStatus);
  //     } else if (this.getCheckedValue()[0].activeStatus== '3') {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'File Status',
  //         text: 'File registration incompleted so can not ' + lblAction + '!',
  //       })
  //     }
  //     else if (!this.isMultiStatus(String(oppStatus))) {
  //       this.statusAlert(lblAction, activeStatus);
  //     } else {
  //       let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'File Status',
  //         text: 'Please select the ' + opplblAction + ' status of the File!',
  //       });
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: activeStatus == 2 ? 'Delete Department' : 'Change File Status',
  //       text: 'Please Select Altleast One Department!',
  //     });
  //   }
  // }
  // statusAlert(lblAction: string, activeStatus) {
  //   Swal.fire({
  //     title: 'Confirm?',
  //     text: "Are you sure? You want to " + lblAction + " it !",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, ' + lblAction + ' it!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.saveStatus(activeStatus);
  //     }
  //   });
  // }
  // saveStatus(activeStatus) {
  //   let ids = [];
  //   this.getCheckedValue().forEach(item => { ids.push(item.departmentId)
  //     this.departmentId=item.departmentId 
  // })
  //   let obj = {
  //     'customerId': this.customerId,
  //     'districtId': this.districtId,
  //     'departmentId':ids,
  //     'activeStatus':activeStatus
  //   }
  //   this.getService.status(obj).subscribe((res) => {
  //     if (res.statusMessage == 'Success') {
  //       Swal.fire({
  //         icon: "success",
  //         title: " Department Status Changed Successfull",
  //         timer: 2500
  //       }).then(function(){
  //         window.location.reload();
  //     });
  //     }
  //     else {
  //       Swal.fire({
  //         icon: "error",
  //         title: " Department Status Change Failed",
  //         timer: 2500

  //       }).then(function(){
  //         window.location.reload();
  //     });

  //     }

  //   });
  // }

}
