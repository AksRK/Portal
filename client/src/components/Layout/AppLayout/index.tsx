import {FC, useContext, useEffect, useRef, useState} from "react";
import {useInView} from "framer-motion";
import Header from "@/components/Header";
import FixedWrp from "@/components/FixedWrp";
import Content from "@/components/UI/Content";
import Footer from "@/components/Footer";
import {useRouter} from "next/router";
import {IAppLayoutProps} from "@/core/types";
import {Context} from "@/components/StoreProvider";
import CategoryNav from "@/components/CategoryNav";
import {observer} from "mobx-react-lite";
import ObservedBlock from "@/components/UI/ObservedBlock";


const AppLayout:FC<IAppLayoutProps> = ({children, contentAnimate= true}) => {
	const {store} = useContext(Context)
	const router = useRouter()
	const [bannerBoxHeight, setBannerBoxHeight] = useState<number>(0)
	const [footerBoxHeight, setFooterBoxHeight] = useState<number>(0)

	const headRef = useRef<HTMLDivElement>(null)
	const footerRef = useRef<HTMLDivElement>(null)

	const topContentRef = useRef<HTMLDivElement>(null)
	const observedTopContentRef = useInView(topContentRef);
	const bottomContentRef = useRef<HTMLDivElement>(null)
	const observedBottomContentRef = useInView(bottomContentRef)

	const categoryNavAllowedRoutes = ['[creator]', '[category]']
	const isHomeBlog = router.pathname.length > 1?categoryNavAllowedRoutes.some(item => router.pathname.includes(item)) && !router.asPath.includes('posts'):true

	useEffect(()=> {
		if (contentAnimate && headRef.current && footerRef.current) {
			setBannerBoxHeight(headRef.current.clientHeight)
			setFooterBoxHeight(footerRef.current.clientHeight)
		}
	},[router.asPath])

	return (
		<>
			{
				contentAnimate
					?
					<FixedWrp isVisible={observedTopContentRef} ref={headRef} position={'header'} height={bannerBoxHeight}>
						<Header/>
						{
							isHomeBlog? <div style={{height:'300px'}}></div> :''
						}
					</FixedWrp>
					:
					<Header/>
			}
			<ObservedBlock ref={topContentRef}/>
			<Content height={'full'} fixedWrpHeight={bannerBoxHeight} animate={contentAnimate}>
				{
					isHomeBlog? <CategoryNav categories={store.categoriesStore.categories}/> :''
				}
				{children}
			</Content>
			<ObservedBlock ref={bottomContentRef}/>
			{
				contentAnimate
					?
					<FixedWrp isVisible={observedBottomContentRef} ref={footerRef} position={'footer'} height={footerBoxHeight}>
						<Footer/>
					</FixedWrp>
					:
					<Footer/>
			}
		</>
	);
};

export default observer(AppLayout);