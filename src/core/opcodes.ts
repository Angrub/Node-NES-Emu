// import type { AddressingMode, MOS6502instruction } from "./types.js";

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
	},
	TAX: {
		IMPLICIT: 0xaa,
	},
	TAY: {
		IMPLICIT: 0xa8,
	},
	TXA: {
		IMPLICIT: 0x8a,
	},
	TYA: {
		IMPLICIT: 0x98,
	},
	TSX: {
		IMPLICIT: 0xba,
	},
	TXS: {
		IMPLICIT: 0x9a,
	},
	PHA: {
		IMPLICIT: 0x48,
	},
	PHP: {
		IMPLICIT: 0x08,
	},
	PLA: {
		IMPLICIT: 0x68,
	},
	PLP: {
		IMPLICIT: 0x28,
	},
	AND: {
		IMMEDIATE: 0x29,
		ZERO_PAGE: 0x25,
		ZERO_PAGE_X: 0x35,
		ABSOLUTE: 0x2d,
		ABSOLUTE_X: 0x3d,
		ABSOLUTE_Y: 0x39,
		INDIRECT_X: 0x21,
		INDIRECT_Y: 0x31,
	},
	EOR: {
		IMMEDIATE: 0x49,
		ZERO_PAGE: 0x45,
		ZERO_PAGE_X: 0x55,
		ABSOLUTE: 0x4d,
		ABSOLUTE_X: 0x5d,
		ABSOLUTE_Y: 0x59,
		INDIRECT_X: 0x41,
		INDIRECT_Y: 0x51,
	},
	ORA: {
		IMMEDIATE: 0x09,
		ZERO_PAGE: 0x05,
		ZERO_PAGE_X: 0x15,
		ABSOLUTE: 0x0d,
		ABSOLUTE_X: 0x1d,
		ABSOLUTE_Y: 0x19,
		INDIRECT_X: 0x01,
		INDIRECT_Y: 0x11,
	},
	BIT: {
		ZERO_PAGE: 0x24,
		ABSOLUTE: 0x2c,
	},
	ADC: {
		IMMEDIATE: 0x69,
		ZERO_PAGE: 0x65,
		ZERO_PAGE_X: 0x75,
		ABSOLUTE: 0x6d,
		ABSOLUTE_X: 0x7d,
		ABSOLUTE_Y: 0x79,
		INDIRECT_X: 0x61,
		INDIRECT_Y: 0x71,
	},
	SBC: {
		IMMEDIATE: 0xe9,
		ZERO_PAGE: 0xe5,
		ZERO_PAGE_X: 0xf5,
		ABSOLUTE: 0xed,
		ABSOLUTE_X: 0xfd,
		ABSOLUTE_Y: 0xf9,
		INDIRECT_X: 0xe1,
		INDIRECT_Y: 0xf1,
	},
};