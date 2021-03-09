import pagesData from './pagesData'

const axios =  {
  index: 0,
  get: jest.fn().mockImplementation((url) => {
    if (axios.index === 10){
      axios.index = 0
    }
    return Promise.resolve({ data: pagesData[axios.index++] });
  }),
};

export default axios
