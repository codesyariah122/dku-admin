/**
 *
 * @param  props
 * @returns Inject
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */


import he from 'he'

const decodeString = (string) => {
	const decodedString = he.decode(string);
	return decodedString;
};

export default ({ app }, inject) => {
	inject("decode", decodeString);
};