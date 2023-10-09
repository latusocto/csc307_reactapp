// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]); 

  function removeOneCharacter(index) {
    const id = characters[index].id;
    axios.delete(`http://localhost:8000/users/${id}`)
    .then(res => {
      if (res.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        })
        setCharacters(updated);
      }
    })
      .catch(error => {
        console.error(error);
      });
  }

  function updateList(person) { 
    makePostCall(person).then( res => {
    if (res && res.status === 201) {
      const newPerson = res.data;
      setCharacters([...characters, newPerson] );
    }
    });
 }

  async function fetchAll(){
    try {
        const response = await axios.get('http://localhost:8000/users');
        return response.data.users_list;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
        if (result)
          setCharacters(result);
      });
  }, [] );

  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
 }

  return (
      <div className="container">
      <Table characterData={characters} 
          removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
      </div>
  );
}

export default MyApp;