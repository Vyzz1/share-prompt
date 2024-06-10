"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { toast, Bounce } from "react-toastify";
const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const respone = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (respone.ok) {
        toast("✔️ Created prompt successfully", {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Create"
        post={post}
        hanldeSubmit={createPrompt}
        submitting={submitting}
        setPost={setPost}
      />
      {/* <button
        className="black_btn"
        onClick={() =>
          toast("✔️ Created prompt successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
        }
      >
        {" "}
        Hit{" "}
      </button> */}
    </div>
  );
};

export default CreatePrompt;
