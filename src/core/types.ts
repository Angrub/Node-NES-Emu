export type MOS6502instruction =
	| "BRK"
	| "LDA"
	| "LDX"
	| "LDY"
	| "STA"
	| "STX"
	| "STY";

export type MOS6502SnapShot = {
	cpuHalted: boolean;
	programCounter: number;
	stackPointer: number;
	accumulator: number;
	X: number;
	Y: number;
	processStatus: number;
	ram: Uint8Array;
	cartridgesMemory: Uint8Array;
};

export enum AddressingMode {
	IMPLICIT = "IMPLICIT",
	IMMEDIATE = "IMMEDIATE",
	ZERO_PAGE = "ZERO_PAGE",
	ZERO_PAGE_X = "ZERO_PAGE_X",
	ZERO_PAGE_Y = "ZERO_PAGE_Y",
	ABSOLUTE = "ABSOLUTE",
	ABSOLUTE_X = "ABSOLUTE_X",
	ABSOLUTE_Y = "ABSOLUTE_Y",
	RELATIVE = "RELATIVE",
	INDIRECT = "INDIRECT",
	INDIRECT_X = "INDIRECT_X",
	INDIRECT_Y = "INDIRECT_Y",
}

export const Opcodes = {
// export const Opcodes: Record<
// 	MOS6502instruction,
// 	Partial<Record<AddressingMode, number>>
// > = {
	BRK: {
		IMPLICIT: 0x00,
	},
	LDA: {
		IMMEDIATE: 0xa9,
		ZERO_PAGE: 0xa5,
		ZERO_PAGE_X: 0xb5,
		ABSOLUTE: 0xad,
		ABSOLUTE_X: 0xbd,
		ABSOLUTE_Y: 0xb9,
		INDIRECT_X: 0xa1,
		INDIRECT_Y: 0xb1,
	},
	LDX: {
		IMMEDIATE: 0xa2,
		ZERO_PAGE: 0xa6,
		ZERO_PAGE_Y: 0xb6,
		ABSOLUTE: 0xae,
		ABSOLUTE_Y: 0xbe,
	},
	LDY: {
		IMMEDIATE: 0xa0,
		ZERO_PAGE: 0xa4,
		ZERO_PAGE_X: 0xb4,
		ABSOLUTE: 0xac,
		ABSOLUTE_X: 0xbc,
	},
	STA: {
		ZERO_PAGE: 0x85,
		ZERO_PAGE_X: 0x95,
		ABSOLUTE: 0x8d,
		ABSOLUTE_X: 0x9d,
		ABSOLUTE_Y: 0x99,
		INDIRECT_X: 0x81,
		INDIRECT_Y: 0x91,
	},
	STX: {
		ZERO_PAGE: 0x86,
		ZERO_PAGE_Y: 0x96,
		ABSOLUTE: 0x8e,
	},
	STY: {
		ZERO_PAGE: 0x84,
		ZERO_PAGE_X: 0x94,
		ABSOLUTE: 0x8c,
	}
};