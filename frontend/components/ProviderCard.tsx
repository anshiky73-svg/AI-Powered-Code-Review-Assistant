import { MouseEventHandler } from "react";

interface ProviderCardProps {
  name: string;
  model: string;
  apiKeyStatus: string;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export function ProviderCard({ name, model, apiKeyStatus, onDelete }: ProviderCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-white">{name}</p>
          <p className="mt-2 text-sm text-slate-400">{model}</p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-2xl border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-red-500 hover:text-white"
        >
          Delete
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>API Key</span>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-300">
          {apiKeyStatus}
        </span>
      </div>
    </div>
  );
}
