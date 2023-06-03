/**
 *
 * @param  props
 * @returns A promise
 * @author Puji Ermanto <puuji.ermanto@gmail.com>
 */
export const addData = async (props) => {
  try {
    const api_url = props.api_url
    const token = props.token
    const data = JSON.stringify(props.data)
    const formData = new FormData();
    console.log(props.api_key)
    
    const parsed = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
        'Dku-Api-Key': props.api_key
      },
      body: data
    })
    if (!parsed.ok) {
      const errorCode = parsed.status
      const error = await parsed.json();
      return {
        code: errorCode,
        data: error
      };
      throw new Error('Request failed with status ' + parsed.status);
    }
    const result = await parsed.json()
    return result
  } catch (error) {
    console.error('Error:', error);
  }
};
