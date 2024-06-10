"use client";
import { useState, useEffect, useCallback } from "react";
import PrompCard from "./PrompCard";
import debounce from "lodash.debounce";
const PrompCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout ">
      {Array.isArray(data) &&
        data.map((v) => (
          <PrompCard
            key={v._id}
            handleTagClick={() => handleTagClick(v.tag)}
            post={v}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [prePost, setprePost] = useState(posts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/prompt", { cache: "no-store" });
        const data = await response.json();
        setPosts(data);
        setprePost(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };
    fetchData();
  }, []);

  const [searchText, setSearchText] = useState("");
  const filterPost = useCallback(
    debounce((keySearch) => {
      if (keySearch.length >= 2) {
        const filteredPosts = prePost.filter(
          (post) =>
            post.prompt.toLowerCase().includes(keySearch.toLowerCase()) ||
            post.tag.toLowerCase().includes(keySearch.toLowerCase()) ||
            post.creator.username
              .toLowerCase()
              .includes(keySearch.toLowerCase())
        );
        setPosts(filteredPosts);
      } else {
        setPosts(prePost);
      }
    }, 300),
    [prePost]
  );

  useEffect(() => {
    filterPost(searchText);
  }, [searchText, filterPost]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };
  console.log(posts);
  return (
    <section className="feed ">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Nhập để tìm kiếm"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer
        "
        />
      </form>
      <PrompCardList handleTagClick={handleTagClick} data={posts} />
    </section>
  );
};

export default Feed;
