import AuthStore from "@/store/auth.store";
import {PostStore} from "@/store/post.store";
import {CreatorStore} from "@/store/creator.store";
import {CategoriesStore} from "@/store/categories.store";
import {configure} from "mobx";

configure({

});
class Store {
	authStore: AuthStore;
	categoriesStore: CategoriesStore;
	postStore: PostStore;
	creatorStore: CreatorStore;
	constructor() {
		this.authStore = new AuthStore();
		this.postStore = new PostStore();
		this.creatorStore = new CreatorStore();
		this.categoriesStore = new CategoriesStore();
	}
}
const store = new Store();
export default store;