import { createHash } from "node:crypto";
import { MOS6502 } from "@core/index.js";
import { beforeEach, describe, expect, it } from "vitest";

const microprocesor = new MOS6502();

beforeEach(() => {
	microprocesor.reset();
});

describe("Load and Reset", async () => {
	it("Reset registers", () => {
		const mos6502InitialState =
			"93113577a5b31908af0378b167ae06013b8ab640f7c78f8d2d8fd698de278a11";

		const snapshot = microprocesor.createSnapshot();
		const hash = createHash("sha256");
		hash.update(JSON.stringify(snapshot));
		const digest = hash.digest("hex");

		expect(digest).toBe(mos6502InitialState);
	});

	it("Load rom", () => {
		const mos6502WithRomState =
			"56c6c437323481e58fa11ffed8126cd4175d7aa5ea40fac260f871bb133f49c0";
		const rom = new Uint8Array([
			0xa9, 0x01, 0xa2, 0xff, 0xa0, 0x54, 0x8d, 0x00, 0x02, 0x8e, 0x01, 0x02,
			0x8c, 0x03, 0x02,
		]);
		microprocesor.load(rom);

		const snapshot = microprocesor.createSnapshot();
		const hash = createHash("sha256");
		hash.update(JSON.stringify(snapshot));
		const digest = hash.digest("hex");

		expect(digest).toBe(mos6502WithRomState);
	});
});
