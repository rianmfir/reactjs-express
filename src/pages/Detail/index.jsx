import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './index.scss';
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v2/product/${id}`)
      .then(result => {
        let data = result.data.data;
        console.log(data);

        setName(data.name);
        setPrice(`Rp. ${data.price.toLocaleString("id-ID")}`);
        setStock(data.stock);
        setImage(`http://localhost:5000/public/${data.image_url}`);
      })
      .catch(err => console.log(err));
  }, [id])

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {stock}</td>
          </tr>
          <tr>
            <td colSpan="2">
              <img className="imageDetail " src={image} alt=" " />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;