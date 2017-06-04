export class RandomHelper {

	static RandomIntInclusive(min: number, max: number): number{
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static FlipACoin(): boolean{
		let result = this.RandomIntInclusive(0,1);
		if(result == 0)
			return false;
		else
			return true;
	}

	static RandomString(array: string[]): string{
		return array[this.RandomIntInclusive(0,array.length - 1)];
	}
}
