import React, {FC} from 'react';
import {GetServerSidePropsContext} from "next";
import CategoryNav from "@/components/CategoryNav";
import Link from "next/link";
import {useRouter} from "next/router";
import {ICreatorPageProps} from "@/core/types";
import {API_URL} from "@/core/constants";


const CreatorPage:FC<ICreatorPageProps> = ({categories,creator, posts}) => {
	const router = useRouter()

	return (
		<div>
			<CategoryNav categories={categories}/>
			Сраница креатора
			<h1>{creator?.fullName}</h1>
			{
				posts?.map((post:any)=> {
					return <Link href={`/${router?.query?.category}/${router?.query?.creator}/${post.titleUrl}`}>{post.title}</Link>
				})
			}
		</div>
	);
};

export default CreatorPage;

export async function getServerSideProps(context:GetServerSidePropsContext ) {
	const [categories, currentCategory] = await Promise.all([
		fetch(`${API_URL}/blog/category/`).then(r => r.json()),
		fetch(`${API_URL}/blog/category/url/${context.params?.category}`).then(r => r.json())

	])

	if (currentCategory?.statusCode == 404) {
		context.res.setHeader("Location", "/");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

	const [creator, creatorPosts] = await Promise.all([
		fetch(`${API_URL}/creators/nick-name/${context.params?.creator}`).then((res) => res.json()),
		fetch(`${API_URL}/posts/query/all/?categoryId=${currentCategory._id}&creator=${context.params?.creator}`).then((res) => res.json()),
	])

	if (creator?.statusCode == 404) {
		context.res.setHeader("Location", "/"+context.params?.category);
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

	return {props: {categories: categories,creator: creator, posts: creatorPosts}}
}