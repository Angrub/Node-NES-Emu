import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("DEY", () => {
	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x01,
			Opcodes.DEY.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00110010);
		expect(snapshot.Y).toBe(0);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x00,
			Opcodes.DEY.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10110000);
		expect(snapshot.Y).toBe(255);
	});
});
