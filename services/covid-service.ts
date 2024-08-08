import axios from "axios";

export async function getCovidService() {
  return await axios.get("https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces");
}
