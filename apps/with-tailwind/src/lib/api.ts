import { Axios } from "axios";
import { useQuery } from "react-query";

const axios = new Axios();
const fetchTodos = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return res.data;
};

const useTodos = (id: string) => {
  const { data, ...rest } = useQuery(["todos", id], () => fetchTodos());
  return { data, ...rest };
};
