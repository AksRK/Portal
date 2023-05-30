import {makeAutoObservable, runInAction} from "mobx";
import {ICreatorsResWithPagination, IPostsLoadParams} from "@/core/types";
import CreatorsService from "@/services/creators.service";
export class CreatorStore {
	creatorsWithPagination: ICreatorsResWithPagination = {
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
	saveCreatorsWithPagination(creatorsWithPagination: ICreatorsResWithPagination): void {
		this.creatorsWithPagination = creatorsWithPagination;
	}
	async loadCreatorsWithPagination({page, categoryId, creatorId}:IPostsLoadParams) {
		this.setLoading(true)
		try {
			const options = {page: page, categoryId: categoryId, creatorId: creatorId}
			const response = await CreatorsService.getALl(options)
			runInAction(() => {
				this.creatorsWithPagination = {
					...this.creatorsWithPagination,
					...response.data,
					docs: [...this.creatorsWithPagination.docs, ...response.data.docs],

				};
			});
		}catch (e) {

		}finally {
			this.setLoading(false)
		}
	}
}