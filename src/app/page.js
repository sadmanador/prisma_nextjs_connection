"use client"; 

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      {JSON.stringify(users)}
    </div>
  );
}
