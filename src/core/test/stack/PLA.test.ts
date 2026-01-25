import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("PLA", () => {
	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x23,
			Opcodes.LDA.IMMEDIATE,
			0x00,
			Opcodes.PHA.IMPLICIT,
			Opcodes.TXA.IMPLICIT,
			Opcodes.PLA.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(0x00);
		expect(snapshot.processStatus).toBe(0b00100010);
		expect(snapshot.stackPointer).toBe(0xff);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x23,
			Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.PHA.IMPLICIT,
			Opcodes.TXA.IMPLICIT,
			Opcodes.PLA.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
		expect(snapshot.processStatus).toBe(0b10100000);
		expect(snapshot.stackPointer).toBe(0xff);
	});
});
