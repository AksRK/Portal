import dynamic from "next/dynamic";
import React from "react";
import { Core } from "suneditor/src/lib/core";
import {Alert} from "@/core/utils/alert.utils";
import ImageService from "@/services/image.service";
import {EditorProps} from "@/core/types";

const SunEditor = dynamic(() => import("suneditor-react"), {
	ssr: false,
});

//TODO Поправить Алерты

export default function Editor({ initialContent = "", name, onChange, props }: EditorProps) {
	let imagesArr: string[] = []

	const options = {
		setDefaultStyle: 'font-family: Source Serif Pro; font-size: 24px;',
		height: 750,
		"formats": [
			"p",
			"h3",
			"blockquote",
			"pre",
		],
		font: [
			'Source Serif Pro',
			'Inter',
		],
		"videoResizing": false,
		"videoFileInput": false,
		"imageResizing": false,
		"imageHeightShow": false,
		"imageAlignShow": false,
		buttonList: [
			[
				'undo',
				'redo',

				'font',
				'fontSize',

				'formatBlock',
				'bold',
				'underline',
				'italic',
				'blockquote',
				'strike',
				'fontColor',
				'hiliteColor',
				'removeFormat',
				'outdent',
				'indent',
				'align',
				'list',
				'link',
				'image',
				"video",
				'showBlocks',
				'codeView',
			]
		],

	}

	const handleImageUploadBefore = (files: any, info: any, uploadHandler: Function) => {
		const image = files[0]
		const domainString = document.domain
		ImageService.upload(image)
			.then((response) => {
			const res = {
				// errorMessage: response?.data?.message,
				result: [
					{
						url: 'http://'+domainString+':3000/api/'+response.data.compressedImgPath,
						size: files[0].size,
						name: response.data._id
					}
				]
			}
			uploadHandler(res)
		})
			.catch((error) => {
				Alert({msg: error?.response?.data?.message, type: 'error'})
				uploadHandler()
			})

	};

	const handleImageUpload = (
		targetElement: HTMLElement,
		index: number,
		state: 'create' | 'update' | 'delete',
		info: {src: string},
	) => {
		const regexUrl = new RegExp(/static\/images\/\w{8}-(\w{4}-){3}\w{12}/, 'g')

		if (state === 'create') imagesArr.push(info.src)
		if (state === 'update') {

			imagesArr = imagesArr.map((image, i) => {
				if (i === index) {
					const url = imagesArr[index].match(regexUrl)
					if (url) {
						removeFromServer('Картинка Обновлена!', url[0])
					}
					return info.src
				}
				return image
			})
		}
		if (state === 'delete') {
			const url = imagesArr[index].match(regexUrl)
			if (url) {
				removeFromServer('Картинка удалена!', url[0])
			}

		}
	}

	const removeFromServer = (successText: string, path: string) => {
		ImageService.delete({folderPath: path})
			.then((response) => {
				Alert({msg: successText, type: 'info'})
			})
			.catch((error) => {
				Alert({msg:error.message, type: 'error'})
			})
	}

	return (
		<div>
			<SunEditor
				{...props}
				placeholder={'Начните создавать статью)'}
				name={name}
				lang={'ru'}
				setContents={initialContent}
				setDefaultStyle={'font-family: Source Serif Pro; font-size: 22px;'}
				setOptions={options}
				onImageUploadBefore={handleImageUploadBefore}
				onImageUpload={handleImageUpload}
				// onImageUploadError={handleImageUploadError}
				onChange={onChange}

			/>
		</div>
	);
}