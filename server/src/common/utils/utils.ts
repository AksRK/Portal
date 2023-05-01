import { transliterate as tr } from 'transliteration';

export class Utils {

	static transliterateText(text:string):string {
		return tr(text.trim().toLowerCase(), {replace: [[' ', '-'], ['⠀', '']]})
	}

}