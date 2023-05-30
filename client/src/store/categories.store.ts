import {makeAutoObservable, runInAction} from "mobx";
import {ICategoryBlogData} from "@/core/types";
export class CategoriesStore {
	categories: ICategoryBlogData[] = [];
	constructor() {
		makeAutoObservable(this);
	}
	saveCategories(categories: ICategoryBlogData[]): void {
		runInAction(() => {
			this.categories = categories;
		})
	}
}