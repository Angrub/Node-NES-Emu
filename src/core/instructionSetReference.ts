import { AddressingMode, type MOS6502instruction, Opcodes } from "./types.js";

export type InstructionReference = {
	instruction: MOS6502instruction;
	addressingMode: AddressingMode;
};

export const instructionSetReference: [number, InstructionReference][] = [
	[
		Opcodes.BRK.IMPLICIT,
		{ instruction: "BRK", addressingMode: AddressingMode.IMPLICIT },
	],
	// LDA
	[
		Opcodes.LDA.IMMEDIATE,
		{ instruction: "LDA", addressingMode: AddressingMode.IMMEDIATE },
	],
	[
		Opcodes.LDA.ZERO_PAGE,
		{ instruction: "LDA", addressingMode: AddressingMode.ZERO_PAGE },
	],
	[
		Opcodes.LDA.ZERO_PAGE_X,
		{ instruction: "LDA", addressingMode: AddressingMode.ZERO_PAGE_X },
	],
	[
		Opcodes.LDA.ABSOLUTE,
		{ instruction: "LDA", addressingMode: AddressingMode.ABSOLUTE },
	],
	[
		Opcodes.LDA.ABSOLUTE_X,
		{ instruction: "LDA", addressingMode: AddressingMode.ABSOLUTE_X },
	],
	[
		Opcodes.LDA.ABSOLUTE_Y,
		{ instruction: "LDA", addressingMode: AddressingMode.ABSOLUTE_Y },
	],
	[
		Opcodes.LDA.INDIRECT_X,
		{ instruction: "LDA", addressingMode: AddressingMode.INDIRECT_X },
	],
	[
		Opcodes.LDA.INDIRECT_Y,
		{ instruction: "LDA", addressingMode: AddressingMode.INDIRECT_Y },
	],
	// LDX
	[
		Opcodes.LDX.IMMEDIATE,
		{ instruction: "LDX", addressingMode: AddressingMode.IMMEDIATE },
	],
	[
		Opcodes.LDX.ZERO_PAGE,
		{ instruction: "LDX", addressingMode: AddressingMode.ZERO_PAGE },
	],
	[
		Opcodes.LDX.ZERO_PAGE_Y,
		{ instruction: "LDX", addressingMode: AddressingMode.ZERO_PAGE_Y },
	],
	[
		Opcodes.LDX.ABSOLUTE,
		{ instruction: "LDX", addressingMode: AddressingMode.ABSOLUTE },
	],
	[
		Opcodes.LDX.ABSOLUTE_Y,
		{ instruction: "LDX", addressingMode: AddressingMode.ABSOLUTE_Y },
	],
	// LDY
	[
		Opcodes.LDY.IMMEDIATE,
		{ instruction: "LDY", addressingMode: AddressingMode.IMMEDIATE },
	],
	[
		Opcodes.LDY.ZERO_PAGE,
		{ instruction: "LDY", addressingMode: AddressingMode.ZERO_PAGE },
	],
	[
		Opcodes.LDY.ZERO_PAGE_X,
		{ instruction: "LDY", addressingMode: AddressingMode.ZERO_PAGE_X },
	],
	[
		Opcodes.LDY.ABSOLUTE,
		{ instruction: "LDY", addressingMode: AddressingMode.ABSOLUTE },
	],
	[
		Opcodes.LDY.ABSOLUTE_X,
		{ instruction: "LDY", addressingMode: AddressingMode.ABSOLUTE_X },
	],
	// STA
	[
		Opcodes.STA.ZERO_PAGE,
		{ instruction: "STA", addressingMode: AddressingMode.ZERO_PAGE },
	],
	[
		Opcodes.STA.ZERO_PAGE_X,
		{ instruction: "STA", addressingMode: AddressingMode.ZERO_PAGE_X },
	],
	[
		Opcodes.STA.ABSOLUTE,
		{ instruction: "STA", addressingMode: AddressingMode.ABSOLUTE },
	],
	[
		Opcodes.STA.ABSOLUTE_X,
		{ instruction: "STA", addressingMode: AddressingMode.ABSOLUTE_X },
	],
	[
		Opcodes.STA.ABSOLUTE_Y,
		{ instruction: "STA", addressingMode: AddressingMode.ABSOLUTE_Y },
	],
	[
		Opcodes.STA.INDIRECT_X,
		{ instruction: "STA", addressingMode: AddressingMode.INDIRECT_X },
	],
	[
		Opcodes.STA.INDIRECT_Y,
		{ instruction: "STA", addressingMode: AddressingMode.INDIRECT_Y },
	],
	// STX
	[
		Opcodes.STX.ZERO_PAGE,
		{ instruction: "STX", addressingMode: AddressingMode.ZERO_PAGE },
	],
	[
		Opcodes.STX.ZERO_PAGE_Y,
		{ instruction: "STX", addressingMode: AddressingMode.ZERO_PAGE_Y },
	],
	[
		Opcodes.STX.ABSOLUTE,
		{ instruction: "STX", addressingMode: AddressingMode.ABSOLUTE },
	],
	// STY
	[
		Opcodes.STY.ZERO_PAGE,
		{ instruction: "STY", addressingMode: AddressingMode.ZERO_PAGE },
	],
	[
		Opcodes.STY.ZERO_PAGE_X,
		{ instruction: "STY", addressingMode: AddressingMode.ZERO_PAGE_X },
	],
	[
		Opcodes.STY.ABSOLUTE,
		{ instruction: "STY", addressingMode: AddressingMode.ABSOLUTE },
	],
	// Register Transfers
	[
		Opcodes.TAX.IMPLICIT,
		{ instruction: "TAX", addressingMode: AddressingMode.IMPLICIT },
	],
	[
		Opcodes.TAY.IMPLICIT,
		{ instruction: "TAY", addressingMode: AddressingMode.IMPLICIT },
	],
	[
		Opcodes.TXA.IMPLICIT,
		{ instruction: "TXA", addressingMode: AddressingMode.IMPLICIT },
	],
	[
		Opcodes.TYA.IMPLICIT,
		{ instruction: "TYA", addressingMode: AddressingMode.IMPLICIT },
	],
	// Stack Operations
	[
		Opcodes.TSX.IMPLICIT,
		{ instruction: "TSX", addressingMode: AddressingMode.IMPLICIT },
	],
	[
		Opcodes.TXS.IMPLICIT,
		{ instruction: "TXS", addressingMode: AddressingMode.IMPLICIT },
	],
	[
		Opcodes.PHA.IMPLICIT,
		{ instruction: "PHA", addressingMode: AddressingMode.IMPLICIT },
	],
	[
		Opcodes.PHP.IMPLICIT,
		{ instruction: "PHP", addressingMode: AddressingMode.IMPLICIT },
	],
	[
		Opcodes.PLA.IMPLICIT,
		{ instruction: "PLA", addressingMode: AddressingMode.IMPLICIT },
	],
	[
		Opcodes.PLP.IMPLICIT,
		{ instruction: "PLP", addressingMode: AddressingMode.IMPLICIT },
	],
];
