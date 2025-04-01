export class Day {
	public constructor(
		public readonly year: number,
		public readonly month: number,
		public readonly day: number
	) {}

	equals(other: Day): boolean {
		return this.year === other.year && this.month === other.month && this.day === other.day;
	}

	toISOString(): string {
		return `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`;
	}
}