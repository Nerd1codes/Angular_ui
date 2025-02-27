import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  AdaptCodeViewerModule,
  AdaptModalModule,
  AdaptRxCheckboxModule,
  AdaptRxLabelModule,
  AdaptRxRadiobuttonModule,
  AdaptRxUploaderModule,
  AdaptRxValidatorsModule
} from '@bmc-ux/adapt-angular';
import {ComponentChildRoutes} from '../../app.routes';
import {DocsEnumToArrayPipeModule} from '../../pages/shared/pipes/enum-to-array.pipe';
import {UCEModule} from '../uce/uce.module';

import {AdaptRxUploaderDemoComponent} from './rx-uploader.demo';
import {RX_UPLOADER_EXAMPLES} from './rx-uploader.example';
import {UploaderService} from '../../utils/uploader.service';

function UploaderFactory(http: HttpClient): UploaderService {
  return new UploaderService(http);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ComponentChildRoutes),
    AdaptRxCheckboxModule,
    AdaptRxLabelModule,
    AdaptRxRadiobuttonModule,
    AdaptModalModule,
    AdaptRxUploaderModule,
    DocsEnumToArrayPipeModule,
    AdaptRxValidatorsModule,
    UCEModule,
    AdaptCodeViewerModule
  ],
  declarations: [...RX_UPLOADER_EXAMPLES, AdaptRxUploaderDemoComponent],
  providers: [
    {
      provide: 'UploaderService',
      useFactory: UploaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class DocsRxUploaderModule {
}