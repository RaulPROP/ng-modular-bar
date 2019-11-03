import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularBarIndicatorComponent } from './indicator.component';
import { IndicatorDirective } from '../../directives';

// TODO: Write tests
describe('ModularBarIndicatorComponent', () => {
	let component: ModularBarIndicatorComponent;
	let fixture: ComponentFixture<ModularBarIndicatorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ModularBarIndicatorComponent,
				IndicatorDirective,
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModularBarIndicatorComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		component.maxValue = 100;
		component.minValue = 0;
		component.value = 0;
		component.label = '';
		component.ticks = 1;
		component.canBeModified = true;

		fixture.detectChanges();

		expect(component).toBeTruthy();
	});
});
