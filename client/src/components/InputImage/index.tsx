import {useState, FC, useRef} from "react";
import ImageService from "@/services/image.service";
import Image from 'next/image';
import styles from './input-image.module.scss';
import {CircularProgress, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {Alert} from "@/core/utils/alert.utils";
import FullSizeImageModal from "@/components/FullSizeImageModal";
import {IInputImageProps} from "@/core/types";

const InputImage:FC<IInputImageProps> = ({imageData, setImageData}) => {
	const [fullSizePreview, setFullSizePreview] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const ref = useRef<HTMLInputElement>(null)
	const removeImg = async () => {
		setIsLoading(true)
		await ImageService.delete({id: imageData?._id})
			.then((respone) => {
				setImageData(null)
				Alert({msg: 'Картинка удалена', type:'info'})
			})
			.catch((error) => {
				Alert({msg: error.response.data.message, type:'info'})
			})
			.finally(()=> setIsLoading(false));
	}
	const handleFullSizePreview = () => {
		setFullSizePreview(!fullSizePreview)
	}
	const handleFileInputChange = async () => {
		if (ref.current && ref?.current?.files) {
			const image = ref?.current?.files[0];

			if (image) {
				setIsLoading(true)
				await ImageService.upload(image)
					.then((response) => {
						setImageData(response.data)
						Alert({msg: 'Картинка успешно загружена', type:'success'})
					})
					.catch((error) => {
						clearInput()
						Alert({msg: error.response.data.message, type:'info'})
					})
					.finally(()=> setIsLoading(false));
			}
		}
	};
	const clearInput = () => {
		if (ref.current) {
			ref.current.value = '';
		}
	};

	return (
		<>
			<div className={styles.inputImage}>
				{
					imageData
						?
						<>
							<div className={styles.inputImage__tools}>
								<IconButton disabled={isLoading} onClick={handleFullSizePreview} aria-label="delete">
									<OpenInFullIcon />
								</IconButton>
								<IconButton disabled={isLoading} onClick={removeImg} aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</div>
							<Image
								src={`/api/${imageData?.originalImgPath}`}
								alt="My Image"
								fill={true}
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33.3vw"
								priority={false}
							/>
						</>
						:
						isLoading
							?
							<div className={styles.inputImage__loader}>
								<CircularProgress size={60}/>
							</div>
							:
							<div className={styles.inputImage__add}>
								<input
									ref={ref}
									type="file"
									accept="image/*"
									name={'titleImg'}
									id={'titleImg'}
									onChange={handleFileInputChange}
								/>
							</div>

				}
			</div>
			<FullSizeImageModal state={fullSizePreview} setState={setFullSizePreview} imgUrl={`/api/${imageData?.originalImgPath}`}/>
		</>
	);
};

export default InputImage;
