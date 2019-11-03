import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModularBarBaseComponent } from './base.component';
import { NumToArrayPipe, InsidePercentagePipe } from '../../pipes';

// TODO: Write tests
describe('ModularBarBaseComponent', () => {
	let component: ModularBarBaseComponent;
	let fixture: ComponentFixture<ModularBarBaseComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ModularBarBaseComponent,
				NumToArrayPipe,
				InsidePercentagePipe,
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ModularBarBaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
