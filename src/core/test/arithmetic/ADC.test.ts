import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("ADC", () => {
	it("Carry flag", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0xff,
			Opcodes.ADC.IMMEDIATE,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00110001);
		expect(snapshot.accumulator).toBe(1);
	});

	it("Zero flag", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0xff,
			Opcodes.ADC.IMMEDIATE,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00110011);
		expect(snapshot.accumulator).toBe(0);
	});

	it("Overflow flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x40,
            Opcodes.ADC.IMMEDIATE,
			0x40,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b11110000);
		expect(snapshot.accumulator).toBe(128);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x7f,
			Opcodes.ADC.IMMEDIATE,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b11110000);
		expect(snapshot.accumulator).toBe(128);
	});

	it("IMMEDIATE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x5d,
            Opcodes.ADC.IMMEDIATE,
			0x23,
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
			0x5d,
			Opcodes.LDX.IMMEDIATE,
			0x23,
			Opcodes.STX.ZERO_PAGE,
			0x0f,
            Opcodes.ADC.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x5d,
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.LDY.IMMEDIATE,
			0x23,
			Opcodes.STY.ZERO_PAGE,
			0x10,
			Opcodes.ADC.ZERO_PAGE_X,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x5d,
			Opcodes.LDX.IMMEDIATE,
			0x23,
			Opcodes.STX.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.ADC.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ABSOLUTE_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x5d,
			Opcodes.LDX.IMMEDIATE,
			0x04,
			Opcodes.LDY.IMMEDIATE,
			0x23,
			Opcodes.STY.ABSOLUTE,
			0xf2,
			0x02,
			Opcodes.ADC.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("ABSOLUTE_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x5d,
			Opcodes.LDY.IMMEDIATE,
			0x05,
			Opcodes.LDX.IMMEDIATE,
			0x23,
			Opcodes.STX.ABSOLUTE,
			0xf3,
			0x02,
			Opcodes.ADC.ABSOLUTE_Y,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("INDIRECT_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x5d,
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
			0x23,
			Opcodes.STY.ABSOLUTE,
			0xce,
			0x07,
			Opcodes.ADC.INDIRECT_X,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});

	it("INDIRECT_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
			0x5d,
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
			0x23,
			Opcodes.STX.ABSOLUTE,
			0x08,
			0x07,
			Opcodes.ADC.INDIRECT_Y,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(128);
	});
});
