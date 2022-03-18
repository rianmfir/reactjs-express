import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { Loading } from '../../components';

const Home = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dataSearch, setDataSearch] = useState('');

  const imageURL = 'http://localhost:5000/public/';

  let response;
  let load;
  let message;

  const getAPI = () => {
    axios
      .get('http://localhost:5000/api/v2/product')
      .then(result => {
        console.log(result.data);
        setData(result.data)

        setTimeout(() => {
          setLoading(false);
        }, 800);
      })

      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAPI();

  }, [search]);

  useEffect(() => {
    setLoading(true);
    setDataSearch(
      data.filter(
        e => e.name.toLowerCase().includes(search.toLowerCase())
      )
    )

  }, [setDataSearch, data, search])

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }

  const handleDelete = async (id) => {

    if (window.confirm("Apakah Data Ingin Dihapus ?")) {
      await axios.delete(`http://localhost:5000/api/v2/product/${id}`)
        .then((res) => {
          console.log("Ini hasilnya ", res.data);
        })
        .catch(err => {
          console.log("Kenapa Error", err);
        })
      getAPI();
    }
  }

  if (loading) {
    load = <Loading loadStyle="position" />
  } else {
    if (dataSearch.length < 1) {
      message = <h1 className='position'>Data Tidak Ditemukan</h1>;
    } else {
      response = (
        dataSearch.map((val, key) => (
          <tr key={key} className="rowAction">
            <td>{val._id}</td>
            <td>{val.name}</td>
            <td className="text-center">{`Rp. ${val.price.toLocaleString("id-ID")}`}</td>
            <td className="text-center">{val.stock}</td>
            <td className="text-center">
              <img className='imageView' src={imageURL + val.image_url} alt=" " />
            </td>
            <td className="text-center">
              <Link to={`/detail/${val._id}`} className="btn btn-sm btn-info">Detail</Link>
              <Link to={`/edit/${val._id}`} className="btn btn-sm btn-warning">Edit</Link>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(val._id)}>Delete</button>
            </td>
          </tr>
        ))
      );
    }
  }


  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci..."
          onChange={handleSearch}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Image</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {response}
        </tbody>
      </table>
      {load}
      {message}
    </div>
  )
}

export default Home;