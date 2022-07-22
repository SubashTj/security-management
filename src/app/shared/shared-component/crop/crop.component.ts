import { Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Cropper from 'cropperjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ImageCropperSetting {
  width: number;
  height: number;
}

export interface ImageCropperResult {
  imageData: Cropper.ImageData;
  cropData: Cropper.CropBoxData;
  blob?: Blob;
  dataUrl?: string;
}

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CropComponent implements OnInit {


  @ViewChild('image') image: ElementRef;
  imageUrl: any = '';
  settings: ImageCropperSetting;
  cropbox: Cropper.CropBoxData;
  loadImageErrorText: string;
  cropperOptions: any = {};

  export = new EventEmitter<ImageCropperResult>();
  ready = new EventEmitter();

  public isLoading: boolean = true;
  public cropper: Cropper;
  public imageElement: HTMLImageElement;
  public loadError: any;
  public event: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<CropComponent>) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.readFile(this.data.payload).then(uri => {
      this.imageUrl = uri;
    });
  }


  crop() {
    this.exportCanvas().then(res => {
      this.dialogRef.close(res);
    });

  }

  discard() {
    this.dialogRef.close(0);
  }

  /**
   * Image loaded
   * @param ev
   */
  imageLoaded(ev: Event) {

    //
    // Unset load error state
    this.loadError = false;

    //
    // Setup image element
    const image = ev.target as HTMLImageElement;
    this.imageElement = image;

    //
    // Add crossOrigin?
    if (this.cropperOptions.checkCrossOrigin) image.crossOrigin = 'anonymous';

    //
    // Image on ready event
    image.addEventListener('ready', () => {
      //
      // Emit ready
      this.ready.emit(true);

      //
      // Unset loading state
      this.isLoading = false;

      //
      // Validate cropbox existance
      if (this.cropbox) {

        // Set cropbox data
        this.cropper.setCropBoxData(this.cropbox);
      }
    });

    //
    // Setup aspect ratio according to settings
    let aspectRatio = NaN;
    if (this.settings) {
      const { width, height } = this.settings;
      aspectRatio = width / height;
    }

    //
    // Set crop options
    // extend default with custom config
    this.cropperOptions = Object.assign({
      aspectRatio,
      movable: false,
      scalable: false,
      zoomable: false,
      viewMode: 1,
      checkCrossOrigin: true
    }, this.cropperOptions);

    //
    // Set cropperjs
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = undefined;
    }
    this.cropper = new Cropper(image, this.cropperOptions);
  }

  /**
   * Image load error
   * @param event
   */
  imageLoadError(event: any) {

    //
    // Set load error state
    this.loadError = true;

    //
    // Unset loading state
    this.isLoading = false;
  }

  /**
   * Export canvas
   * @param base64
   */
  exportCanvas(base64?: any) {

    //
    // Get and set image, crop and canvas data
    const imageData = this.cropper.getImageData();
    const cropData = this.cropper.getCropBoxData();
    const canvas = this.cropper.getCroppedCanvas();
    const data = { imageData, cropData };

 
    // Create promise to resolve canvas data
    return new Promise(resolve => {
      canvas.toBlob(blob => resolve({
        blobData: blob,
        dataUrl: canvas.toDataURL('image/png')
      }));
    });
  }



  readFile(file) {
    return new Promise<string>((resolve, reject) => {
      let fr = new FileReader();
      fr.onload = x => resolve(fr.result as string);
      fr.readAsDataURL(file);
    });
  }



}
