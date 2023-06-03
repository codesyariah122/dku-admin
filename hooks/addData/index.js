/**
 *
 * @param  props
 * @returns A promise
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */
export const addData = async (props, data) => {
  try {
    const api_url = props.api_url
    const token = props.token
    const formData = new FormData();

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

    const result = !parsed.ok ? parsed : await parsed.json()
    return result

  } catch (error) {
    console.error('Error:', error);
  }
};
