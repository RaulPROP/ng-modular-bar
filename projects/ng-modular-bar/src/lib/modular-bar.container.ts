import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lib-modular-bar',
	templateUrl: './modular-bar.container.html',
	styleUrls: ['./modular-bar.container.css'],
	encapsulation: ViewEncapsulation.None,
})
export class ModularBarComponent {

	@Input()
	public canBeModified = true;

	@Input()
	public maxValue = 100;

	@Input()
	public minValue = 0;

	@Input()
	public separations = 4;

	@Input()
	public value = 0;

	@Input()
	public ticks = 1;

	@Input()
	public label = '';

	@Input()
	public canBeHovered = true;

	public hoveredValue = null;

	@Output('valueChange')
	private valueChangeEvent: EventEmitter<number> = new EventEmitter<number>();

	@Output('valueHovered')
	private valueHoveredEvent: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	public onNewValue(value: number): void {
		console.log(value);
		this.value = value;
		this.valueChangeEvent.emit(value);
	}

	public onValueHover(value: number): void {
		if (this.canBeHovered) {
			this.valueHoveredEvent.emit(value);
			this.hoveredValue = value;
		}
	}

	public onValueClick(value: number): void {
		if (this.canBeHovered) {
			this.onNewValue(value);
		}
	}
}
