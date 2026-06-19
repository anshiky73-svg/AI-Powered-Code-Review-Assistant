"use client";

interface FileTreeProps {
  tree: Record<string, any>;
  selectedFileId?: string;
  onSelectFile: (fileId: string) => void;
}

function renderTree(nodes: Record<string, any>, onSelectFile: (fileId: string) => void, prefix = "") {
  return Object.entries(nodes).map(([key, value]) => {
    if (value?.type === "file") {
      return (
        <li
          key={`${prefix}${key}`}
          className="cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          onClick={() => onSelectFile(value.id)}
        >
          <span className="font-medium">{key}</span>
        </li>
      );
    }

    return (
      <li
        key={`${prefix}${key}`}
        className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950 p-3"
      >
        <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{key}</div>
        <ul className="space-y-1 pl-4">{renderTree(value, onSelectFile, `${prefix}${key}/`)}</ul>
      </li>
    );
  });
}

export function FileTree({ tree, onSelectFile }: FileTreeProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">File Explorer</div>
      <ul className="space-y-2">{renderTree(tree, onSelectFile)}</ul>
    </div>
  );
}
