import {FC} from "react";
import {TFullSizeImageModalProps} from "@/core/types";
import {Backdrop, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import styles from './full-size-image-modal.module.scss'


const FullSizeImageModal:FC<TFullSizeImageModalProps> = ({state, setState, imgUrl, imageId}) => {
	if (!imgUrl && !imageId) {
		return <></>
	}

	return (
		<Modal
			open={state}
			onClose={()=>setState(false)}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={state}>
				<Box>
					<div className={styles.fullSizeImgWrp}>
						{imgUrl && (
							<img src={imgUrl} alt={imgUrl} onClick={()=> setState(false)}/>
						)}
					</div>
				</Box>
			</Fade>
		</Modal>
	);
};

export default FullSizeImageModal;