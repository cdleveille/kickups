import React, { useState } from "react";

interface IInitialsProps {
	initials: string;
	setInitials: (initials: string) => void;
	scaleRatio: number;
}

export const Initials = ({ initials, setInitials, scaleRatio }: IInitialsProps) => {
	const [show, setShow] = useState(false);
	const [inputValue, setInputValue] = useState("");

	if (!show) return null;

	const onInput = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget?.value?.toUpperCase();
		const validatedValue = validate(value);
		setInputValue(validatedValue);
	};

	const validate = (value: string) => {
		if (!value || !value.match(/^[A-Z]*$/)) return "";
		return value.slice(0, 3).toUpperCase();
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setInitials(inputValue);
		setShow(false);
	};

	return (
		<form spellCheck="false" onSubmit={onSubmit}>
			<input
				id="initials-input"
				className="centered"
				type="text"
				maxLength={3}
				autoComplete="off"
				onInput={onInput}
				value={inputValue}
				autoFocus={true}
			/>
		</form>
	);
};
