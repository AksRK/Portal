import React, {FC, useState} from 'react';
import Editor from "@/components/Editor";

const AdminPosts:FC = () => {
	const [editorState, setEditorState] = useState<string>('')

	return (
		<>
			<Editor initialContent={editorState} onChange={(data) => setEditorState(data)}/>
		</>
	);
};

export default AdminPosts;