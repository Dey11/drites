import { Bookmark, Heart } from "lucide-react";

import { H2 } from "@/components/typography/h2";

const page = () => {
  return (
    <div className="mx-auto max-w-screen-lg px-3">
      <H2 className="py-5">Latest Posts</H2>

      {post.map(({ id, title, description, likes, author, createdAt }) => (
        <div key={id} className="mb-2">
          <PostCard
            id={id}
            title={title}
            description={description}
            likes={likes}
            author={author}
            createdAt={createdAt}
          />
        </div>
      ))}
    </div>
  );
};

export default page;

const post = [
  {
    id: 1,
    title: "Post 1",
    description: "This is the description for post 1",
    likes: 100,
    author: "Author 1",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    title: "Post 2",
    description: "This is the description for post 2",
    likes: 200,
    author: "Author 2",
    createdAt: "2023-10-02",
  },
  {
    id: 3,
    title: "Post 3",
    description: "This is the description for post 3",
    likes: 150,
    author: "Author 3",
    createdAt: "2023-10-03",
  },
  {
    id: 4,
    title: "Post 4",
    description: "This is the description for post 4",
    likes: 250,
    author: "Author 4",
    createdAt: "2023-10-04",
  },
  {
    id: 5,
    title: "Post 5",
    description: "This is the description for post 5",
    likes: 300,
    author: "Author 5",
    createdAt: "2023-10-05",
  },
];

type PostType = {
  id: number;
  title: string;
  description: string;
  likes: number;
  author: string;
  createdAt: string;
};

function PostCard({
  id,
  title,
  description,
  likes,
  author,
  createdAt,
}: PostType) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg p-5 shadow-md">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-slate-300">
          {author.charAt(0).toUpperCase()}
        </div>
        <div className="text-sm">
          <p className="font-medium">{author}</p>
          <p className="text-xs">{createdAt}</p>
        </div>
      </div>

      <h3 className="text-lg font-bold">{title}</h3>

      <p>{description}</p>

      <div className="flex items-center justify-between text-sm">
        <p className="flex items-center gap-1">
          <Heart className="size-4 cursor-pointer" />
          {likes}
        </p>

        <Bookmark className="size-4 cursor-pointer" />
      </div>
    </div>
  );
}
