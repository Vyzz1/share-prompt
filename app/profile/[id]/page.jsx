"use client";
import MyProfile from "@components/MyProfile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setData(data);
    };
    if (params.id) fetchData();
  }, [params.id]);

  return (
    <>
      <MyProfile
        name={username}
        desc={`All the prompts created by ${username}`}
        data={data}
      />
    </>
  );
};

export default UserProfile;
