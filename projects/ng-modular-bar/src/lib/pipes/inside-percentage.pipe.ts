import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'insidePercentage'
})
export class InsidePercentagePipe implements PipeTransform {

	transform(
		value: number,
		separations: number,
		currentSeparation: number,
		gapsPerSeparation: number,
		currentGap: number
	): boolean {
		const currentValue = (currentSeparation * gapsPerSeparation) + currentGap;

		const currentPercentage = currentValue / (separations * gapsPerSeparation);

		return currentPercentage < value;
	}

}
