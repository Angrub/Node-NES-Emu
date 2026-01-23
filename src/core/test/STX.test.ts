import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("STX", () => {
	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x40,
			Opcodes.STX.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const value = microprocesor.memoryMapProxy(0x0f);

		expect(value).toBe(64);
	});

	it("ZERO_PAGE_Y", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x40,
			Opcodes.LDY.IMMEDIATE,
			0x01,
			Opcodes.STX.ZERO_PAGE_Y,
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
			Opcodes.LDX.IMMEDIATE,
			0x40,
			Opcodes.STX.ABSOLUTE,
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
