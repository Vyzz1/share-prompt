import Link from "next/link";
const Form = ({ type, post, hanldeSubmit, submitting, setPost }) => {
  return (
    <>
      <section className="w-full max-w-full flex justify-start p-5 flex-col">
        <h1 className="head_text text-left">
          <span className="blue_gradient"> {type} Post</span>
        </h1>
        <p className="desc text-left max-w-md">
          {type} and share Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Voluptates doloribus ex, non similique omnis reiciendis optio,
        </p>
        <form
          onSubmit={hanldeSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Your AI Prompt
            </span>
            <textarea
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              placeholder="Write your prompt here"
              required
              className="form_textarea"
            ></textarea>
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag{``}
              <span className="font-normal">(#product,#idea,#accountant)</span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="#tag"
              required
              className="form_input"
            />
          </label>
          <div className="flex-end mx-3 gap-4 mb-5">
            <Link href={"/"} className="text-gray-500 text-sm">
              Hủy
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
