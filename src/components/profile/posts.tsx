import Post from "./post-card";

type ProfilePostSectionProps = {
  posts: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
  }[];
};

export default function ProfilePostSection({ posts }: ProfilePostSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div key={post.id}>
          <Post {...post} />
        </div>
      ))}
    </div>
  );
}
