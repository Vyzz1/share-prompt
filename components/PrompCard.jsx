"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PrompCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [copy, setCopy] = useState("");
  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000);
  };
  const handleVistProfile = (creator) => {
    let { username, _id } = creator;
    router.push(`/profile/${_id}?username=${username}`);
  };
  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-between gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={() => handleVistProfile(post.creator)}
        >
          <Image
            width={40}
            height={40}
            className="rounded-full object-contain"
            alt="user_image"
            src={post.creator.image}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {" "}
              {post.creator.username}{" "}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {" "}
              {post.creator.email}{" "}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy button"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700"> {post.prompt}</p>
      <p
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <>
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 ">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm red_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PrompCard;
