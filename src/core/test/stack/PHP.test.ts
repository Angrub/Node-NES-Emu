import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("PHP", () => {
	it("IMPLICIT", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x00,
			Opcodes.PHP.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		const value = microprocesor.memoryMapProxy(0xff)

		expect(snapshot.stackPointer).toBe(0xfe);
		expect(value).toBe(0b00100010);
	});
});
