import {sha256} from 'js-sha256';

export class TokenGenerator {

	static gen(id: number): string {
		return sha256(id + Date.now().toString());
	}
}