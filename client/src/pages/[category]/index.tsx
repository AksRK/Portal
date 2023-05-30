import {GetServerSidePropsContext} from "next";
import CategoryNav from "@/components/CategoryNav";
import {FC, useContext, useEffect} from "react";
import {ICategoryPageProps} from "@/core/types";
import PostService from "@/services/post.service";
import BlogCategoryService from "@/services/blog-category.service";
import CreatorsService from "@/services/creators.service";
import {Context} from "@/components/StoreProvider";
import PaddingWrp from "@/components/UI/PaddingWrp";
import {observer} from "mobx-react-lite";
import CardsList from "@/components/UI/CardsList";


const CategoryPage:FC<ICategoryPageProps> = ({ postsWithPagination, creatorsWithPagination, categories}) => {
	const {store} = useContext(Context)
	useEffect(() => {
		store.categoriesStore.saveCategories(categories)
		if (postsWithPagination) {
			return store.postStore.savePostsWithPagination(postsWithPagination);
		}
		if (creatorsWithPagination) {
			return store.creatorStore.saveCreatorsWithPagination(creatorsWithPagination)
		}
	}, [postsWithPagination, creatorsWithPagination, categories]);

	const loadMore = async () => {
		if (postsWithPagination && store.postStore.postsWithPagination.nextPage) {
			await store.postStore.loadPostsWithPagination({page:store.postStore.postsWithPagination.nextPage})
		}
		if (creatorsWithPagination && store.creatorStore.creatorsWithPagination.nextPage) {
			await store.creatorStore.loadCreatorsWithPagination({page:store.creatorStore.creatorsWithPagination.nextPage})
		}
	}

	return (
		<>
			<PaddingWrp size={'small'}>
			{
				postsWithPagination
					?
						<CardsList
							withTag={true}
							data={{posts:store.postStore.postsWithPagination.docs}}
							loadMore={store.postStore.postsWithPagination.hasNextPage}
							isLoading={store.postStore.isLoading}
							onLoadMore={loadMore}/>
					:
					''
			}
			{
				creatorsWithPagination
					?
					<CardsList
						withTag={false}
						data={{creators:store.creatorStore.creatorsWithPagination.docs}}
						loadMore={store.creatorStore.creatorsWithPagination.hasNextPage}
						isLoading={store.creatorStore.isLoading}
						onLoadMore={loadMore}/>
					:
					''
			}
			</PaddingWrp>
		</>
	);
};

export default observer(CategoryPage);

export async function getServerSideProps(context:GetServerSidePropsContext) {
	const categoryTitleUrl = context.params?.category as string;

	const categories = await BlogCategoryService.getALl({fromServer: true}).then((r) => r.data)
	const currentCategory = categories.find((category) => category.titleUrl === categoryTitleUrl)

	if (!currentCategory?.editable) {
		const creatorsWithPagination = await CreatorsService.getALl({fromServer:true}).then((r) => r.data)

		return {
			props: {creatorsWithPagination: creatorsWithPagination, categories: categories}
		}
	}

	const postsResponse = await PostService.getALl({categoryId: currentCategory._id, fromServer:true}).then((r)=> r.data)

	return {
		props: {postsWithPagination: postsResponse, categories: categories}
	}
}