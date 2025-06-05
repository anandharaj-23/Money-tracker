import {useState,useEffect} from "react";
import './App.css';

function App() {

  const [name,setName] = useState('');
  const [datetime,setDatetime]=useState('');
  const [description,setDescription]=useState('');
  const [transactions,setTransactions]=useState('');

  useEffect(() => {
    getTransactions().then(setTransactions);
  },[]);

  async function getTransactions()
  {
    const url=process.env.REACT_APP_API_URL + '/transactions';

    const response =await fetch(url);
    const json = await response.json();
    return json;
  }


  function addNewTransaction(ev)
  {
    ev.preventDefault();

    const url=process.env.REACT_APP_API_URL + '/transaction';
   const parts = name.trim().split(' ');
    const price=parts[0];



    //console.log(url);

    fetch(url, {
      method:'POST',
      headers:{'Content-type' :'application/json'},
      body: JSON.stringify({
        name:name.substring(price.length+1),
        price,
        description,
        datetime,
      }),
    })
    .then(async response => {

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const text = await response.text(); 
      const data = text ? JSON.parse(text) : {}; 

      console.log('result', data);

      setName('');
      setDescription('');
      setDatetime('');

      })
      
      .catch(error => {
      console.error('Error:', error);
    });
  }

  let balance=0;

  for (const transaction of transactions)
  {
    balance+=transaction.price;
  }

  balance=balance.toFixed(2);
  const fraction=balance.split('.')[1];

  return (
    <main>
      <h1>₹{balance.split('.')[0]}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>

      <div className="basic">
        <input type="text" 
        value={name} 
        onChange={ev => setName(ev.target.value)}
        placeholder="+200 New Samsung TV"/>

        <input type="datetime-local"
        value={datetime}
        onChange={ev => setDatetime(ev.target.value)}

        />
      </div>
      

      <div className="description"><input type="text" 
      value={description}
      onChange={ev => setDescription(ev.target.value)}
      placeholder={"Description"}/></div>

      <button type="submit">Add New Transaction</button>

      
    </form>

    <div className="transactions">

      {transactions.length > 0 && transactions.map(transaction => (

        <div className="transaction">
        <div className="left">
          <div className="name">{transaction.name}</div>
          <div className="description">{transaction.description}</div>
        </div>

        <div className="right">
          <div className={"price " + (transaction.price<0 ? 'red' :'green')}>{transaction.price}</div>
         <div className="datetime">{transaction.datetime.replace(/\.\d{3}Z$/, '').replace('T', ' ')}</div>
        </div>
      </div>

      ))}
      

      
    </div>
    </main>

    
  );
}

export default App;
