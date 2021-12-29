import { useState } from "react";

export default function useToggle(defaultValue: boolean) {
	const [value, setValue] = useState(defaultValue);

	function toggleValue(value: any = null) {
		if (value === null) {
			setValue(n => !n);
		} else {
			setValue(n => value);
		}
	}

	return [value, toggleValue] as const;
}