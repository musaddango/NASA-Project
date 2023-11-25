import axios from 'axios';

const API_URL = 'http://localhost:8000/v1';

// Load planets and return.
async function httpGetPlanets() {
  try{
    const response = await axios(`${API_URL}/planets`);
    return await response.data;

  }catch(err){
    throw new Error(err.message);
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  try{
    const response = await axios(`${API_URL}/launches`);
    return await response.data.sort((a, b)=> {
      return a.flightNumber - b.flightNumber
    });
    
  }catch(err){
    throw new Error(err.message);
  }
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  return await fetch(`${API_URL}/launches`,{
    method: "post",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
    })
    .then((response)=>{
      console.log(response)
      return response;
    })
    .catch((err)=>{
      return false;
    })
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  return await fetch(`${API_URL}/launches/${id}`,{
      method: "delete",
    })
    .then((response)=> response)
    .catch((err)=> {
      return {ok: false}
    }) 
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};