export interface IAlertProps {
	msg: string | [string];
	type: 'error' | 'success' | 'info';
}