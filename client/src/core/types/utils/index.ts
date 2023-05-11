export interface AlertProps {
	msg: string | [string]
	type: 'error' | 'success' | 'info'
}