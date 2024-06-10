"use client";
import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center"> Khám phá và tạo promp AI </h1>
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center text-lg">
        {" "}
        AI Power Prompt{" "}
      </span>
      <p className="desc text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
        corrupti eius molestias doloribus sequi consequuntur inventore
        voluptatem hic aspernatur officia dolor praesentium aut rerum
        dignissimos, qui obcaecati quae dolorem velit.
      </p>
      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
