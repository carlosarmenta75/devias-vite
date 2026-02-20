function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
		: null;
}

function createPaletteFromHex(hex) {
	const rgb = hexToRgb(hex);
	if (!rgb) return {};

	const { r, g, b } = rgb;

	const lighten = (amount) => {
		const nr = Math.min(255, Math.round(r + (255 - r) * amount));
		const ng = Math.min(255, Math.round(g + (255 - g) * amount));
		const nb = Math.min(255, Math.round(b + (255 - b) * amount));
		return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
	};

	const darken = (amount) => {
		const nr = Math.round(r * (1 - amount));
		const ng = Math.round(g * (1 - amount));
		const nb = Math.round(b * (1 - amount));
		return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
	};

	return {
		50: lighten(0.95),
		100: lighten(0.9),
		200: lighten(0.7),
		300: lighten(0.4),
		400: lighten(0.2),
		500: hex,
		600: darken(0.1),
		700: darken(0.2),
		800: darken(0.3),
		900: darken(0.4),
		950: darken(0.5),
	};
}

export const californiaPrimaryColors = {
	oceanside: createPaletteFromHex("#046b99"),
	delta: createPaletteFromHex("#0d4f8b"),
	eureka: createPaletteFromHex("#2e5266"),
	sacramento: createPaletteFromHex("#003d5b"),
	mono: createPaletteFromHex("#004876"),
	orangeCounty: createPaletteFromHex("#a15801"),
	santaBarbara: createPaletteFromHex("#275e42"),
	santaCruz: createPaletteFromHex("#0f4fa8"),
	shasta: createPaletteFromHex("#336b35"),
	sierra: createPaletteFromHex("#3f6e2e"),
	trinity: createPaletteFromHex("#21576a"),
	pasoRobles: createPaletteFromHex("#6a3420"),
};

export const californiaSecondaryColors = {
	oceanside: createPaletteFromHex("#4993b5"),
	delta: createPaletteFromHex("#4a90c5"),
	eureka: createPaletteFromHex("#6fa3b5"),
	sacramento: createPaletteFromHex("#5a9bb8"),
	mono: createPaletteFromHex("#5896bc"),
	orangeCounty: createPaletteFromHex("#c47b2b"),
	santaBarbara: createPaletteFromHex("#5a9178"),
	santaCruz: createPaletteFromHex("#5b8fd4"),
	shasta: createPaletteFromHex("#6a9d6c"),
	sierra: createPaletteFromHex("#6fa35c"),
	trinity: createPaletteFromHex("#5a8c9e"),
	pasoRobles: createPaletteFromHex("#9b6b55"),
};

export const californiaHighlightColors = {
	oceanside: createPaletteFromHex("#fdb81e"),
	delta: createPaletteFromHex("#f9a825"),
	eureka: createPaletteFromHex("#ff9800"),
	sacramento: createPaletteFromHex("#ffa726"),
	mono: createPaletteFromHex("#ffb300"),
	orangeCounty: createPaletteFromHex("#fdb81e"),
	santaBarbara: createPaletteFromHex("#fdb81e"),
	santaCruz: createPaletteFromHex("#fdb81e"),
	shasta: createPaletteFromHex("#fdb81e"),
	sierra: createPaletteFromHex("#fdb81e"),
	trinity: createPaletteFromHex("#fdb81e"),
	pasoRobles: createPaletteFromHex("#fdb81e"),
};

export const californiaStandoutColors = {
	oceanside: createPaletteFromHex("#323a45"),
	delta: createPaletteFromHex("#37474f"),
	eureka: createPaletteFromHex("#263238"),
	sacramento: createPaletteFromHex("#455a64"),
	mono: createPaletteFromHex("#546e7a"),
	orangeCounty: createPaletteFromHex("#3b3a48"),
	santaBarbara: createPaletteFromHex("#1b3c2a"),
	santaCruz: createPaletteFromHex("#0a2f64"),
	shasta: createPaletteFromHex("#2a3b2c"),
	sierra: createPaletteFromHex("#2d4b23"),
	trinity: createPaletteFromHex("#1a3d4b"),
	pasoRobles: createPaletteFromHex("#3b1e12"),
};

export const californiaThemes = [
	{
		id: "oceanside",
		name: "Oceanside",
		description: "Default California theme",
	},
	{
		id: "delta",
		name: "Delta",
		description: "Delta region theme",
	},
	{
		id: "eureka",
		name: "Eureka",
		description: "Eureka region theme",
	},
	{
		id: "sacramento",
		name: "Sacramento",
		description: "Sacramento region theme",
	},
	{
		id: "mono",
		name: "Mono",
		description: "Mono region theme",
	},
	{
		id: "orangeCounty",
		name: "Orange County",
		description: "Orange County theme",
	},
	{
		id: "santaBarbara",
		name: "Santa Barbara",
		description: "Santa Barbara region theme",
	},
	{
		id: "santaCruz",
		name: "Santa Cruz",
		description: "Santa Cruz region theme",
	},
	{
		id: "shasta",
		name: "Shasta",
		description: "Shasta region theme",
	},
	{
		id: "sierra",
		name: "Sierra",
		description: "Sierra region theme",
	},
	{
		id: "trinity",
		name: "Trinity",
		description: "Trinity region theme",
	},
	{
		id: "pasoRobles",
		name: "Paso Robles",
		description: "Paso Robles region theme",
	},
];
