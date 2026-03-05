import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("INX", () => {
	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.INX.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00110010);
		expect(snapshot.X).toBe(0);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x7f,
			Opcodes.INX.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10110000);
		expect(snapshot.X).toBe(128);
	});
});
