import { makeAutoObservable } from "mobx";

export interface Post {
	id: number;
	title: string;
	body: string;
}

export class PostStore {
	posts: Post[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	async loadPosts() {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts");
		const data = await response.json();
		this.posts = data;
	}

	addPost(post: Post) {
		this.posts.push(post);
	}
}