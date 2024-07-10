export function isFilledArray<T>(obj: T[]) {
	return (
		Boolean(obj) &&
		Array.isArray(obj) &&
		obj.flat().length > 0 &&
		obj.flat()[0] !== null &&
		obj.flat()[0] !== undefined
	);
}
