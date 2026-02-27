import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("EOR", () => {
	it("Zero flag", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0x40,
			Opcodes.EOR.IMMEDIATE,
			0x40,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00100010);
		expect(snapshot.accumulator).toBe(0);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x80,
            Opcodes.EOR.IMMEDIATE,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
		expect(snapshot.accumulator).toBe(129);
	});

	it("IMMEDIATE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0xc0,
            Opcodes.EOR.IMMEDIATE,
			0x40,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0xc0,
            Opcodes.EOR.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.memoryMapProxy(0x0f, 0x40);
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0xc0,
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.EOR.ZERO_PAGE_X,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.memoryMapProxy(0x10, 0x40);
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0xc0,
			Opcodes.EOR.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.memoryMapProxy(0x02ee, 0x40);
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ABSOLUTE_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0xc0,
			Opcodes.LDX.IMMEDIATE,
			0x04,
			Opcodes.EOR.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.memoryMapProxy(0x02f2, 0x40);
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ABSOLUTE_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0xc0,
			Opcodes.LDY.IMMEDIATE,
			0x05,
			Opcodes.EOR.ABSOLUTE_Y,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.memoryMapProxy(0x02f3, 0x40);
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("INDIRECT_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0xc0,
			Opcodes.LDX.IMMEDIATE,
			0x02,
			Opcodes.EOR.INDIRECT_X,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.memoryMapProxy(0x03, 0xce);
		microprocesor.memoryMapProxy(0x04, 0x07);
		microprocesor.memoryMapProxy(0x07ce, 0x40);
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("INDIRECT_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0xc0,
			Opcodes.LDY.IMMEDIATE,
			0x09,
			Opcodes.EOR.INDIRECT_Y,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.memoryMapProxy(0x01, 0xff);
		microprocesor.memoryMapProxy(0x02, 0x06);
		microprocesor.memoryMapProxy(0x0708, 0x40);
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});
});
