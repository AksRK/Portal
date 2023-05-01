import React, {createContext, FC } from 'react';

import store from "@/store";
import {StoreProviderProps} from "@/core/types";

export const Context = createContext({
	store,
})

const StoreProvider:FC<StoreProviderProps> = ({children}) => {
	return (
		<Context.Provider value={{store}}>
			{children}
		</Context.Provider>
	);
};

export default StoreProvider;