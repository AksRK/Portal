import {BadRequestException, Injectable, NotFoundException, UploadedFile} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {File, FileDocument} from "./schemas/file.schema";
import { Multer } from 'multer';
import * as fs from "fs";
import { v4 as uuidV4 } from 'uuid';
import * as sharp from "sharp";
@Injectable()
export class FilesService {
	constructor(
		@InjectModel(File.name) private FileModel: Model<FileDocument>,
	) {}
	async uploadImage(imageFile: Multer.File): Promise<FileDocument> {
		try {
			const newFileName = uuidV4()
			const imageDirPath = `static/images/${newFileName}`;
			await fs.promises.mkdir(imageDirPath, { recursive: true });

			const originalFileType = imageFile.mimetype.split('/').at(-1)

			const imageOriginalPath = `${imageDirPath}/${newFileName}.${originalFileType}`
			const imageWebpPath = !imageFile.mimetype.includes('gif')?`${imageDirPath}/${newFileName}.webp`:imageOriginalPath

			await fs.promises.writeFile(imageOriginalPath, imageFile.buffer);
			if (!imageFile.mimetype.includes('gif')) {
				await sharp(imageOriginalPath).webp({ quality: 75 }).toFile(imageWebpPath);
			}

			const img = new this.FileModel({
				folderName: newFileName,
				folderPath: imageDirPath,
				originalImgPath: imageOriginalPath,
				compressedImgPath: imageWebpPath
			});
			await img.save()

			return img
		}catch (e) {
			throw new BadRequestException('Failed to load image')
		}
	}

	async getAllImages(): Promise<FileDocument[]> {
		return this.FileModel.find().exec()
	}

	async removeImage(id: string, folderPath?: string) : Promise<FileDocument> {
		let params = {}
		if (id) {
			params['_id'] = id;
		}
		if (folderPath) {
			params['folderPath'] = folderPath;
		}
		if (!id && !folderPath) {
			throw new BadRequestException(`Can't find image, please specify options`)
		}

		const image = await this.FileModel.findOne({...params})
		if (!image) {
			throw new NotFoundException('Image not found')
		}
		const folderExist = fs.existsSync(image.folderPath)
		if (folderExist) {
			await fs.promises.rm(image.folderPath, { recursive: true });
		}
		await image.deleteOne()

		return image
	}

	async removeAllImage() {
		const imageList = await this.FileModel.find()

		if (imageList.length > 0) {
			for (const image of imageList) {
				await this.removeImage(image._id)
			}
		}


		return {success:true}
	}
}
