
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Upload } from '../../components';

import './index.scss';


const Tambah = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('status', status);
    formData.append('image', image);

    axios.post("http://localhost:5000/api/v2/product", formData,
      {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res)
        if (window.confirm("Data Berhasil Ditambahkan")) {
          history.push('/');
        }
      })
      .catch(err => console.log(err))

  }

  const handleStatus = (value) => {
    return !value;
  }

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form method='post' onSubmit={handleSubmit}>

          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            required
            onChange={e => setName(e.target.value)}
          />

          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            required
            onChange={e => setPrice(e.target.value)}
          />

          <Input
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            required
            onChange={e => setStock(e.target.value)}
          />

          <Upload
            view="preview"
            img={imagePreview}
            onChange={e => onImageUpload(e)}
          />

          <Input
            name="status"
            type="checkbox"
            label="Active"
            checked={status}
            onChange={() => setStatus(handleStatus)}
          />

          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;