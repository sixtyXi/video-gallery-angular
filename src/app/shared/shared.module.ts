import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDurationPipe } from './pipes/format-duration.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ FormatDurationPipe ],
  imports: [ CommonModule ],
  exports: [ FormatDurationPipe, CommonModule, FormsModule ]
})
export class SharedModule {}
