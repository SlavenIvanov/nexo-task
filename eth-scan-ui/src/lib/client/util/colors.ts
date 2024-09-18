export function getPastelColor(seed: string): string {
	const hashArray = Array.from(new TextEncoder().encode(seed))
	const hashInt = hashArray.reduce((acc, byte) => acc * 256 + byte, 0)

	// Material Design color palette hues (full spectrum for more variety)
	const materialHues = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350]
	const hueIndex = hashInt % materialHues.length
	const hue = materialHues[hueIndex]

	// Increase saturation and adjust lightness for more vibrant colors
	const saturation = 75 + (hashInt % 25) // 75-100%
	const lightness = 45 + (hashInt % 20) // 45-65%

	return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
