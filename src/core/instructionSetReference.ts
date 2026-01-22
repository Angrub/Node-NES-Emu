import {  AddressingMode, type MOS6502instruction } from "./types.js";

export type InstructionReference = {
	instruction: MOS6502instruction;
	addressingMode: AddressingMode;
};

export const instructionSetReference: [number, InstructionReference][] = [
	[0x00, { instruction: "BRK", addressingMode: AddressingMode.IMPLICIT }],
	// LDA
    [0xa9, { instruction: "LDA", addressingMode: AddressingMode.IMMEDIATE }],
	[0xa5, { instruction: "LDA", addressingMode: AddressingMode.ZERO_PAGE }],
	[0xb5, { instruction: "LDA", addressingMode: AddressingMode.ZERO_PAGE_X }],
	[0xad, { instruction: "LDA", addressingMode: AddressingMode.ABSOLUTE }],
	[0xbd, { instruction: "LDA", addressingMode: AddressingMode.ABSOLUTE_X }],
	[0xb9, { instruction: "LDA", addressingMode: AddressingMode.ABSOLUTE_Y }],
	[0xa1, { instruction: "LDA", addressingMode: AddressingMode.INDIRECT_X }],
	[0xb1, { instruction: "LDA", addressingMode: AddressingMode.INDIRECT_Y }],
	// LDX
    [0xa2, { instruction: "LDX", addressingMode: AddressingMode.IMMEDIATE }],
	[0xa6, { instruction: "LDX", addressingMode: AddressingMode.ZERO_PAGE }],
	[0xb6, { instruction: "LDX", addressingMode: AddressingMode.ZERO_PAGE_Y }],
	[0xae, { instruction: "LDX", addressingMode: AddressingMode.ABSOLUTE }],
	[0xbe, { instruction: "LDX", addressingMode: AddressingMode.ABSOLUTE_Y }],
    // LDY
    [0xa0, { instruction: "LDY", addressingMode: AddressingMode.IMMEDIATE }],
	[0xa4, { instruction: "LDY", addressingMode: AddressingMode.ZERO_PAGE }],
	[0xb4, { instruction: "LDY", addressingMode: AddressingMode.ZERO_PAGE_X }],
	[0xac, { instruction: "LDY", addressingMode: AddressingMode.ABSOLUTE }],
	[0xbc, { instruction: "LDY", addressingMode: AddressingMode.ABSOLUTE_X }],
    // STA
    [0x85, { instruction: "STA", addressingMode: AddressingMode.ZERO_PAGE }],
	[0x95, { instruction: "STA", addressingMode: AddressingMode.ZERO_PAGE_X }],
	[0x8d, { instruction: "STA", addressingMode: AddressingMode.ABSOLUTE }],
	[0x9d, { instruction: "STA", addressingMode: AddressingMode.ABSOLUTE_X }],
	[0x99, { instruction: "STA", addressingMode: AddressingMode.ABSOLUTE_Y }],
	[0x81, { instruction: "STA", addressingMode: AddressingMode.INDIRECT_X }],
	[0x91, { instruction: "STA", addressingMode: AddressingMode.INDIRECT_Y }],
	// STX
	[0x86, { instruction: "STX", addressingMode: AddressingMode.ZERO_PAGE }],
	[0x96, { instruction: "STX", addressingMode: AddressingMode.ZERO_PAGE_Y }],
	[0x8e, { instruction: "STX", addressingMode: AddressingMode.ABSOLUTE }],
	// STY
	[0x84, { instruction: "STY", addressingMode: AddressingMode.ZERO_PAGE }],
	[0x94, { instruction: "STY", addressingMode: AddressingMode.ZERO_PAGE_X }],
	[0x8c, { instruction: "STY", addressingMode: AddressingMode.ABSOLUTE }],
];
