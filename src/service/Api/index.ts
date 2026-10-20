import axios from "axios";
const url = "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m"

export const ambilApi = async () => {
    const response = await axios.get(url)
    return response.data
}