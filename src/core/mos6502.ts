import {
	type InstructionReference,
	instructionSetReference,
} from "./instructionSetReference.js";
import { AddressingMode, type MOS6502SnapShot } from "./types.js";

export class MOS6502 {
	private debug: boolean;
	private cpuHalted = false;
	private programCounter = 0x8000;
	private stackPointer = 0xff;
	private accumulator = 0x00;
	private X = 0x00;
	private Y = 0x00;
	private processStatus = 0b00100000;
	private ram: Uint8Array;
	private cartridgesMemory: Uint8Array;

	private instructionSetMap = new Map<number, InstructionReference>(
		instructionSetReference,
	);

	constructor(debug = false) {
		this.ram = new Uint8Array(0x800);
		this.cartridgesMemory = new Uint8Array(0xbfe0); // max 0xbfe0 / 47.96 KiB
		this.debug = debug;
	}

	private memoryMapU16(address: number, value?: number): number {
		if (value) {
			const mostSignificantByte = value >> 8;
			const leastSignificantByte = value & 0b0000000011111111;

			this.memoryMapProxy(address, leastSignificantByte);
			this.memoryMapProxy(address + 1, mostSignificantByte);

			return 0x0;
		}

		const leastSignificantByte = this.memoryMapProxy(address);
		const mostSignificantByte = this.memoryMapProxy(address + 1);

		return (mostSignificantByte << 8) + leastSignificantByte;
	}

	public memoryMapProxy(address: number, value?: number): number {
		if (address >= 0x0000 && address <= 0x07ff) {
			if (value !== undefined) {
				this.ram[address] = value;
				return 0x0;
			} else {
				return this.ram[address] as number;
			}
		} else if (address >= 0x0800 && address <= 0x1fff) {
			// Mirrors 0x0000–0x07FF
			console.warn("Mirrors 0x0000–0x07FF do not implemented");
			return 0x0;
		} else if (address >= 0x2000 && address <= 0x2007) {
			// NES PPU registers
			console.warn("NES PPU registers do not implemented");
			return 0x0;
		} else if (address >= 0x2008 && address <= 0x3fff) {
			// Mirrors  of 0x2000–0x2007
			console.warn("Mirrors  of 0x2000–0x2007 do not implemented");
			return 0x0;
		} else if (address >= 0x4000 && address <= 0x4017) {
			// NES APU and I/O registers
			console.warn("NES APU and I/O registers do not implemented");
			return 0x0;
		} else if (address >= 0x4018 && address <= 0x401f) {
			// APU and I/O functionality that is normally disabled
			console.warn("APU and I/O functionality do not implemented");
			return 0x0;
		} else if (address >= 0x4020 && address <= 0xffff) {
			// const adjustedAddress = address - 0x4020;
			const adjustedAddress = address - 0x8000;

			if (value !== undefined) {
				if (address >= 0x8000) return 0x0;

				this.cartridgesMemory[adjustedAddress] = value;
				return 0x0;
			}

			return this.cartridgesMemory[adjustedAddress] as number;
		} else {
			throw new Error("Address out of range");
		}
	}

	public load(rom: Uint8Array) {
		if (rom.length > 0xbfe0) {
			throw new Error("Rom too big :/");
		}

		this.cartridgesMemory = rom;
	}

	public reset() {
		this.cpuHalted = false;
		this.stackPointer = 0xff;
		this.accumulator = 0x00;
		this.X = 0x00;
		this.Y = 0x00;
		this.processStatus = 0b00100000;
		this.ram.fill(0, 0, this.ram.length - 1);

		this.programCounter = this.memoryMapU16(0xfffc) || 0x8000;
	}

	public run() {
		if (this.debug) {
			console.warn("Use nextStep or prevStep while debug mode is enabled");
			return;
		}

		// microprocessor loop
		while (!this.cpuHalted) {
			const instruction = this.memoryMapProxy(this.programCounter);

			const methodRef = this.instructionSetMap.get(instruction);

			if (!methodRef) {
				throw new Error("Instruction not recognized");
			}

			// exec instruction
			this[methodRef.instruction](
				this.resolveAddressingMode(methodRef.addressingMode),
			);
		}
	}

