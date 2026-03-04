import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("CPX", () => {
	it("Carry flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x60,
			Opcodes.CPX.IMMEDIATE,
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
			Opcodes.LDX.IMMEDIATE,
			0x3e,
			Opcodes.CPX.IMMEDIATE,
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
			Opcodes.LDX.IMMEDIATE,
			0x80,
			Opcodes.CPX.IMMEDIATE,
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
			Opcodes.LDX.IMMEDIATE,
			0x80,
			Opcodes.LDY.IMMEDIATE,
			0xff,
			Opcodes.STY.ZERO_PAGE,
			0x0f,
			Opcodes.CPX.ZERO_PAGE,
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
	        Opcodes.LDX.IMMEDIATE,
			0x80,
			Opcodes.LDY.IMMEDIATE,
			0xff,
			Opcodes.STY.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.CPX.ABSOLUTE,
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
