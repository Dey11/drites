export default function Avatar({ name }: { name: string }) {
  return (
    <div className="mt-1 flex size-8 items-center justify-center rounded-full bg-slate-200">
      {name[0].toUpperCase()}
    </div>
  );
}
