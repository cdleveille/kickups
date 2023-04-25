import React, { CSSProperties, useState } from "react";

interface IInitialsProps {
	initials: string;
	setInitials: (initials: string) => void;
	scaleRatio: number;
	offset: { xOffset: number; yOffset: number };
}

export const Initials = ({ initials, setInitials, scaleRatio, offset }: IInitialsProps) => {
	const [showInput, setShowInput] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const onInput = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget?.value?.toUpperCase();
		const validatedValue = validate(value);
		setInputValue(validatedValue);
	};

	const validate = (value: string) => {
		if (!value) return "";
		let filteredValue = "";
		for (const char of value) {
			if (char.match(/^[A-Z]*$/)) filteredValue += char;
		}
		return filteredValue.slice(0, 3).toUpperCase();
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue.length < 3) return;
		setInitials(inputValue);
		setInputValue("");
		setShowInput(false);
	};

	const initialsShowStyle: CSSProperties = {
		fontSize: `${scaleRatio * 65}px`,
		bottom: `${offset.yOffset + scaleRatio * 35}px`,
		left: `${offset.xOffset + scaleRatio * 40}px`,
		padding: `${scaleRatio * 6}px`
	};

	const initialsInputLabelStyle: CSSProperties = {
		fontSize: `${scaleRatio * 40}px`,
		top: `${offset.yOffset + scaleRatio * 320}px`
	};

	const initialsInputStyle: CSSProperties = {
		fontSize: `${scaleRatio * 150}px`,
		width: `${scaleRatio * 265}px`,
		border: `${scaleRatio * 4}px dotted #00ffff`,
		paddingTop: `${scaleRatio * 16}px`,
		paddingLeft: `${scaleRatio * 16}px`,
		paddingRight: `${scaleRatio * 16}px`
	};

	return (
		<>
			<div id="intitials-show" onClick={() => setShowInput(!showInput)} style={initialsShowStyle}>
				{initials}
			</div>
			{showInput && (
				<form spellCheck="false" onSubmit={onSubmit}>
					<div id="initials-input-label" className="centered-horizontally" style={initialsInputLabelStyle}>
						{" "}
						ENTER YOUR INITIALS:
					</div>
					<input
						id="initials-input"
						className="centered"
						type="text"
						maxLength={3}
						autoComplete="off"
						onInput={onInput}
						value={inputValue}
						autoFocus={true}
						style={initialsInputStyle}
					/>
				</form>
			)}
		</>
	);
};
