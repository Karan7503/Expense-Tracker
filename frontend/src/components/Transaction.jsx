import { Plus } from 'lucide-react';

export function TransactionGroup({ date, children, onAddExpense }) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between mb-4 border-b border-zinc-800/50 pb-2">
        <h3 className="text-base sm:text-lg font-bold text-white">{date}</h3>
        <button 
          onClick={onAddExpense}
          className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-zinc-300 hover:text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-zinc-700 hover:border-zinc-500 transition-colors"
        >
          <Plus size={12} className="sm:w-[14px] sm:h-[14px]" />
          Add Expense
        </button>
      </div>
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {children}
      </div>
    </div>
  );
}

export function TransactionItem({ icon: Icon, title, category, amount, isIncome }) {
  return (
    <div className="flex items-center justify-between p-3.5 sm:p-4 bg-surface rounded-xl border border-zinc-800/80 hover:border-zinc-600 transition-colors group">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-zinc-900/80 ${isIncome ? 'text-primary' : 'text-danger'}`}>
          <Icon size={20} className="sm:w-[24px] sm:h-[24px]" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm sm:text-base text-zinc-100 font-bold truncate">{title}</h4>
          <span className="inline-block bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mt-1 truncate max-w-full">
            {category}
          </span>
        </div>
      </div>
      <div className={`shrink-0 text-base sm:text-lg font-bold ml-2 ${isIncome ? 'text-primary' : 'text-danger'}`}>
        {isIncome ? '+' : '-'}{amount}
      </div>
    </div>
  );
}
