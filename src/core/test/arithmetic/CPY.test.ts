import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("CPY", () => {
	it("Carry flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x60,
			Opcodes.CPY.IMMEDIATE,
			0x5f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		expect(snapshot.processStatus).toBe(0b00100001);
	});

	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x3e,
			Opcodes.CPY.IMMEDIATE,
			0x3e,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00100011);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x80,
			Opcodes.CPY.IMMEDIATE,
			0xff,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});

	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x80,
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ZERO_PAGE,
			0x0f,
			Opcodes.CPY.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
	        Opcodes.LDY.IMMEDIATE,
			0x80,
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.CPY.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});
});
