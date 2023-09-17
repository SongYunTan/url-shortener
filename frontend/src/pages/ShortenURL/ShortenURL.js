import React, { useState } from 'react';
import URLTable from '../../components/URLTable';
import URLForm from '../../components/URLForm';
import './ShortenURL.css';

const ShortenURL = () => {
  const [data, setData] = useState([]);

  return (
    <div className="shortenURL">
      <URLForm data={data} setData={setData} />
      <URLTable data={data} setData={setData} />
    </div>
  );
};

export default ShortenURL;
