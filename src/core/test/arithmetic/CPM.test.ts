import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("CPM", () => {
	it("Carry flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x60,
			Opcodes.CPM.IMMEDIATE,
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
			Opcodes.LDA.IMMEDIATE,
			0x3e,
			Opcodes.CPM.IMMEDIATE,
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
			Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.CPM.IMMEDIATE,
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
			Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ZERO_PAGE,
			0x0f,
			Opcodes.CPM.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.LDY.IMMEDIATE,
			0xff,
			Opcodes.STY.ZERO_PAGE,
			0x10,
			Opcodes.CPM.ZERO_PAGE_X,
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
	        Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.CPM.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});

	it("ABSOLUTE_X", () => {
		const rom = new Uint8Array([
	        Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.LDX.IMMEDIATE,
			0x04,
			Opcodes.LDY.IMMEDIATE,
			0xff,
			Opcodes.STY.ABSOLUTE,
			0xf2,
			0x02,
			Opcodes.CPM.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});

	it("ABSOLUTE_Y", () => {
		const rom = new Uint8Array([
	        Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.LDY.IMMEDIATE,
			0x05,
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ABSOLUTE,
			0xf3,
			0x02,
			Opcodes.CPM.ABSOLUTE_Y,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});

	it("INDIRECT_X", () => {
		const rom = new Uint8Array([
	        Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.LDX.IMMEDIATE,
			0x02,
			Opcodes.LDY.IMMEDIATE,
			0xce,
			Opcodes.STY.ZERO_PAGE,
			0x03,
			Opcodes.LDY.IMMEDIATE,
			0x07,
			Opcodes.STY.ZERO_PAGE,
			0x04,
			Opcodes.LDY.IMMEDIATE,
			0xff,
			Opcodes.STY.ABSOLUTE,
			0xce,
			0x07,
			Opcodes.CPM.INDIRECT_X,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});

	it("INDIRECT_Y", () => {
		const rom = new Uint8Array([
	        Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.LDY.IMMEDIATE,
			0x09,
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ZERO_PAGE,
			0x01,
			Opcodes.LDX.IMMEDIATE,
			0x06,
			Opcodes.STX.ZERO_PAGE,
			0x02,
			Opcodes.LDX.IMMEDIATE,
			0xff,
			Opcodes.STX.ABSOLUTE,
			0x08,
			0x07,
			Opcodes.CPM.INDIRECT_Y,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
	});
});
