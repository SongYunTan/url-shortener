import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OriginalURL.css';

const OriginalURL = () => {
  const { shortenedURL } = useParams();
  const [err, setErr] = useState('');
  const host = window.location.host + '/';

  useEffect(() => {
    console.log(shortenedURL);
    if (shortenedURL !== null) {
      getOriginalURL();
    }
  }, []);

  const getOriginalURL = async () => {
    try {
      await axios
        .get('http://127.0.0.1:5000/original-url', {
          params: { shortenedURL },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response) => {
          console.log(JSON.stringify(response.data, null, 4));
          window.location.assign('http://' + response.data['originalURL']);
        });
    } catch (err) {
      console.log(err);
      setErr(err);
    }
  };

  return (
    <div className="originalURL">
      <img src="/logo-black.png" className="originalURL-logo" />
      {err !== '' && (
        <h2>
          {host + shortenedURL} is not a valid Baby URL.
          <br></br>
          Proceed <a href="/">here</a> to generate your Baby URL now!
        </h2>
      )}
    </div>
  );
};

export default OriginalURL;
