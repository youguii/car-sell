import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstCharUpperscasePipe } from './first-char-upperscase.pipe';
import { SafeUrlPipe } from './safe-url.pipe';



@NgModule({
  declarations: [
    FirstCharUpperscasePipe,
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FirstCharUpperscasePipe,
    SafeUrlPipe
  ]
})
export class PipesModule { }
