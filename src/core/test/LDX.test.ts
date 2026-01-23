import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("LDX", () => {
	it("Without flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);
		
		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.X).toBe(15);
	});

	it("Zero flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x00,
			Opcodes.BRK.IMPLICIT,
		]);
		
		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b00100010);
		expect(snapshot.X).toBe(0);
	});

	it("Negative flag", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x80,
			Opcodes.BRK.IMPLICIT,
		]);
		
		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.processStatus).toBe(0b10100000);
		expect(snapshot.X).toBe(128);
	});

    it("IMMEDIATE", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.IMMEDIATE,
			0x40,
			Opcodes.BRK.IMPLICIT,
		]);
		
		microprocesor.load(rom);
		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.X).toBe(64);
	});

    it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.memoryMapProxy(0x0f, 0x40)
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.X).toBe(64);
	});

    it("ZERO_PAGE_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDY.IMMEDIATE,
            0x01,
			Opcodes.LDX.ZERO_PAGE_Y,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.memoryMapProxy(0x10, 0x40)
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();
        
		expect(snapshot.X).toBe(64);
	});

    it("ABSOLUTE", () => {
		const rom = new Uint8Array([
			Opcodes.LDX.ABSOLUTE,
			0xee,
            0x02,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.memoryMapProxy(0x02ee, 0x40)
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.X).toBe(64);
	});

    it("ABSOLUTE_Y", () => {
		const rom = new Uint8Array([
			Opcodes.LDY.IMMEDIATE,
            0x05,
            Opcodes.LDX.ABSOLUTE_Y,
			0xee,
            0x02,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.memoryMapProxy(0x02f3, 0x40)
		microprocesor.load(rom);

		microprocesor.run();

		const snapshot = microprocesor.createSnapshot();

		expect(snapshot.X).toBe(64);
	});
});
