import React from 'react'
import './App.css';
import axios from 'axios';
import Tablerow from './components/Tablerow';
import { useState } from 'react';
import { useEffect } from 'react';
import InfoWrapper from './components/InfoWrapper';

const App = () => {

  const [userData, setUserData] = useState([])
  const [searchquery, setSearchQuery] = useState('')
  const [filterUserData, setFilterUserData] = useState([])
  const [selectedUser, setUser] = useState(null)

  const fetchData = async () => {
    let response = await axios(`http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`);
    let apiData = await response.data;
    setUserData(apiData);
  }

  useEffect(() => (
    fetchData()
    ), [])

  const getFilterTable = (e) => {
    let filteredData = userData.filter(user => user.firstName.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchQuery(e.target.value)
    setFilterUserData(filteredData)
  }

  return (
    <>
      <main>

        <div id="table-section">

          <form action="/">
            <input type="text" src="img/search-icon.svg" placeholder="Enter something" name="search-box" id="search-box"
              onChange={(e) => getFilterTable(e)} value={searchquery} />
          </form>

          <div id="table-wrapper">
            <div id="table-headers">
              <table>
                <thead>
                  <tr>
                    <th className="column1">Id</th>
                    <th className="column2">FirstName</th>
                    <th className="column3">LastName</th>
                    <th className="column4">Email</th>
                    <th className="column5">Phone</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div id="table-data">
              <table>
                <tbody>
                  {

                    filterUserData.length === 0 && searchquery.length === 0 ?
                      userData.map((item, idx) => <Tablerow data={item} keyValue={item.firstName +''+ idx} selectedUser={selectedUser} setUser={setUser} />)
                      :
                      filterUserData.map((item, idx) => <Tablerow data={item} keyValue={item.firstName +''+ idx} selectedUser={selectedUser} setUser={setUser} />)

                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {selectedUser && <InfoWrapper selectedUser={selectedUser} />}


      </main>
    </>
  )
}

export default App;
