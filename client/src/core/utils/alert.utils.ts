import {toast, ToastOptions} from "react-toastify";
import {AlertProps} from "@/core/types";

export const Alert = ({msg, type}:AlertProps) => {
	const toastSettings: ToastOptions = {
		position: "bottom-center",
		autoClose: 1500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	}
	const returnAlert = (text:string) => {

		switch (type) {
			case 'error':
				return toast.error(text, toastSettings);
			case 'success':
				return toast.success(text, toastSettings);
			case 'info':
				return toast.info(text, toastSettings);
			default:
				return;
		}
	}

	if (Array.isArray(msg)) {
		msg.forEach((text) => {
			returnAlert(text);
		});
	} else {
		returnAlert(msg);
	}
}