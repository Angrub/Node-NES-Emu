import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("BIT", () => {
	it("Zero flag", () => {
		const rom = new Uint8Array([
            Opcodes.LDX.IMMEDIATE,
            0x02,
			Opcodes.STX.ZERO_PAGE,
			0xee,
			Opcodes.BIT.ZERO_PAGE,
			0xee,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00100010);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.LDX.IMMEDIATE,
			0x80,
			Opcodes.STX.ZERO_PAGE,
			0xee,
            Opcodes.BIT.ZERO_PAGE,
			0xee,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});

	it("Overflow flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x40,
			Opcodes.LDX.IMMEDIATE,
			0x40,
			Opcodes.STX.ZERO_PAGE,
			0xee,
            Opcodes.BIT.ZERO_PAGE,
			0xee,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b01100000);
	});

	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0xff,
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ZERO_PAGE,
			0xee,
            Opcodes.BIT.ZERO_PAGE,
			0xee,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(255);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ABSOLUTE,
			0xee,
			0x02,
            Opcodes.LDA.IMMEDIATE,
			0xff,
			Opcodes.BIT.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(255);
	});
});
