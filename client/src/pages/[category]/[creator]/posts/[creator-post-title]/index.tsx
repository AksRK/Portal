import {FC} from 'react';
import {GetServerSidePropsContext} from "next";
import {IPostPageProps} from "@/core/types";
import BlogCategoryService from "@/services/blog-category.service";
import CreatorsService from "@/services/creators.service";
import PostService from "@/services/post.service";

const CreatorPostPage:FC<IPostPageProps> = ({post}) => {

	return (
		<div>
			Сраница поста Креатора
			<h1>{post?.title}</h1>
		</div>
	);
};

export default CreatorPostPage;

export async function getServerSideProps(context:GetServerSidePropsContext ) {
	const redirect = () => {
		context.res.setHeader("Location", "/");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}
	try {
		const [currentCategory, currentCreator] = await Promise.all([
			BlogCategoryService.getOne({titleUrl:context.params?.category as string, fromServer: true})
				.then((r) => r.data),
			CreatorsService.getOne({nickName: context.params?.creator as string, fromServer: true})
				.then((r) => r.data)
		])
		const post = await PostService.getOne({
			titleUrl: context.params?.['creator-post-title'] as string,
			categoryId: currentCategory._id,
			creatorId: currentCreator._id,
			fromServer:true})
			.then((r) => r.data)

		return {props: {post: post}}
	}catch (e) {
		return redirect()
	}

}