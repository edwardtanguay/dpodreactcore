import * as utils from "./utils.js";

export class Piano {
	constructor(range = ["C2", "C7"]) {
		this.naturalNotesFlats = ["D", "E", "G", "A", "B"];
		this.naturalNotesSharps = ["C", "D", "F", "G", "A"];
		this.naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
		this.whiteKeyWidth = 80;
		this.pianoHeight = 400;
		this.range = range;
		this.allNaturalNotes = this.getAllNaturalNotes(this.range);
		this.pianoWidth = this.allNaturalNotes.length * this.whiteKeyWidth;
		this.pianoElem = document.querySelector("#piano");
		this.svg = this.createMainSvg();

		this.addWhiteKeys();
		this.addBlackKeys();

		this.pianoElem.appendChild(this.svg);
	}

	addWhiteKeys() {
		let whiteKeyPositionX = 0;
		this.allNaturalNotes.forEach((noteName) => {
			const whiteKeyTextGroup = utils.createSVGElement("g");
			const whiteKey = this.createKey({
				className: "white-key",
				width: this.whiteKeyWidth,
				height: this.pianoHeight,
			});
			const text = utils.createSVGElement("text");
			utils.addTextContent(text, noteName);
			utils.setAttributes(whiteKeyTextGroup, { width: this.whiteKeyWidth });
			utils.setAttributes(text, {
				x: whiteKeyPositionX + this.whiteKeyWidth / 2,
				y: 380,
				"text-anchor": "middle",
			});
			utils.setAttributes(whiteKey, {
				x: whiteKeyPositionX,
				"data-note-name": noteName,
				rx: "15",
				ry: "15",
			});

			text.classList.add("white-key-text");
			whiteKeyTextGroup.appendChild(whiteKey);
			whiteKeyTextGroup.appendChild(text);
			this.svg.appendChild(whiteKeyTextGroup);
			whiteKeyPositionX += this.whiteKeyWidth;
		});
	}

	addBlackKeys() {
		let blackKeyPositionX = 60;
		this.allNaturalNotes.forEach((naturalNote, index, array) => {
			// If last iteration of keys, do not add black key
			if (index === array.length - 1) {
				return;
			}

			const blackKeyTextGroup = utils.createSVGElement("g");
			const blackKey = this.createKey({
				className: "black-key",
				width: this.whiteKeyWidth / 2,
				height: this.pianoHeight / 1.6,
			});
			const flatNameText = utils.createSVGElement("text");
			const sharpNameText = utils.createSVGElement("text");

			utils.setAttributes(blackKeyTextGroup, { width: this.whiteKeyWidth / 2 });

			for (let i = 0; i < this.naturalNotesSharps.length; i++) {
				let naturalSharpNoteName = this.naturalNotesSharps[i];
				let naturalFlatNoteName = this.naturalNotesFlats[i];

				if (naturalSharpNoteName === naturalNote[0]) {
					utils.setAttributes(blackKey, {
						x: blackKeyPositionX,
						"data-sharp-name": `${naturalSharpNoteName}#${naturalNote[1]}`,
						"data-flat-name": `${naturalFlatNoteName}b${naturalNote[1]}`,
						rx: "8",
						ry: "8",
					});

					utils.setAttributes(sharpNameText, {
						"text-anchor": "middle",
						y: 215,
						x: blackKeyPositionX + this.whiteKeyWidth / 4,
					});

					utils.setAttributes(flatNameText, {
						"text-anchor": "middle",
						y: 235,
						x: blackKeyPositionX + this.whiteKeyWidth / 4,
					});

					utils.addTextContent(sharpNameText, `${naturalSharpNoteName}♯`);
					utils.addTextContent(flatNameText, `${naturalFlatNoteName}♭`);

					flatNameText.classList.add("black-key-text");
					sharpNameText.classList.add("black-key-text");

					// Add double spacing between D# and A#
					if (naturalSharpNoteName === "D" || naturalSharpNoteName === "A") {
						blackKeyPositionX += this.whiteKeyWidth * 2;
					} else {
						blackKeyPositionX += this.whiteKeyWidth;
					}

					blackKeyTextGroup.appendChild(blackKey);
					blackKeyTextGroup.appendChild(flatNameText);
					blackKeyTextGroup.appendChild(sharpNameText);
				}
			}
			this.svg.appendChild(blackKeyTextGroup);
		});
	}

	createOctave(octaveNumber) {
		const octave = utils.createSVGElement("g");
		octave.classList.add("octave");
		octave.setAttribute(
			"transform",
			`translate(${octaveNumber * octaveWidth}, 0)`
		);
		return octave;
	}

	createKey({ className, width, height }) {
		const key = utils.createSVGElement("rect");
		key.classList.add(className, "key");
		utils.setAttributes(key, {
			width: width,
			height: height,
		});
		return key;
	}

	getAllNaturalNotes([firstNote, lastNote]) {
		// Assign octave number, notes and positions to variables
		const firstNoteName = firstNote[0];
		const firstOctaveNumber = parseInt(firstNote[1]);
		const lastNoteName = lastNote[0];
		const lastOctaveNumber = parseInt(lastNote[1]);
		const firstNotePosition = this.naturalNotes.indexOf(firstNoteName);
		const lastNotePosition = this.naturalNotes.indexOf(lastNoteName);
		const notes = [];

		for (
			let octaveNumber = firstOctaveNumber;
			octaveNumber <= lastOctaveNumber;
			octaveNumber++
		) {
			// Handle first octave
			if (octaveNumber === firstOctaveNumber) {
				this.naturalNotes.slice(firstNotePosition).forEach((noteName) => {
					notes.push(noteName + octaveNumber);
				});

				// Handle last octave
			} else if (octaveNumber === lastOctaveNumber) {
				this.naturalNotes.slice(0, lastNotePosition + 1).forEach((noteName) => {
					notes.push(noteName + octaveNumber);
				});
			} else {
				this.naturalNotes.forEach((noteName) => {
					notes.push(noteName + octaveNumber);
				});
			}
		}
		return notes;
	}

	createMainSvg() {
		const returnSvg = utils.createSVGElement("svg");
		utils.setAttributes(returnSvg, {
			width: "100%",
			version: "1.1",
			xmlns: "http://www.w3.org/2000/svg",
			"xmlns:xlink": "http://www.w3.org/1999/xlink",
			viewBox: `0 0 ${this.pianoWidth} ${this.pianoHeight}`,
		});
		return returnSvg;
	}

	displayNotes(notes) {
		const pianoKeys = document.querySelectorAll(".key");
		utils.removeClassFromNodeCollection(pianoKeys, "show");
		notes.forEach((noteName) => {
			pianoKeys.forEach((key) => {
				const naturalName = key.dataset.noteName;
				const sharpName = key.dataset.sharpName;
				const flatName = key.dataset.flatName;

				if (
					naturalName === noteName ||
					sharpName === noteName ||
					flatName === noteName
				) {
					key.classList.add("show");
				}
			});
		});
	}
}
