import {FC, useContext, useEffect} from 'react';
import {GetServerSidePropsContext} from "next";
import {ICreatorPageProps} from "@/core/types";
import {Context} from "@/components/StoreProvider";
import PaddingWrp from "@/components/UI/PaddingWrp";
import CardsList from "@/components/UI/CardsList";
import {observer} from "mobx-react-lite";
import BlogCategoryService from "@/services/blog-category.service";
import CreatorsService from "@/services/creators.service";
import PostService from "@/services/post.service";


const CreatorPage:FC<ICreatorPageProps> = ({categories,creator, postsWithPagination}) => {
	const {store} = useContext(Context)
	useEffect(() => {
		store.categoriesStore.saveCategories(categories)
		if (postsWithPagination) {
			return store.postStore.savePostsWithPagination(postsWithPagination);
		}
	}, [postsWithPagination, categories]);

	const loadMore = async () => {
		if (postsWithPagination && store.postStore.postsWithPagination.nextPage) {
			await store.postStore.loadPostsWithPagination({page:store.postStore.postsWithPagination.nextPage, creatorId:creator._id})
		}
	}

	return (
		<div>
			Сраница креатора
			<h1>{creator?.fullName}</h1>
			{
				postsWithPagination
					?
					<PaddingWrp size={'small'}>
						<CardsList
							withTag={false}
							data={{posts:store.postStore.postsWithPagination.docs}}
							loadMore={store.postStore.postsWithPagination.hasNextPage}
							isLoading={store.postStore.isLoading}
							onLoadMore={loadMore}/>
					</PaddingWrp>
					:
					''
			}
		</div>
	);
};

export default observer(CreatorPage);

export async function getServerSideProps(context:GetServerSidePropsContext ) {
	const categoryTitleUrl = context.params?.category as string;
	const creatorNickName = context.params?.creator as string;

	const redirect = () => {
		context.res.setHeader("Location", "/");
		context.res.statusCode = 302;
		context.res.end();
		return
	}
	try {
		const [categories, creator] = await Promise.all([
			BlogCategoryService.getALl({fromServer:true})
				.then((r) => r.data),
			CreatorsService.getOne({nickName: creatorNickName,fromServer:true})
				.then((r) => r.data)
		])
		const currentCategory = categories.find((category) => category.titleUrl === categoryTitleUrl)

		if (currentCategory) {
			const creatorPostsRes = await PostService.getALl({categoryId: currentCategory._id,fromServer:true})
				.then((r) => r.data)
			return {props: {creator: creator, postsWithPagination: creatorPostsRes, categories: categories}}
		}else {
			return redirect()
		}
	}catch (e) {
		return redirect()
	}

}