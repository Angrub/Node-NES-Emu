import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("STY", () => {
	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x40,
			Opcodes.STY.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const value = microprocesor.memoryMapProxy(0x0f);

		expect(value).toBe(64);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x40,
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.STY.ZERO_PAGE_X,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const value = microprocesor.memoryMapProxy(0x10);

		expect(value).toBe(64);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
			0x40,
			Opcodes.STY.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const value = microprocesor.memoryMapProxy(0x02ee);

		expect(value).toBe(64);
	});
});