	public createSnapshot(): MOS6502SnapShot {
		return {
			cpuHalted: this.cpuHalted,
			programCounter: this.programCounter,
			stackPointer: this.stackPointer,
			accumulator: this.accumulator,
			X: this.X,
			Y: this.Y,
			processStatus: this.processStatus,
			ram: this.ram,
			cartridgesMemory: this.cartridgesMemory,
		};
	}

	public nextStep() {}

	public prevStep() {}

	private resolveAddressingMode(mode: AddressingMode) {
		switch (mode) {
			case AddressingMode.IMPLICIT: {
				this.programCounter++;
				return 0x0;
			}
			case AddressingMode.IMMEDIATE: {
				const address = this.programCounter + 1;
				this.programCounter += 2;
				return address;
			}
			case AddressingMode.ZERO_PAGE: {
				const address = this.memoryMapProxy(this.programCounter + 1);
				this.programCounter += 2;
				return address;
			}
			case AddressingMode.ZERO_PAGE_X: {
				const zeroPageAddr = this.memoryMapProxy(this.programCounter + 1);
				const address = (zeroPageAddr + this.X) & 0b0000000011111111;
				this.programCounter += 2;
				return address;
			}
			case AddressingMode.ZERO_PAGE_Y: {
				const zeroPageAddr = this.memoryMapProxy(this.programCounter + 1);
				const address = (zeroPageAddr + this.Y) & 0b0000000011111111;
				this.programCounter += 2;
				return address;
			}
			case AddressingMode.ABSOLUTE: {
				const address = this.memoryMapU16(this.programCounter + 1);
				this.programCounter += 3;
				return address;
			}
			case AddressingMode.ABSOLUTE_X: {
				const absoluteAddr = this.memoryMapU16(this.programCounter + 1);
				const address = absoluteAddr + this.X;
				this.programCounter += 3;
				return address;
			}
			case AddressingMode.ABSOLUTE_Y: {
				const absoluteAddr = this.memoryMapU16(this.programCounter + 1);
				const address = absoluteAddr + this.Y;
				this.programCounter += 3;
				return address;
			}
			case AddressingMode.RELATIVE: {
				// Branch instructions BEQ or BNE will update the program counter
				return this.programCounter + 1;
			}
			case AddressingMode.INDIRECT: {
				// only the JMP instruction use this addressing mode
				// JMP will update the program counter
				return this.programCounter + 1;
			}
			case AddressingMode.INDIRECT_X: {
				const zeroPageAddr = this.memoryMapProxy(this.programCounter + 1);
				const indirectAddress = zeroPageAddr + this.X;
				const address = this.memoryMapU16(indirectAddress);
				this.programCounter += 2;
				return address;
			}
			case AddressingMode.INDIRECT_Y: {
				const zeroPageAddr = this.memoryMapProxy(this.programCounter + 1);
				const addrFromZeroPageAddr = this.memoryMapU16(zeroPageAddr);
				const address = addrFromZeroPageAddr + this.Y;
				this.programCounter += 2;
				return address;
			}
		}
	}

	private setZeroAndNegativeFlag(register: number) {
		this.processStatus &= 0b01111101;

		if (register === 0x0) {
			this.processStatus |= 0b00000010;
		}

		if ((register & 0b10000000) !== 0) {
			this.processStatus |= 0b10000000;
		}
	}

	private BRK() {
		this.cpuHalted = true;
	}

	// Load/Store Operations

	private LDA(address: number) {
		const value = this.memoryMapProxy(address);
		this.accumulator = value;

		this.setZeroAndNegativeFlag(this.accumulator);
	}

	private LDX(address: number) {
		const value = this.memoryMapProxy(address);
		this.X = value;

		this.setZeroAndNegativeFlag(this.X);
	}

