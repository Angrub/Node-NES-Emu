import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("ROL", () => {
	it("Carry flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x81,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.ROL.ZERO_PAGE,
			0x10,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		const memoryContent = microprocesor.memoryMapProxy(0x10);

		expect(snapshot.processStatus).toBe(0b00110001);
		expect(memoryContent).toBe(2);
	});

	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x80,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.ROL.ZERO_PAGE,
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

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0x40,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.ROL.ZERO_PAGE,
			0x10,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
		const memoryContent = microprocesor.memoryMapProxy(0x10);

		expect(snapshot.processStatus).toBe(0b10110000);
		expect(memoryContent).toBe(128);
	});

	it("ACCUMULATOR", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0xff,
			Opcodes.ASL.ACCUMULATOR,
			Opcodes.ROL.ACCUMULATOR,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.accumulator).toBe(253);
	});

	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0xff,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.ASL.ZERO_PAGE,
			0x10,
			Opcodes.ROL.ZERO_PAGE,
			0x10,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const memoryContent = microprocesor.memoryMapProxy(0x10);

		expect(memoryContent).toBe(253);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.LDA.IMMEDIATE,
			0xff,
			Opcodes.STA.ZERO_PAGE,
			0x10,
			Opcodes.ASL.ZERO_PAGE_X,
			0x0f,
			Opcodes.ROL.ZERO_PAGE_X,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const memoryContent = microprocesor.memoryMapProxy(0x10);

		expect(memoryContent).toBe(253);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
			0xff,
			Opcodes.STA.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.ASL.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.ROL.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const memoryContent = microprocesor.memoryMapProxy(0x02ee);

		expect(memoryContent).toBe(253);
	});

	it("ABSOLUTE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x04,
			Opcodes.LDA.IMMEDIATE,
			0xff,
			Opcodes.STA.ABSOLUTE,
			0xf2,
			0x02,
			Opcodes.ASL.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.ROL.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();

		const memoryContent = microprocesor.memoryMapProxy(0x02f2);

		expect(memoryContent).toBe(253);
	});
});
