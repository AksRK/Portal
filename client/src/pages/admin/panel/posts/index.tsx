import React, {FC, useEffect, useState} from 'react';
import Link from "next/link";
import {IPostData} from "@/core/types";
import PostService from "@/services/post.service";
import PostsTable from "@/components/Admin/Tables/Posts";
import {Alert} from "@/core/utils/alert.utils";

const AdminPosts:FC = () => {

	const [posts, setPosts] = useState<IPostData[] | []>([])

	useEffect(() => {
		getAllPost()
	}, [])
	const getAllPost = async () => {
		await PostService.getALl('', '', '', '99')
			.then((response) => {
				if (response.data) {
					setPosts(response.data.docs.flat())
				}
			}).catch((e) => {
				console.log(e)
			})
	}

	const removePost = async (id:string) => {
		await PostService.remove(id)
			.then((response) => {
				getAllPost()
				Alert({ msg: 'Пост удален', type: 'info' });
			})
			.catch((error) => {
				Alert({ msg: error.response?.data?.message, type: 'error' });
			})
	}

	return (
		<>
			<Link href={'posts/create'}>
				СОЗДАТЬ ПОСТ
			</Link>
			<PostsTable posts={posts} onDelete={removePost}/>
		</>
	);
};

export default AdminPosts;