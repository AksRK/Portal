import '@/core/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import 'suneditor/dist/css/suneditor.min.css';
import {useContext, useEffect} from "react";
import StoreProvider, {Context} from "@/components/StoreProvider";

import RouteProvider from "@/components/RouteProvider";
import {useRouter} from "next/router";
import {AppProps} from "next/app";




const App = ({ Component, pageProps }:AppProps) => {
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.authStore.checkAuth()
        }
    }, [])

    const router = useRouter()
    const pageKey = router.asPath

    return (
        <StoreProvider>
            <RouteProvider>
                <Component key={pageKey} {...pageProps} />
            </RouteProvider>
        </StoreProvider>
    )
}
export default App;