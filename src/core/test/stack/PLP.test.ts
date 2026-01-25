import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("PLP", () => {
	it("IMPLICIT", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0xde,
			Opcodes.LDA.IMMEDIATE,
			0x67,
			Opcodes.PHA.IMPLICIT,
			Opcodes.TXA.IMPLICIT,
			Opcodes.PHA.IMPLICIT,
			Opcodes.PLP.IMPLICIT,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0xde);
		expect(snapshot.stackPointer).toBe(0xfe);
	});
});
