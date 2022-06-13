import React from 'react';
import axios from 'axios';

const AddComments = () => {
  const data = {
    postId: 1,
    body: 'Maiores sed dolores similique labore et inventore et quasi temporibus esse sunt id et eos voluptatem aliquam aliquid ratione corporis molestiae mollitia quia et magnam dolor',
  };
  const setData = () => {
    axios
      .post('https://bloggy-api.herokuapp.com/comments', data)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={setData}>add comm</button>
    </div>
  );
};

export default AddComments;
