export default function TransactionItem({ icon: Icon, title, category, amount, isIncome }) {
  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-zinc-800/80 hover:border-zinc-600 transition-colors group">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-zinc-900/80 ${isIncome ? 'text-primary' : 'text-danger'}`}>
          <Icon size={24} />
        </div>
        <div>
          <h4 className="text-zinc-100 font-medium">{title}</h4>
          <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mt-1">
            {category}
          </p>
        </div>
      </div>
      <div className={`text-lg font-bold ${isIncome ? 'text-primary' : 'text-danger'}`}>
        {isIncome ? '+' : '-'}{amount}
      </div>
    </div>
  );
}
