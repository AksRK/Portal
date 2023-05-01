import {toast} from "react-toastify";


interface AlertProps {
	msg: string
	type: 'error' | 'success' | 'info'
}

export const Alert = ({msg, type}:AlertProps) => {
	if (type === 'error') {
		return toast.error(msg, {
			position: "bottom-center",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	}else if (type === 'success') {
		toast.success(msg, {
			position: "bottom-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	}else  if (type === 'info') {
		toast.info(msg, {
			position: "bottom-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	}
}