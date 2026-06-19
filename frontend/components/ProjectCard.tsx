import { MouseEventHandler } from "react";

interface ProjectCardProps {
  name: string;
  description?: string | null;
  createdAt?: string | null;
  onOpen: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export function ProjectCard({
  name,
  description,
  createdAt,
  onOpen,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-0.5 hover:border-blue-500/50">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{name}</p>
          <p className="mt-2 text-sm text-slate-400">{description || "No description provided."}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <span>{createdAt ? `Created ${createdAt}` : "Created date unavailable"}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onOpen}
              className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Open
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
