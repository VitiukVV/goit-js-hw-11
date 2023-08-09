import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';

export async function searchPhotoApi(searchTerm, shownPage) {
  const options = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    params: {
      key: '38656766-61e002171b8446ae895d82614',
      q: `${searchTerm}`,
      image_type: 'photo',
      orientatio: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: `${shownPage}`,
    },
  };
  const response = await axios.get(BASE_URL, options);
  return response.data;
}
