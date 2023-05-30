import {FC} from 'react';
import {GetServerSidePropsContext} from "next";
import {IPostPageProps} from "@/core/types";
import BlogCategoryService from "@/services/blog-category.service";
import PostService from "@/services/post.service";


const PostPage:FC<IPostPageProps> = ({post}) => {

	return (
		<div>
			Сраница поста
			<h1>{post?.title}</h1>
		</div>
	);
};

export default PostPage;

export async function getServerSideProps(context:GetServerSidePropsContext ) {
	const redirect = () => {
		context.res.setHeader("Location", "/");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}
	const categoryTitleUrl = context.params?.category as string;
	const postTitleUrl = context.params?.['post-title'] as string;

	const currentCategory =
		await BlogCategoryService
			.getOne({titleUrl:categoryTitleUrl, fromServer:true})
			.then((r) => r.data)
			.catch((err) => {
				redirect()
			})

	if (currentCategory) {
		const post =
			await PostService
				.getOne({titleUrl: postTitleUrl, categoryId: currentCategory._id, fromServer: true})
				.then((r) => r.data)
				.catch((err) => {
					redirect()
				})

		return {props: {post: post}}
	}
}