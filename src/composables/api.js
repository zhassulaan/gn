import axios from 'axios';

const fetchData = async () => {
  try {
    const { data } = await axios.get('https://openlibrary.org/search.json?q=the+lord+of+the+rings');
    return data.docs;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    return null;
  }
};

export { fetchData };