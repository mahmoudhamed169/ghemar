  "use client";

interface TermCardProps {
  title: string;
  content: string;
  onChange: (value: string) => void;
}

export default function TermCard({ title, content, onChange }: TermCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-gray-800 text-right">
        {title}
      </h3>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        className="w-full px-4 py-3 rounded-xl bg-[#0000000A] border border-gray-100  text-right text-sm text-gray-600 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-[#0C6175] transition"
      />
    </div>
  );
}