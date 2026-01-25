import { MOS6502, Opcodes } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("STA", () => {

	it("ZERO_PAGE", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0x40,
			Opcodes.STA.ZERO_PAGE,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();
        
		const value = microprocesor.memoryMapProxy(0x0f);

		expect(value).toBe(64);
	});

	it("ZERO_PAGE_X", () => {
		const rom = new Uint8Array([
			Opcodes.LDA.IMMEDIATE,
            0x40,
            Opcodes.LDX.IMMEDIATE,
			0x01,
			Opcodes.STA.ZERO_PAGE_X,
			0x0f,
			Opcodes.BRK.IMPLICIT,
		]);
		microprocesor.load(rom);
		microprocesor.run();
        
		const value = microprocesor.memoryMapProxy(0x10);

		expect(value).toBe(64);
	});

	it("ABSOLUTE", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0x40,
			Opcodes.STA.ABSOLUTE,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.load(rom);
		microprocesor.run();
        
		const value = microprocesor.memoryMapProxy(0x02ee);

		expect(value).toBe(64);
	});

	it("ABSOLUTE_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0x40,
			Opcodes.LDX.IMMEDIATE,
			0x04,
			Opcodes.STA.ABSOLUTE_X,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);
		
        microprocesor.load(rom);
		microprocesor.run();
        
		const value = microprocesor.memoryMapProxy(0x02f2);

		expect(value).toBe(64);
	});

	it("ABSOLUTE_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0x40,
			Opcodes.LDY.IMMEDIATE,
			0x05,
			Opcodes.STA.ABSOLUTE_Y,
			0xee,
			0x02,
			Opcodes.BRK.IMPLICIT,
		]);
        
		microprocesor.load(rom);
		microprocesor.run();

        const value = microprocesor.memoryMapProxy(0x02f3);

		expect(value).toBe(64);
	});

	it("INDIRECT_X", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0x40,
			Opcodes.LDX.IMMEDIATE,
			0x02,
			Opcodes.STA.INDIRECT_X,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.memoryMapProxy(0x03, 0xce);
		microprocesor.memoryMapProxy(0x04, 0x07);
		
        microprocesor.load(rom);
		microprocesor.run();
        
		const value = microprocesor.memoryMapProxy(0x07ce);

		expect(value).toBe(64);
	});

	it("INDIRECT_Y", () => {
		const rom = new Uint8Array([
            Opcodes.LDA.IMMEDIATE,
            0x40,
			Opcodes.LDY.IMMEDIATE,
			0x09,
			Opcodes.STA.INDIRECT_Y,
			0x01,
			Opcodes.BRK.IMPLICIT,
		]);

		microprocesor.memoryMapProxy(0x01, 0xff);
		microprocesor.memoryMapProxy(0x02, 0x06);
		
        microprocesor.load(rom);
		microprocesor.run();
        
		const value = microprocesor.memoryMapProxy(0x0708);

		expect(value).toBe(64);
	});
});
