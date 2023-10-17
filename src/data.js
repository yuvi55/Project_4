
let api_key = "WgKPCwpqECwdEIDWOKxebShJVsn3o2mURlsHkU3L"
let nasa_data = ""
let start_Date ="2023-09-01" ; 
let end_Date = "2023-10-16" ; 

async function fetch_data(){
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=${start_Date}&end_date=${end_Date}`) ; 
    nasa_data = await response.json() ;
}

export default nasa_data ; 

