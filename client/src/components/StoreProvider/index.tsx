import {createContext, FC } from 'react';

import store from "@/store";
import {IStoreProviderProps} from "@/core/types";

export const Context = createContext({
	store,
})

const StoreProvider:FC<IStoreProviderProps> = ({children}) => {
	return (
		<Context.Provider value={{store}}>
			{children}
		</Context.Provider>
	);
};

export default StoreProvider;