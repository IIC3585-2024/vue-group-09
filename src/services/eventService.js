// src/services/eventService.ts
import axios from 'axios';

export async function getEvents() {
  const response = await axios.get(`${import.meta.env.VITE_PREDICT_URL_BASE}events?country=CL`, {
    headers: {
      "Accept": "application/json",
      "Authorization": import.meta.env.VITE_PREDICT_ACCESS_TOKEN
    }
  });
  return response.data.results;
}