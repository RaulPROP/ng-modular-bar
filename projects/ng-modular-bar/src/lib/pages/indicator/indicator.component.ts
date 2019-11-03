import { Component, Output, EventEmitter, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lib-modular-bar-indicator',
	templateUrl: './indicator.component.html',
	styleUrls: ['./indicator.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class ModularBarIndicatorComponent implements OnInit {

	@Input()
	public maxValue: number;

	@Input()
	public minValue: number;

	@Input()
	public value: number;

	@Input()
	public ticks: number;

	@Input()
	public label: string;

	@Input()
	public canBeModified: boolean;

	@Output('onNewValue')
	private newValueEvent: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit(): void {
		if (this.maxValue === this.minValue) {
			throw new Error('Max and Min values must be different!');
		}

		if (this.maxValue < this.minValue) {
			throw new Error('Max value must be greater than Min value');
		}

		console.log(this.canBeModified);
	}

	public onNewValue(value: number): void {
		this.newValueEvent.emit(value);
	}
}
