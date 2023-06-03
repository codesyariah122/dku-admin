/**
 *
 * @param  props
 * @returns A promise
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */
export const totalTrash = async (props) => {
  try {
    const api_url = props.api_url
    const token = props.token
    const parsed = await fetch(api_url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Dku-Api-Key': props.api_key
      }
    })
    const result = !parsed.ok ? parsed : await parsed.json()
    return result
  } catch (err) {
    console.error(err)
  }
};
