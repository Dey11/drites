import { H2 } from "@/components/typography/h2";

const page = () => {
  return (
    <div className="mx-auto max-w-screen-lg">
      <H2 className="pt-5">Latest Posts</H2>
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
  return <div></div>;
}
