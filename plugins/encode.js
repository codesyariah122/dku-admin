/**
 *
 * @param  props
 * @returns Inject
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */

import he from 'he'

const encodeString = (string) => {
    const encodestring = he.encode(string)
    return encodestring
}

export default ({app}, inject) => {
    inject('encode', encodeString)
}