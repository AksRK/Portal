import '@/core/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import 'suneditor/dist/css/suneditor.min.css';

import type { AppProps } from 'next/app'
import {useContext, useEffect} from "react";
import StoreProvider, {Context} from "@/components/StoreProvider";

import {useRouter} from "next/router";
import RouteProvider from "@/components/RouteProvider";



export default function App({ Component, pageProps }: AppProps) {
    const {store} = useContext(Context)
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.authStore.checkAuth()
        }
    }, [])

    return (
        <StoreProvider>
            <RouteProvider>
                <Component {...pageProps} />
            </RouteProvider>
        </StoreProvider>
    )
}