export function toDateString(date: Date): string {
	return `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function fromDateString(str: string): Date {
	let a = str.split("-").map((x) => Number(x));
	return new Date(a[0], a[1] - 1, a[2]);
}

export function toDateTimeString(date: Date): string {
	let a = new Date(date);
	a.setMinutes(a.getMinutes() - a.getTimezoneOffset());
	return a.toISOString().slice(0, 19);
}

export function fromDateTimeString(str: string): Date {
	return new Date(str);
}
