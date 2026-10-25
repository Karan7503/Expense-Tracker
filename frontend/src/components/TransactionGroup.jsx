import { Plus } from 'lucide-react';

export default function TransactionGroup({ date, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-800/50 pb-2">
        <h3 className="text-lg font-bold text-white">{date}</h3>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white px-3 py-1.5 rounded-full border border-zinc-700 hover:border-zinc-500 transition-colors">
          <Plus size={14} />
          Add Expense
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}
