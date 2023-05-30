import {makeAutoObservable, runInAction} from "mobx";
import {IPostsLoadParams, IPostsResWithPagination} from "@/core/types";
import PostService from "@/services/post.service";

export class PostStore {
	postsWithPagination: IPostsResWithPagination = {
		docs: [],
		totalDocs: 0,
		limit: 0,
		totalPages: 0,
		page: 0,
		pagingCounter: 0,
		hasPrevPage: false,
		hasNextPage: false,
		prevPage: null,
		nextPage: null
	};
	isLoading: boolean = false

	constructor() {
		makeAutoObservable(this);
	}

	setLoading (bool: boolean) {
		this.isLoading = bool
	}
	savePostsWithPagination(postsWithPagination: IPostsResWithPagination): void {
		this.postsWithPagination = postsWithPagination;
	}

	async loadPostsWithPagination({page, categoryId, creatorId}:IPostsLoadParams) {
		this.setLoading(true)
		try {
			const options = {page: page, categoryId: categoryId, creatorId: creatorId}
			const response = await PostService.getALl(options)
			runInAction(() => {
				this.postsWithPagination = {
					...this.postsWithPagination,
					...response.data,
					docs: [...this.postsWithPagination.docs, ...response.data.docs],

				};
			});
		}catch (e) {

		}finally {
			this.setLoading(false)
		}
	}
}