import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("SBC", () => {
	it("Carry flag", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0xee,
			Opcodes.SBC.IMMEDIATE,
			0x70,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		expect(snapshot.processStatus).toBe(0b00100001);
		expect(snapshot.accumulator).toBe(125);
	});

	it("Zero flag", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0x7f,
			Opcodes.SBC.IMMEDIATE,
			0x7e,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00100011);
		expect(snapshot.accumulator).toBe(0);
	});

	it("Overflow flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x90,
            Opcodes.SBC.IMMEDIATE,
			0x8f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b01100011);
		expect(snapshot.accumulator).toBe(0);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x82,
			Opcodes.SBC.IMMEDIATE,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100001);
		expect(snapshot.accumulator).toBe(128);
	});

	it("IMMEDIATE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x42,
            Opcodes.SBC.IMMEDIATE,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(64);
	});

	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x42,
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.STX.ZERO_PAGE,
			0x0f,
            Opcodes.SBC.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(64);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x42,
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.LDY.IMMEDIATE,
			0x01,
			Opcodes.STY.ZERO_PAGE,
			0x10,
			Opcodes.SBC.ZERO_PAGE_X,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(64);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x42,
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.STX.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.SBC.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(64);
	});

	it("ABSOLUTE_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x42,
			Opcodes.LDX.IMMEDIATE,
			0x04,
			Opcodes.LDY.IMMEDIATE,
			0x01,
			Opcodes.STY.ABSOLUTE,
			0xf2,
			0x02,
			Opcodes.SBC.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(64);
	});

	it("ABSOLUTE_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x42,
			Opcodes.LDY.IMMEDIATE,
			0x05,
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.STX.ABSOLUTE,
			0xf3,
			0x02,
			Opcodes.SBC.ABSOLUTE_Y,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(64);
	});

	it("INDIRECT_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x42,
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
			0x01,
			Opcodes.STY.ABSOLUTE,
			0xce,
			0x07,
			Opcodes.SBC.INDIRECT_X,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(64);
	});

	it("INDIRECT_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x42,
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
			0x01,
			Opcodes.STX.ABSOLUTE,
			0x08,
			0x07,
			Opcodes.SBC.INDIRECT_Y,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(64);
	});
});
