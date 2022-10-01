import { useState, useEffect } from "react";
import { User } from "./model";
export const getUsers = async () => {
  const data = await (
    await fetch("https://jsonplaceholder.typicode.com/users")
  ).json();
  return data;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    // setUsers();
    (async () => {
      const users = await getUsers();
      setUsers(users);
    })();
  }, [setUsers]);
  return users;
};
