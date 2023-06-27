/**
 *
 * @param  props
 * @returns A promise
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 */
export const acceptDonation = async (props) => {
  try {
    const api_url = props.api_url
    const token = props.token
    const data = props.data ? JSON.stringify({status: props.data}) : null
    const parsed = await fetch(api_url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Dku-Api-Key': props.api_key
      },
      body: data
    })
    if (!parsed.ok) {
      throw new Error("Data not found!");
    }
    const result = await parsed.json();
    return result;
  } catch (err) {
    console.error(err)
  }
};
