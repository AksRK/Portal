import {FC} from "react";
import {Alert} from "@/core/utils/alert.utils";
import PostService from "@/services/post.service";
import PostForm from "@/components/Forms/PostForm";
import {ICreatePostPageProps, IPostFormData} from "@/core/types";
import {GetServerSidePropsContext} from "next";
import BlogCategoryService from "@/services/blog-category.service";
import CreatorsService from "@/services/creators.service";

const CreatePostPage:FC<ICreatePostPageProps> = ({categories,readAlsoPosts,creators}) => {
	const confirmCreate = async (data: IPostFormData) => {
		await PostService.create(data)
			.then((response)=> {
				Alert({msg: 'Пост успешно создан', type:'success'})
			})
			.catch((error) => {
				Alert({msg: error.response.data.message, type:'error'})
			})
	}

	return (
		<PostForm
			categories={categories}
			readAlsoPosts={readAlsoPosts}
			creators={creators}
			onSubmit={confirmCreate}
		/>
	);
};

export default CreatePostPage;

export async function getServerSideProps(context:GetServerSidePropsContext) {
	try {
		const [categories, readAlsoPosts, creators] = await Promise.all([
			BlogCategoryService.getALl({fromServer: true}).then((r) => r.data),
			PostService.getAllForReadAlso().then((r) => r.data),
			CreatorsService.getAllForAdminList().then((r) => r.data)
		])

		return {
			props: {categories: categories, readAlsoPosts: readAlsoPosts, creators: creators}
		}
	}catch (err) {
		context.res.setHeader("Location", "/admin/panel/posts");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

}