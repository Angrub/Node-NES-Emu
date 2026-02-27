import { Opcodes } from "./opcodes.js";
import { AddressingMode, type MOS6502instruction } from "./types.js";

export type InstructionReference = {
	instruction: MOS6502instruction;
	addressingMode: AddressingMode;
};

export const instructionSetReference: [number, InstructionReference][] = [
	// Load and Store Operations
	[
		Opcodes.BRK.IMPLICIT,
		{ instruction: "BRK", addressingMode: AddressingMode.IMPLICIT },
	],
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
	// Logical Operations
	[
		Opcodes.AND.IMMEDIATE,
		{ instruction: "AND", addressingMode: AddressingMode.IMMEDIATE }
	],
	[
		Opcodes.AND.ZERO_PAGE,
		{ instruction: "AND", addressingMode: AddressingMode.ZERO_PAGE }
	],
	[
		Opcodes.AND.ZERO_PAGE_X,
		{ instruction: "AND", addressingMode: AddressingMode.ZERO_PAGE_X }
	],
	[
		Opcodes.AND.ABSOLUTE,
		{ instruction: "AND", addressingMode: AddressingMode.ABSOLUTE }
	],
	[
		Opcodes.AND.ABSOLUTE_X,
		{ instruction: "AND", addressingMode: AddressingMode.ABSOLUTE_X }
	],
	[
		Opcodes.AND.ABSOLUTE_Y,
		{ instruction: "AND", addressingMode: AddressingMode.ABSOLUTE_Y }
	],
	[
		Opcodes.AND.INDIRECT_X,
		{ instruction: "AND", addressingMode: AddressingMode.INDIRECT_X }
	],
	[
		Opcodes.AND.INDIRECT_Y,
		{ instruction: "AND", addressingMode: AddressingMode.INDIRECT_Y }
	],
	[
		Opcodes.EOR.IMMEDIATE,
		{ instruction: "EOR", addressingMode: AddressingMode.IMMEDIATE }
	],
	[
		Opcodes.EOR.ZERO_PAGE,
		{ instruction: "EOR", addressingMode: AddressingMode.ZERO_PAGE }
	],
	[
		Opcodes.EOR.ZERO_PAGE_X,
		{ instruction: "EOR", addressingMode: AddressingMode.ZERO_PAGE_X }
	],
	[
		Opcodes.EOR.ABSOLUTE,
		{ instruction: "EOR", addressingMode: AddressingMode.ABSOLUTE }
	],
	[
		Opcodes.EOR.ABSOLUTE_X,
		{ instruction: "EOR", addressingMode: AddressingMode.ABSOLUTE_X }
	],
	[
		Opcodes.EOR.ABSOLUTE_Y,
		{ instruction: "EOR", addressingMode: AddressingMode.ABSOLUTE_Y }
	],
	[
		Opcodes.EOR.INDIRECT_X,
		{ instruction: "EOR", addressingMode: AddressingMode.INDIRECT_X }
	],
	[
		Opcodes.EOR.INDIRECT_Y,
		{ instruction: "EOR", addressingMode: AddressingMode.INDIRECT_Y }
	],
	[
		Opcodes.ORA.IMMEDIATE,
		{ instruction: "ORA", addressingMode: AddressingMode.IMMEDIATE }
	],
	[
		Opcodes.ORA.ZERO_PAGE,
		{ instruction: "ORA", addressingMode: AddressingMode.ZERO_PAGE }
	],
	[
		Opcodes.ORA.ZERO_PAGE_X,
		{ instruction: "ORA", addressingMode: AddressingMode.ZERO_PAGE_X }
	],
	[
		Opcodes.ORA.ABSOLUTE,
		{ instruction: "ORA", addressingMode: AddressingMode.ABSOLUTE }
	],
	[
		Opcodes.ORA.ABSOLUTE_X,
		{ instruction: "ORA", addressingMode: AddressingMode.ABSOLUTE_X }
	],
	[
		Opcodes.ORA.ABSOLUTE_Y,
		{ instruction: "ORA", addressingMode: AddressingMode.ABSOLUTE_Y }
	],
	[
		Opcodes.ORA.INDIRECT_X,
		{ instruction: "ORA", addressingMode: AddressingMode.INDIRECT_X }
	],
	[
		Opcodes.ORA.INDIRECT_Y,
		{ instruction: "ORA", addressingMode: AddressingMode.INDIRECT_Y }
	],
	[
		Opcodes.BIT.ZERO_PAGE,
		{ instruction: "BIT", addressingMode: AddressingMode.ZERO_PAGE }
	],
	[
		Opcodes.BIT.ABSOLUTE,
		{ instruction: "BIT", addressingMode: AddressingMode.ABSOLUTE }
	],
	// Arithmetic Operations
];
