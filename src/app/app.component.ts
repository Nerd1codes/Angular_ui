import { Component, ViewChild } from '@angular/core';
import {
  AdaptRxUploaderComponent,
  FileObj,
  FileSize,
  UploaderMode,
  UploaderSelectionMode,
  AdaptDeviceDetectionService
} from '@bmc-ux/adapt-angular';
import { DemoComponentState } from '../../utils/common-state.enum';
import { adaptLog } from '../../utils/logger';

@Component({
  selector: 'adapt-rx-uploader-demo',
  templateUrl: './rx-uploader.demo.html'
})
export class AdaptRxUploaderDemoComponent {
  disabled: boolean = false;
  readonly: boolean = false;
  isDnd: boolean = true;
  isMultiple: boolean = true;
  disabledMode: boolean = false;
  minFileSize: string = FileSize.MB.toString();
  uploaderModel: FileObj[] = [];

  state: string[] = Object.values(DemoComponentState);
  currentRxUploaderState: DemoComponentState = DemoComponentState.DEFAULT;

  mode: typeof UploaderSelectionMode = UploaderSelectionMode;
  currentUploaderMode: UploaderSelectionMode = UploaderSelectionMode.File;

  type: typeof UploaderMode = UploaderMode;
  currentUploadType: UploaderMode = UploaderMode.Auto;

  isMobile: boolean;

  @ViewChild(AdaptRxUploaderComponent) uploader: AdaptRxUploaderComponent;

  get uploadLimit(): boolean {
    return this.uploaderModel && this.uploaderModel.length === this.uploader.filesCount
      && this.uploaderModel.every(file => file.uploaded === 100);
  }

  constructor(private _deviceDetectorService: AdaptDeviceDetectionService) {
    this.isMobile = this._deviceDetectorService.deviceMobile();
  }

  stateChanged(data: DemoComponentState): void {
    this.disabled = data === DemoComponentState.DISABLED;
    this.readonly = data === DemoComponentState.READONLY;
  }

  modeChanged(): void {
    this.uploaderModel = [];
  }

  multipleDisabled(): void {
    if (!this.isMultiple) {
      this.disabledMode = true;
      this.uploaderModel = [];
      return;
    }
    this.disabledMode = false;
  }

  uploadFiles(): void {
    this.uploader.startUploading();
  }

  onFinishedFileUploading(files: FileObj[]): void {
    adaptLog('FINISHED FILE UPLOADING: ', files);
  }

  onEndFileUploading(file: FileObj): void {
    adaptLog('END FILE UPLOADING: ', file);
  }
}