import {GetServerSidePropsContext} from "next";
import CategoryNav from "@/components/CategoryNav";
import {FC} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {ICategoryPageProps} from "@/core/types";


const CategoryPage:FC<ICategoryPageProps> = ({ categories, posts, creators, currentCategory}) => {
	const router = useRouter()

	return (
		<>
			<CategoryNav categories={categories}/>
			{
				posts?.map((post)=> {
					return <Link href={`/${router?.query?.category}/posts/${post.titleUrl}`}>{post.title}</Link>
				})
			}
			{
				creators?.map((creator) => {
					return <Link href={`/${router?.query?.category}/${creator.nickName}`}>{creator.fullName}</Link>
				})
			}
		</>
	);
};

export default CategoryPage;

export async function getServerSideProps(context:GetServerSidePropsContext ) {
	const [categories, currentCategory] = await Promise.all([
		await fetch(`http://localhost:3000/api/blog/category/`).then(r => r.json()),
		await fetch(`http://localhost:3000/api/blog/category/url/${context.params?.category}`).then(r => r.json())

	])

	if (currentCategory.statusCode == 404) {
		context.res.setHeader("Location", "/");
		context.res.statusCode = 302;
		context.res.end();
		return { props: {} };
	}

	let posts
	let creators

	if (!currentCategory.editable) {
		creators = await fetch(`http://localhost:3000/api/creators/`).then(r => r.json())

		return {
			props: {categories: categories, creators: creators, currentCategory: currentCategory}
		}
	}else {
		posts = await fetch(`http://localhost:3000/api/posts/category/${currentCategory._id}`).then(r => r.json())

		return {
			props: {categories: categories, posts : posts, currentCategory: currentCategory}
		}
	}

}