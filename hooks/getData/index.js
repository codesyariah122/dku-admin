/**
 *
 * @param  props
 * @returns A promise
 * @author Puji Ermanto <puji.ermanto@gmail.com>
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
        'Authorization': 'Bearer ' + token,
        'Dku-Api-Key': props.api_key
      }
    });
    if (!parsed.ok) {
      throw new Error("Data not found!");
    }
    
    const result = await parsed.json();
    return result;

  } catch (err) {
    console.log(err)
  }
};
