import { IndicatorDirective } from './indicator.directive';
import { Component, DebugElement, ViewEncapsulation } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
	template: `
	<div class="__mb-wrapper">

		<div class="__mb-indicator-wrapper">

			<div class="__mb-indicator" libModularBarIndicator [value]="value"></div>

		</div>

	</div>
	`,
	styleUrls: ['../modular-bar.container.css', '../pages/indicator/indicator.component.css'],
	encapsulation: ViewEncapsulation.None,
})
class TestComponent {

	public value = 0;

	public mouseDown = false;

	constructor() {}

	onMouseDown() {
		this.mouseDown = true;
	}

}

@Component({
	template: '<div libModularBarIndicator class="indicator"></div>'
})
class BadTestComponent {}

describe('IndicatorDirective', () => {

	let badFixture: ComponentFixture<BadTestComponent>;
	let badComponent: BadTestComponent;

	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let indicatorEl: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TestComponent,
				BadTestComponent,
				IndicatorDirective,
			]
		});

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		indicatorEl = fixture.debugElement.query(By.css('.__mb-indicator'));

		badFixture = TestBed.createComponent(BadTestComponent);
		badComponent = badFixture.componentInstance;
	});

	it('should throw an error if not given a value', () => {
		expect(() => badFixture.detectChanges()).toThrowError('Value needed!');
	});

	it('should create component if given a value', () => {
		expect(component).toBeDefined();
	});

	// TODO: Write more tests
});
