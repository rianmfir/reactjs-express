import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Input, Upload } from "../../components";

const Edit = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(' ');

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v2/product/${id}`)
      .then(result => {
        let data = result.data.data;
        console.log(data);

        setName(data.name);
        setPrice(data.price);
        setStock(data.stock);
        setStatus(data.status);
        if (data.image_url !== "") {
          setImagePreview(`http://localhost:5000/public/${data.image_url}`);
        }
      })
      .catch(err => console.log(err));
  }, [id])

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('status', status);
    formData.append('image', image);

    axios.put(`http://localhost:5000/api/v2/product/${id}`, formData,
      {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(() => {
        if (window.confirm("Data Berhasil Diupdate")) {
          history.push("/");
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
        <h2>Edit Produk</h2>
        <br />
        <form method="post" onSubmit={handleUpdate}>

          <Input
            required
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama" value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            required
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga" value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            required
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock" value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <Upload
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

export default Edit;