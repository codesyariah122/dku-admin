/**
 *
 * @param  props
 * @returns A promise
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 */
export const getData = async (props) => {
  try {
    const api_url = props.api_url
    const token = props.token
    const parsed = await fetch(api_url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    const result = await parsed.json()
    return result
  } catch (err) {
    console.error(err)
  }
};
