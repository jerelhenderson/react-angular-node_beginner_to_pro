import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

import { CamelizePipe } from 'ngx-pipes';

import { MapComponent } from './map.component';

import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: '***REMOVED***'
    }),
    CommonModule
  ],
  providers: [
    MapService,
    CamelizePipe
  ],
  bootstrap: []
})
export class MapModule { }