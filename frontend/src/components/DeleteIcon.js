import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const DeleteIcon = ({ urlID, data, setData }) => {
  const handleDeleteURL = async () => {
    console.log(urlID);
    try {
      await axios
        .post(
          'http://127.0.0.1:5000/delete-url',
          { urlID },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          console.log(JSON.stringify(response.data, null, 4));
          setData(data.filter((url) => url.key !== urlID));
        });
    } catch (err) {
      console.log(err);
    }
  };
  return <DeleteOutlined onClick={handleDeleteURL} />;
};

export default DeleteIcon;
