import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularBarComponent } from './modular-bar.container';
import { ModularBarBaseComponent } from './pages/base/base.component';
import { ModularBarIndicatorComponent } from './pages/indicator/indicator.component';
import { NumToArrayPipe, InsidePercentagePipe } from './pipes/';
import { ModularBarModule } from './modular-bar.module';

// TODO: Write tests
describe('ModularBarComponent', () => {
	let component: ModularBarComponent;
	let fixture: ComponentFixture<ModularBarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				ModularBarModule
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModularBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
