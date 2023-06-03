/**
 *
 * @param  props
 * @returns Inject
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */

import feathericons from "feather-icons";

export default function (_, inject) {
  inject("feathericons", feathericons.icons);
}
