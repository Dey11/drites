import { H3 } from "../typography/h3";

type PostProps = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export default function Post({ id, title, description, createdAt }: PostProps) {
  let date = createdAt.toDateString();

  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg bg-brand-section p-4">
      <H3 className="line-clamp-1">{title}</H3>
      <p className="line-clamp-2 text-slate-700">
        {description.slice(0, 100) + (description.length > 100 ? "..." : "")}
      </p>
      <span className="text-xs font-medium text-slate-600">{date}</span>
    </div>
  );
}
