import { FC } from "react";
import styled, {css} from "styled-components";
import {IFlexBox} from "@/core/types";

const StyledFlexBox = styled.div<IFlexBox>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  ${({justifyContent}) => justifyContent && css `justify-content: ${justifyContent}`}};
  ${({alignItems}) => alignItems && css `alignItems: ${alignItems}`}};
  ${({gap}) => gap && css `gap: ${Array.isArray(gap) ? gap.map(value => `${value}px`).join(' ') : `${gap}px`}`};
  
  ${({ customStyles }) =>
	customStyles &&
	css`
      ${customStyles}
    `}

`;

const FlexBox: FC<IFlexBox> = ({ children, justifyContent, alignItems,gap=10, customStyles}) => {
	return (
		<StyledFlexBox
			customStyles={customStyles}
			justifyContent={justifyContent}
			alignItems={alignItems}
			gap={gap}>
			{children}
		</StyledFlexBox>
	);
};
export default FlexBox;