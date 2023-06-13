/**
 *
 * @param  props
 * @returns Inject
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */

import he from 'he'

const decodeString = (string) => {
    const decodestring = he.decode(string)
    return decodestring
}

export default ({app}, inject) => {
    inject('decode', decodeString)
}