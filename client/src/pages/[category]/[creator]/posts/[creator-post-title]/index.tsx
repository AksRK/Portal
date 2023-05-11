import React, {FC} from 'react';
import {GetServerSidePropsContext} from "next";
import {IPostPageProps} from "@/core/types";
import {API_URL} from "@/core/constants";

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
	const [currentCategory, currentCreator] = await Promise.all([
		fetch(`${API_URL}/blog/category/url/${context.params?.category}`).then(r => r.json()),
		fetch(`${API_URL}/creators/nick-name/${context.params?.creator}`).then((res) => res.json()),

	])
	if (currentCategory?.statusCode == 404 || currentCreator?.statusCode == 404) {
		context.res.setHeader("Location", "/");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

	const post = await fetch(`${API_URL}/posts/query/one/?categoryId=${currentCategory?._id}&creatorId=${currentCreator._id}&titleUrl=${context.params?.['creator-post-title']}`).then((res) => res.json())
	return {props: {post: post}}
}