import axios from 'axios';

export const fetchData = async () => {
  console.log('ioioioi');
  try {
    const response = await axios.get(
      'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json',
    );
    //console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    return error;
    //console.log(error);
  }
};
