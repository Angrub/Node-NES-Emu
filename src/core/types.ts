export type MOS6502instruction =
	| "BRK"
	| "LDA"
	| "LDX"
	| "LDY"
	| "STA"
	| "STX"
	| "STY"
	| "TAX"
	| "TAY"
	| "TXA"
	| "TYA"
	| "TSX"
	| "TXS"
	| "PHA"
	| "PHP"
	| "PLA"
	| "PLP"
	| "AND"
	| "EOR"
	| "ORA"
	| "BIT"
	| "ADC"
	| "SBC";

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
