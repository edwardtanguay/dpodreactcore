import { createContext, useState } from 'react';

const ShowContext = createContext();

export const ShowProvider = ({ children }) => {
	const [isShowing, setIsShowing] = useState(true);

	return (
		<ShowContext.Provider value={{ isShowing, setIsShowing }}>
			{children}
		</ShowContext.Provider>
	);
};

export default ShowContext;
