import React, { useState, useEffect } from 'react';

function Card() {
  const api_key = 'WgKPCwpqECwdEIDWOKxebShJVsn3o2mURlsHkU3L';
  const start_Date = '2023-09-01';
  const end_Date = '2023-10-16';
  const [nasa_data, setNasaData] = useState([]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]); // Initialize with an empty array
  const [banList, setBanList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=${start_Date}&end_date=${end_Date}`
        );
        const data = await response.json();
        console.log(data)
        setNasaData(data);
        setData(data[0]); // Set data to the first element in the array
        setHistory([]); // Initialize history with the first element
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  function handleShuffle() {
    const max = nasa_data.length - 1;
    const min = 0;
    const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
    setIndex(randomIndex);
    const shuffledData = nasa_data[randomIndex];
    if (banList.includes(shuffledData.title) || banList.includes(shuffledData.date)) {
      // If it's in the ban list, skip and shuffle again
      handleShuffle();
      return;
    }
    setData(shuffledData);
    setHistory([...history, shuffledData]);
  }

  function handleBan(item){
    setBanList([...banList, item]);
  }

  function handleUnban(item) {
    const updatedBanList = banList.filter((bannedItem) => bannedItem !== item);
    setBanList(updatedBanList);
  }

  return (
    <div className="card-container">
      <div className="main-content">
        {data && (
          <div>
            <h2>{data.title}</h2>
            <button className="title_button" onClick={() => handleBan(data.title)}>{data.title}</button>
            <button className="date_button" onClick={() => handleBan(data.date)}>{data.date}</button>
            <img src={data.url} alt={data.title} className="nasa-images" />
          </div>
        )}

        <div>
          <button onClick={handleShuffle}>Shuffle</button>
        </div>
      </div>

      <div className="history-data">
        {history.length > 0 && (
          <div>
            <h3>History:</h3>
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  <h4>{item.title}</h4>
                  <img src={item.url} alt={item.title} className="history-images" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="ban-list">
        <h3>Ban List:</h3>
        <ul>
          {banList.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleUnban(item)}>Unban</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Card;
