// datetime.js - Functions to deal with date/time input

// IMPORTANT - All dates in the project are done in UTC. Timezones are not supported in the slightest. This is intentional.

export function toDateString(date: Date): string {
	return `${date.getUTCFullYear().toString().padStart(4, "0")}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
}

export function fromDateString(str: string): Date {
	const a = str.split("-").map((x) => Number(x));
	return new Date(Date.UTC(a[0], a[1] - 1, a[2]));
}

export function toDateTimeString(date: Date): string {
	const a = new Date(date);
	return a.toISOString().slice(0, 19);
}

export function fromDateTimeString(str: string): Date {
	const d = new Date(str);
	d.setTime(d.getTime() + d.getTimezoneOffset() * 60000);
	return d;
}

export function beginningOfDay(date: Date | number): number {
	const d = new Date(typeof date == "number" ? date : date.getTime());
	d.setUTCHours(0, 0, 0, 0);
	return d.getTime();
}
