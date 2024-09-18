export function getPastelColor(seed: string): string {
	const hashArray = Array.from(new TextEncoder().encode(seed))
	const hashInt = hashArray.reduce((acc, byte) => acc * 256 + byte, 0)
	const hue = hashInt % 360
	const saturation = 70 + (hashInt % 30) // 70-100%
	const lightness = 55 + (hashInt % 20) // 45-65%
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
