import React, { useState } from 'react';
import URLTable from '../../components/URLTable/URLTable';
import URLForm from '../../components/URLForm/URLForm';
import NavBar from '../../components/NavBar/NavBar';
import './ShortenURL.css';

const ShortenURL = () => {
  const [data, setData] = useState([]);

  return (
    <div className="shortenURL">
      <NavBar />
      <div className="shortenURL-container">
        <URLForm data={data} setData={setData} />
        <URLTable key={data} data={data} setData={setData} />
      </div>
    </div>
  );
};

export default ShortenURL;
