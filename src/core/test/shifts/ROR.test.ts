import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("ROR", () => {
	it("Carry flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x03,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.ROR.ZERO_PAGE,
			0x10,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		const memoryContent = microprocesor.memoryMapProxy(0x10);

		expect(snapshot.processStatus).toBe(0b00110001);
		expect(memoryContent).toBe(1);
	});

	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x01,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.ROR.ZERO_PAGE,
			0x10,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		const memoryContent = microprocesor.memoryMapProxy(0x10);

		expect(snapshot.processStatus).toBe(0b00110011);
		expect(memoryContent).toBe(0);
	});

	it("ACCUMULATOR", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x41,
			Opcodes.LSR.ACCUMULATOR,
			Opcodes.ROR.ACCUMULATOR,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(144);
	});

	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x41,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.LSR.ZERO_PAGE,
			0x10,
			Opcodes.ROR.ZERO_PAGE,
			0x10,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const memoryContent = microprocesor.memoryMapProxy(0x10);

		expect(memoryContent).toBe(144);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.LDA.IMMEDIATE,
			0x41,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.LSR.ZERO_PAGE_X,
			0x0f,
			Opcodes.ROR.ZERO_PAGE_X,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const memoryContent = microprocesor.memoryMapProxy(0x10);

		expect(memoryContent).toBe(144);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x41,
			Opcodes.STA.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.LSR.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.ROR.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const memoryContent = microprocesor.memoryMapProxy(0x02ee);

		expect(memoryContent).toBe(144);
	});

	it("ABSOLUTE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x04,
			Opcodes.LDA.IMMEDIATE,
			0x41,
			Opcodes.STA.ABSOLUTE,
			0xf2,
			0x02,
			Opcodes.LSR.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.ROR.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const memoryContent = microprocesor.memoryMapProxy(0x02f2);

		expect(memoryContent).toBe(144);
	});
});
