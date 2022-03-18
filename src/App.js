import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

const URL = 'http://localhost/shoppinglist/';

function App() {

  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({ description: item, amount: amount });
    axios.post(URL + 'Add.php', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setItems(items => [...items, response.data]);
        setItem('');
        setAmount('');
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      });
  }

  function remove(id) {
    const json = JSON.stringify({ id: id });
    axios.post(URL + 'delete.php', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const newListWithoutRemoved = items.filter((item) => item.id !== id);
        setItems(newListWithoutRemoved);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error)
      });
  }


  return (
    <div className='container'>
      <h3>Shopping list</h3>
      <form id='formi' onSubmit={save}>
        <label>New item </label>
        <input value={item} placeholder='type description' onChange={e => setItem(e.target.value)} />
        <input type='number' value={amount} placeholder='type amount' onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {items?.map(item => (
          <a class='item' key={item.id}>
            {item.id && item.description}&nbsp;
            <a class='amount' key={item.id}>
              {item.id && item.amount}&nbsp; </a>

            <a href='#' className='delete' onClick={() => remove(item.id)}>Delete
            </a>
            <br></br>
          </a>

        ))}
      </ul>
    </div>

  );
}

export default App;
