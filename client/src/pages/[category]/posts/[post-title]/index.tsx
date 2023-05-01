import React, {FC} from 'react';
import {GetServerSidePropsContext} from "next";
import {IPostPageProps} from "@/core/types";


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
	const currentCategory = await fetch(`http://localhost:3000/api/blog/category/url/${context.params?.category}`).then(r => r.json())

	if (currentCategory?.statusCode == 404) {
		context.res.setHeader("Location", "/");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

	const post = await fetch(`http://localhost:3000/api/posts/query/one/?categoryId=${currentCategory?._id}&titleUrl=${context.params?.['post-title']}`).then((res) => res.json())

	if (post?.statusCode == 404) {
		context.res.setHeader("Location", "/"+context.params?.category);
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

	return {props: {post: post}}
}