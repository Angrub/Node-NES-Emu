import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("TXA", () => {
	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x00,
            Opcodes.TXA.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);
		
		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00100010);
		expect(snapshot.accumulator).toBe(0);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x80,
            Opcodes.TXA.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);
		
		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
		expect(snapshot.accumulator).toBe(128);
	});
});
