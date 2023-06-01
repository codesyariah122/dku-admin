/**
 *
 * @param  props
 * @returns A promise
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 */
export const totalTrash = async (props) => {
  try {
    const api_url = props.api_url
    const token = props.token
    const query = props.query
    const parsed = await fetch(`${api_url}/fitur/trashed?type=${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Dku-Api-Key': props.api_key
      }
    })
    const result = await parsed.json()
    return result
  } catch (err) {
    console.error(err)
  }
};
