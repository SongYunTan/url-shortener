import React, { useEffect } from 'react';
import { Table } from 'antd';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import axios from 'axios';

const columns = [
  {
    title: 'Original URL',
    dataIndex: 'originalURL',
    key: 'originalURL',
  },
  {
    title: 'Baby URL',
    dataIndex: 'babyURL',
    key: 'babyURL',
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
  },
];

const URLTable = ({ data, setData }) => {
  useEffect(() => {
    const userID = sessionStorage.getItem('id');
    console.log(userID);
    if (userID !== null) {
      getSavedURLs(userID);
    }
  }, []);

  const getSavedURLs = async (userID) => {
    const host = window.location.host + '/';
    try {
      await axios
        .get('https://git.heroku.com/baby-url-backend.git/saved-urls', {
          params: { userID },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response) => {
          console.log(JSON.stringify(response.data, null, 4));
          setData(
            response.data['urls'].map((url) => {
              const link = 'http://' + host + url['shortenedURL'];
              return {
                key: url['id'],
                originalURL: url['originalURL'],
                babyURL: <a href={link}>{link}</a>,
                delete: (
                  <DeleteIcon
                    urlID={url['id']}
                    key={data}
                    data={data}
                    setData={setData}
                  />
                ),
              };
            })
          );
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{
        pageSize: 5,
      }}
      bordered
    />
  );
};

export default URLTable;
