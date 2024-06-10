"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MyProfile from "@components/MyProfile";
const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const respone = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await respone.json();
      setPosts(data);
    };
    if (session?.user.id) fetchData();
  }, [session]);

  const handleEdit = (post) => {
    router.push("/update-prompt?id=" + post._id);
  };
  const deletePrompt = async (post) => {
    try {
      const res = await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });
      console.log(res);
      const filteredPost = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPost);
    } catch (err) {
      console.error("ERROR", err);
    }
  };
  const handleDelete = async (post) => {
    confirmAlert({
      title: "Xác nhận",
      message: "Bạn có chắc chắn muốn xóa bài viết này không?",
      buttons: [
        {
          label: "Có",
          onClick: () => deletePrompt(post),
        },
        {
          label: "Không",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <MyProfile
      name="My"
      desc="Chào mừng đến với trang cá nhân của bạn"
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default Profile;
