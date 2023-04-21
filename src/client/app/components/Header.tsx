import React from "react";

interface IHeaderProps {
	text: string;
}

export const Header: React.FC<IHeaderProps> = ({ text }) => {
	return <h1>{text}</h1>;
};
