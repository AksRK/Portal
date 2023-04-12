import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Store from "@/store/store";
import {createContext, useContext, useEffect} from "react";

interface State {
    store: Store
}

const store = new Store()

export const Context = createContext<State>({
    store,
})

export default function App({ Component, pageProps }: AppProps) {
    const {store} = useContext(Context)

    useEffect(()=> {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth()
        }
    }, [])



  return (
      <Context.Provider value={{store}}>
          <Component {...pageProps} />
      </Context.Provider>

  )
}
