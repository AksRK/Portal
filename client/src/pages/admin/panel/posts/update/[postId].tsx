import {FC} from "react";
import {IPostFormData, IUpdatePostPageProps} from "@/core/types";
import {GetServerSidePropsContext} from "next";
import {Alert} from "@/core/utils/alert.utils";
import PostService from "@/services/post.service";
import BlogCategoryService from "@/services/blog-category.service";
import CreatorsService from "@/services/creators.service";
import PostForm from "@/components/Forms/PostForm";


const UpdatePostPage:FC<IUpdatePostPageProps> = ({post, categories,readAlsoPosts,creators}) => {
	const confirmUpdate = async (data: IPostFormData) => {
		await PostService.update(data, post._id)
			.then((response)=> {
				Alert({msg: 'Пост успешно обновлен', type:'success'})
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
			defaultPostValues={post}
			onSubmit={confirmUpdate}
		/>
	);
};

export default UpdatePostPage;

export async function getServerSideProps(context:GetServerSidePropsContext) {
	try {
		const [post, categories, readAlsoPosts, creators] = await Promise.all([
			PostService.getOneById(context?.params?.postId as string).then((r) => r.data),
			BlogCategoryService.getALl({fromServer: true}).then((r) => r.data),
			PostService.getAllForReadAlso().then((r) => r.data),
			CreatorsService.getAllForAdminList().then((r) => r.data)
		])

		return {
			props: {post: post, categories: categories, readAlsoPosts: readAlsoPosts, creators: creators}
		}
	}catch (err) {
		context.res.setHeader("Location", "/admin/panel/posts");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

}