export function serializePatterns(patterns: TPattern[]): TSerializedPattern[] {
	return patterns.map(({ regex, isActive }) => ({
		source: regex.source,
		flags: regex.flags,
		isActive
	}));
}

export function unserializePatterns(serializedPatterns: TSerializedPattern[]): TPattern[] {
	return serializedPatterns.map(({ flags, source, isActive }) => ({
		regex: new RegExp(source, flags),
		isActive
	}));
}

export interface TPattern {
	regex: RegExp;
	isActive: boolean;
}

export interface TSerializedPattern extends Omit<TPattern, 'regex'> {
	source: string;
	flags: string;
}
