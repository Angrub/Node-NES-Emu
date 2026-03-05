import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("DEC", () => {
	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x01,
			Opcodes.STA.ZERO_PAGE,
			0x40,
			Opcodes.DEC.ZERO_PAGE,
			0x40,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		const value = microprocesor.memoryMapProxy(0x40);

		expect(snapshot.processStatus).toBe(0b00110010);
		expect(value).toBe(0);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x00,
			Opcodes.STA.ZERO_PAGE,
			0x40,
			Opcodes.DEC.ZERO_PAGE,
			0x40,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		const value = microprocesor.memoryMapProxy(0x40);

		expect(snapshot.processStatus).toBe(0b10110000);
		expect(value).toBe(255);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.LDA.IMMEDIATE,
			0xae,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.DEC.ZERO_PAGE_X,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const value = microprocesor.memoryMapProxy(0x10);

		expect(value).toBe(173);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0xae,
			Opcodes.STA.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.DEC.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const value = microprocesor.memoryMapProxy(0x02ee);

		expect(value).toBe(173);
	});

	it("ABSOLUTE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x04,
			Opcodes.LDA.IMMEDIATE,
			0xae,
			Opcodes.STA.ABSOLUTE,
			0xf2,
			0x02,
			Opcodes.DEC.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const value = microprocesor.memoryMapProxy(0x02f2);

		expect(value).toBe(173);
	});
});
