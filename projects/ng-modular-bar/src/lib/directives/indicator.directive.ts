import { Directive, Input, OnInit, ElementRef, OnDestroy, Output, EventEmitter, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { fromEvent, Subscription, BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, mergeMap, tap, finalize } from 'rxjs/operators';

@Directive({
	selector: '[modularBarIndicator]'
})
export class IndicatorDirective implements OnInit, OnDestroy, OnChanges {
	private ngUnsubscribe: Subject<void> = new Subject<void>();

	@Input()
	private value: number;

	@Input()
	private minValue = 0;

	@Input()
	private maxValue = 100;

	@Input()
	private tick = 1;

	@Input()
	private editable = true;

	@Output('newValue')
	private newValueEvent: EventEmitter<number> = new EventEmitter<number>();

	private canBeModified: BehaviorSubject<boolean>;

	private moveSub: Subscription;

	private mouseMove$: Observable<Event>;
	private mouseUp$: Observable<Event>;
	private mouseDown$: Observable<Event>;

	private stopListening$: Subject<void> = new Subject<void>();

	private previousEditable = null;

	private static checkVariable(variable: any, error: string): void {

		if (variable === undefined) {
			throw new Error(error);
		}

	}

	constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

	ngOnInit(): void {
		IndicatorDirective.checkVariable(this.value, 'Value needed!');

		this.listenToEvents();

		this.canBeModified = new BehaviorSubject<boolean>(this.editable);

		this.stopListening$ = new Subject<void>();

		this.canBeModified.subscribe((editable) => {
			if (editable !== this.previousEditable) {
				if (editable) {
					this.mouseDown$.pipe(
						tap(this.onStartDrag.bind(this)),
						mergeMap(this.onDrag.bind(this))
					).subscribe(this.moveIndicator.bind(this));
				} else {
					this.stopListening$.next();
				}
			}

		});
	}

	ngOnChanges(changes: SimpleChanges): void {

	}

	ngOnDestroy(): void {
		if (this.moveSub) {
			this.moveSub.unsubscribe();
		}

		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	private onStartDrag(): void {
		this.renderer.addClass(this.el.nativeElement, '__mb-grabbed');
		this.renderer.setStyle(document.body, 'cursor', 'grabbing');
	}

	private onDrag(): Observable<Event> {
		return this.mouseMove$.pipe(
			takeUntil(this.mouseUp$),
			takeUntil(this.stopListening$),
			finalize(() => {
				this.renderer.removeStyle(document.body, 'cursor');
				this.renderer.removeClass(this.el.nativeElement, '__mb-grabbed');
			})
		);
	}

	private listenToEvents(): void {
		this.mouseUp$ = fromEvent(document, 'mouseup').pipe(
			takeUntil(this.ngUnsubscribe)
		);

		this.mouseMove$ = fromEvent(document, 'mousemove').pipe(
			takeUntil(this.ngUnsubscribe)
		);

		this.mouseDown$ = fromEvent(this.el.nativeElement, 'mousedown').pipe(
			takeUntil(this.ngUnsubscribe)
		);
	}

	private moveIndicator(event: MouseEvent): void {

		const { left, right } = this.el.nativeElement.parentElement.getBoundingClientRect();

		const rawPercentage = ((event.pageX - left) / (right - left));

		const percentage = Math.max(Math.min(rawPercentage, 1), 0);

		const inRange = (percentage * (this.maxValue - this.minValue)) + this.minValue;

		const separations = (this.maxValue - this.minValue) / this.tick;

		const module = Math.round(inRange % (separations + 1));

		const finalValue = (this.minValue + (module * this.tick)) / this.maxValue;

		this.newValueEvent.emit(finalValue);
	}

}
