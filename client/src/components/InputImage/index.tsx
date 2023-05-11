import React, {useState, useCallback, FC, ChangeEvent, useEffect} from "react";
import ImageService from "@/services/image.service";
import Image from 'next/image';
import styles from './input-image.module.scss';
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {Alert} from "@/core/utils/alert.utils";
import FullSizeImageModal from "@/components/FullSizeImageModal";
import {InputImageProps} from "@/core/types";

const InputImage:FC<InputImageProps> = ({imageData, setImageData}) => {
	const [fullSizePreview, setFullSizePreview] = useState<boolean>(false)

	const imgUpload = async (event: ChangeEvent<HTMLInputElement> | null) => {
		const image = event?.target?.files?.[0];

		const resetInput = () => {
			event?.target?.form && event.target.form.reset();
		}

		if (image) {
			await ImageService.upload(image)
				.then((response) => {
					setImageData(response.data)
					Alert({msg: 'Картинка успешно загружена', type:'success'})
				})
				.catch((error) => {
					resetInput()
					Alert({msg: error.response.data.message, type:'info'})
				});
		}
	};

	const removeImg = async () => {
		await ImageService.delete({id: imageData?._id})
			.then((respone) => {
				setImageData(null)
				Alert({msg: 'Картинка удалена', type:'info'})
			})
			.catch((error) => {
				Alert({msg: error.response.data.message, type:'info'})
			})
	}

	const handleFullSizePreview = () => {
		setFullSizePreview(!fullSizePreview)
	}

	return (
		<form>
			<div className={styles.inputImage}>
				{
					imageData
						?
						<>
							<div className={styles.inputImage__tools}>
								<IconButton onClick={handleFullSizePreview} aria-label="delete">
									<OpenInFullIcon />
								</IconButton>
								<IconButton onClick={removeImg} aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</div>
							<Image
								src={`/api/${imageData?.originalImgPath}`}
								alt="My Image"
								fill={true}
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw"
								priority={false}
								// onError={handleImageError}
							/>
						</>
						:
						<>
							<div className={styles.inputImage__add}>
								<input
									type="file"
									accept="image/*"
									name={'titleImg'}
									id={'titleImg'}
									onChange={(event) => imgUpload(event)}
								/>
							</div>
						</>
				}
			</div>

			<FullSizeImageModal state={fullSizePreview} setState={setFullSizePreview} imgUrl={`/api/${imageData?.originalImgPath}`}/>
		</form>
	);
};

export default InputImage;
