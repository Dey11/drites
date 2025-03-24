import Post from "./post-card";

type ProfilePostSectionProps = {
  posts: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
  }[];
  activeTab: "Posts" | "Likes" | "Bookmarks";
};

export default function ProfilePostSection({
  posts,
  activeTab,
}: ProfilePostSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div key={post.id}>
          <Post {...post} activeTab={activeTab} />
        </div>
      ))}
    </div>
  );
}
