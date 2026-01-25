import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("TXS", () => {
	it("IMPLICIT", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x2e,
			Opcodes.TXS.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.stackPointer).toBe(0x2e);
	});
});
