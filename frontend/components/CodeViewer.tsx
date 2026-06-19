interface CodeViewerProps {
  filename: string;
  content: string;
}

const getLines = (text: string) => text.split("\n");

export function CodeViewer({ filename, content }: CodeViewerProps) {
  const lines = getLines(content);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-white">{filename}</p>
          <p className="text-sm text-slate-400">Read-only source preview</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0f172a] text-sm leading-6">
        <div className="grid min-w-full grid-cols-[48px_minmax(0,1fr)]">
          <div className="border-r border-slate-800 bg-slate-950 text-right text-slate-500"> 
            {lines.map((_, index) => (
              <div key={index} className="px-3 py-1 text-xs leading-5 text-slate-500">
                {index + 1}
              </div>
            ))}
          </div>
          <div className="px-4 py-3 font-mono text-slate-100">
            {lines.map((line, index) => (
              <div key={index} className="whitespace-pre text-[0.92rem] leading-5 text-slate-100">
                {line || "\u00a0"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
