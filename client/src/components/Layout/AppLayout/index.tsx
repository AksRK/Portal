import {FC, useEffect, useRef, useState} from "react";
import {useInView} from "framer-motion";
import Header from "@/components/Header";
import FixedWrp from "@/components/FixedWrp";
import Content from "@/components/UI/Content";
import Footer from "@/components/Footer";
import {useRouter} from "next/router";
import {AppLayoutProps} from "@/core/types";


export const AppLayout:FC<AppLayoutProps> = ({children, contentAnimate= true}) => {
	const router = useRouter()
	const [bannerBoxHeight, setBannerBoxHeight] = useState<number>(0)
	const [footerBoxHeight, setFooterBoxHeight] = useState<number>(0)
	const headerWithBannerRef = useRef<any>(null)
	const footerRef = useRef<any>(null)
	const contentObservedBlock = useRef<any>(null)
	const observedBlockState = useInView(contentObservedBlock)

	useEffect(()=> {
		if (contentAnimate) {
			setBannerBoxHeight(headerWithBannerRef.current.clientHeight)
			setFooterBoxHeight(footerRef.current.clientHeight)
		}
	},[router.asPath])

	if (router.asPath.includes('admin')) {
		return (
			<>
				<Header/>
				<Content ref={contentObservedBlock} height={'auto'} animate={contentAnimate}>
					{children}
				</Content>

			</>
		)
	}

	return (
		<>
			{
				contentAnimate
					?
					<FixedWrp isVisible={observedBlockState} ref={headerWithBannerRef} position={'header'} height={bannerBoxHeight}>
						<Header/>
					</FixedWrp>
					:
					<Header/>
			}


			<Content ref={contentObservedBlock} height={'auto'} animate={contentAnimate}>
				{children}
			</Content>

			{
				contentAnimate
					?
					<FixedWrp isVisible={!observedBlockState} ref={footerRef} position={'footer'} height={footerBoxHeight}>
						<Footer/>
					</FixedWrp>
					:
					<Footer/>
			}

		</>
	);
};

// export default Index;