import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lib-modular-bar-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class ModularBarBaseComponent {

	@Input()
	public separations: number;

	@Input()
	public value: number;

	@Input()
	public gapsPerSeparation: number;

	@Input()
	public canBeHovered = true;

	@Input()
	public hoveredValue: number;

	@Output('valueHover')
	private valueHoverEvent: EventEmitter<number> = new EventEmitter<number>();

	@Output('valueClick')
	private valueClickedEvent: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	public onHoverItem(separation: number, gap: number): void {
		if (separation !== null) {
			const value = (separation * this.gapsPerSeparation) + gap + 1;
			const percentage = value / (this.separations * this.gapsPerSeparation);
			this.valueHoverEvent.emit(percentage);
		} else {
			this.valueHoverEvent.emit(null);
		}
	}

	public onClickItem(separation: number, gap: number): void {
		const value = (separation * this.gapsPerSeparation) + gap + 1;
		const percentage = value / (this.separations * this.gapsPerSeparation);
		this.valueClickedEvent.emit(percentage);
	}
}