	private LDY(address: number) {
		const value = this.memoryMapProxy(address);
		this.Y = value;

		this.setZeroAndNegativeFlag(this.Y);
	}

	private STA(address: number) {
		this.memoryMapProxy(address, this.accumulator);
	}

	private STX(address: number) {
		this.memoryMapProxy(address, this.X);
	}

	private STY(address: number) {
		this.memoryMapProxy(address, this.Y);
	}

	// Register Transfers

	private TAX() {
		this.X = this.accumulator;
		this.setZeroAndNegativeFlag(this.X);
	}

	private TAY() {
		this.Y = this.accumulator;
		this.setZeroAndNegativeFlag(this.Y);
	}

	private TXA() {
		this.accumulator = this.X;
		this.setZeroAndNegativeFlag(this.accumulator);
	}

	private TYA() {
		this.accumulator = this.Y;
		this.setZeroAndNegativeFlag(this.accumulator);
	}

	// Stack Operations

	private TSX() {
		this.X = this.stackPointer;
		this.setZeroAndNegativeFlag(this.X);
	}

	private TXS() {
		this.stackPointer = this.X;
	}

	private PHA() {
		this.memoryMapProxy(this.stackPointer, this.accumulator);
		this.stackPointer--;
	}

	private PHP() {
		this.memoryMapProxy(this.stackPointer, this.processStatus);
		this.stackPointer--;
	}

	private PLA() {
		this.accumulator = this.memoryMapProxy(this.stackPointer + 1);
		this.setZeroAndNegativeFlag(this.accumulator);
		this.stackPointer++;
	}

	private PLP() {
		this.processStatus = this.memoryMapProxy(this.stackPointer + 1);
		this.stackPointer++;
	}

	// Logical Operations

	private AND(address: number) {
		const value = this.memoryMapProxy(address);
		this.accumulator &= value;

		this.setZeroAndNegativeFlag(this.accumulator);
	}

	private EOR(address: number) {
		const value = this.memoryMapProxy(address);
		this.accumulator ^= value;

		this.setZeroAndNegativeFlag(this.accumulator);
	}

	private ORA(address: number) {
		const value = this.memoryMapProxy(address);
		this.accumulator |= value;

		this.setZeroAndNegativeFlag(this.accumulator);
	}

	private BIT(address: number) {
		const value = this.memoryMapProxy(address);
		const result = this.accumulator & value;

		if (result === 0) {
			this.processStatus |= 0b00000010;
		}

		this.processStatus |= value & 0b11000000;
	}

	// Arithmetic Operations

	private ADC(address: number) {
		const value = this.memoryMapProxy(address);
		let hasCarry = false;

		const result = this.accumulator + value + (this.processStatus & 0b00000001);

		if (result > 255) {
			hasCarry = true;
			this.processStatus |= 0b00000001;
		} else {
			this.processStatus &= 0b11111110;
		}

		const overflow =
			~(this.accumulator ^ value) & (this.accumulator ^ result) & 0b10000000;

		if (overflow !== 0) {
			this.processStatus |= 0b01000000;
		} else {
			this.processStatus |= 0b10111111;
		}

		this.accumulator = hasCarry ? result & 0xff : result;
		this.setZeroAndNegativeFlag(this.accumulator);
	}

	private SBC(address: number) {
		const value = this.memoryMapProxy(address);
		let hasCarry = false;

		const result =
			this.accumulator - value - (1 - (this.processStatus & 0b00000001));

		if (result >= 0) {
			hasCarry = true;
			this.processStatus |= 0b00000001;
		} else {
			this.processStatus &= 0b11111110;
		}

		const overflow =
			~(this.accumulator ^ value) & (this.accumulator ^ result) & 0b10000000;

		if (overflow !== 0) {
			this.processStatus |= 0b01000000;
		} else {
			this.processStatus |= 0b10111111;
		}

		this.accumulator = !hasCarry ? 0 : result;
		this.setZeroAndNegativeFlag(this.accumulator);
	}
}
