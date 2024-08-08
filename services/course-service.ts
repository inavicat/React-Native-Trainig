import axios from "axios";

export async function getCourseService() {
  return await axios.get("https://api.codingthailand.com/api/course");
}
