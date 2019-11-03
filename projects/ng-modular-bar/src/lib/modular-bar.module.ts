import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModularBarComponent } from './modular-bar.container';
import { ModularBarBaseComponent } from './pages/base/base.component';
import { ModularBarIndicatorComponent } from './pages/indicator/indicator.component';
import { IndicatorDirective } from './directives';
import { NumToArrayPipe, InsidePercentagePipe } from './pipes';

@NgModule({
	declarations: [
		ModularBarComponent,
		ModularBarBaseComponent,
		ModularBarIndicatorComponent,
		IndicatorDirective,
		NumToArrayPipe,
		InsidePercentagePipe,
	],
	imports: [
		CommonModule,
	],
	exports: [
		ModularBarComponent,
	]
})
export class ModularBarModule { }
