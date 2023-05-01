import React, {useState, useEffect, useRef, FC} from 'react';
import useWindowSize from "@/core/hooks/UseWindowSize";
import {shrinkTextProps} from "@/core/types";

const ShrinkText:FC<shrinkTextProps> = ({ text, wrapperRef }) => {
	const [truncatedText, setTruncatedText] = useState<string>(text);
	const textBlockRef = useRef<HTMLDivElement>(null);
	const {width} = useWindowSize()

	useEffect(() => {
		const textBlock = textBlockRef.current;
		const wrpBox = wrapperRef.current

		if (wrpBox && textBlock!.clientHeight > wrpBox.clientHeight) {
			setTruncatedText(prevText => prevText.substring(0, prevText.lastIndexOf(' ')) + '...');
			console.log(truncatedText)
		}

	}, [width,truncatedText]);

	return (
		<div ref={textBlockRef} style={{height:'fit-content'}}>
			{truncatedText}
		</div>
	);
};

export default ShrinkText;