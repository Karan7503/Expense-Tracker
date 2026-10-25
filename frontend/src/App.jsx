// // import { useState } from 'react';
// // import { Utensils, Car, Wallet, ShoppingBag, Zap, Plus } from 'lucide-react';
// // import Navbar from './components/Navbar';
// // import DailyLogHeader from './components/DailyLogHeader';
// // import { TransactionGroup, TransactionItem } from './components/Transaction';
// // import DailySummary from './components/DailySummary';
// // import EditSalaryModal from './components/EditSalaryModal';
// // import AddExpenseModal from './components/AddExpenseModal';

// // function App() {
// //   const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
// //   const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

// //   return (
// //     <div className="min-h-screen w-full overflow-x-hidden bg-background text-zinc-100 flex flex-col items-center selection:bg-primary/30">
// //       <div className="w-full max-w-[600px] px-4 sm:px-5 pb-20 md:pb-8 flex flex-col flex-1">
// //         <Navbar />
        
// //         <main className="flex-1 mt-2">
// //           <DailyLogHeader onAddSalary={() => setIsSalaryModalOpen(true)} />

// //           <TransactionGroup date="Today, Oct 24" onAddExpense={() => setIsExpenseModalOpen(true)}>
// //             <TransactionItem 
// //               icon={Utensils} 
// //               title="Artisanal Lunch" 
// //               category="Food & Dining • 12:45 PM" 
// //               amount="$24.50" 
// //               isIncome={false} 
// //             />
// //             <TransactionItem 
// //               icon={Car} 
// //               title="Uber Ride" 
// //               category="Transport • 09:15 AM" 
// //               amount="$18.20" 
// //               isIncome={false} 
// //             />
// //             <TransactionItem 
// //               icon={Wallet} 
// //               title="Freelance Payment" 
// //               category="Income • 08:00 AM" 
// //               amount="$450.00" 
// //               isIncome={true} 
// //             />
// //             <DailySummary total="$407.30" balance="$12,450.85" isPositive={true} />
// //           </TransactionGroup>

// //           <TransactionGroup date="Yesterday, Oct 23" onAddExpense={() => setIsExpenseModalOpen(true)}>
// //             <TransactionItem 
// //               icon={ShoppingBag} 
// //               title="Grocery Store" 
// //               category="Shopping • 06:30 PM" 
// //               amount="$84.12" 
// //               isIncome={false} 
// //             />
// //             <TransactionItem 
// //               icon={Zap} 
// //               title="Electric Bill" 
// //               category="Utilities • 10:00 AM" 
// //               amount="$112.00" 
// //               isIncome={false} 
// //             />
// //             <DailySummary total="$196.12" balance="$12,043.55" isPositive={false} />
// //           </TransactionGroup>
          
// //         </main>
        
// //         <footer className="mt-16 py-8 border-t border-zinc-800/60 text-center text-[11px] text-zinc-500 font-medium tracking-wide">
// //           <p className="text-primary/70 mb-3 font-bold text-sm tracking-wider">FinTrack</p>
// //           <p>© 2026 FinTrack Institutional. Secure & Encrypted.</p>
// //         </footer>
// //       </div>

// //       {/* Floating Action Button */}
// //       <button className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-primary text-zinc-900 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform z-50">
// //         <Plus size={24} strokeWidth={2.5} />
// //       </button>

// //       <EditSalaryModal 
// //         isOpen={isSalaryModalOpen} 
// //         onClose={() => setIsSalaryModalOpen(false)} 
// //       />

// //       <AddExpenseModal 
// //         isOpen={isExpenseModalOpen} 
// //         onClose={() => setIsExpenseModalOpen(false)} 
// //       />
// //     </div>
// //   );
// // }

// // export default App;



// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { Box, Fab, Container, Typography } from '@mui/material';
// import { Add, Utensils, Car, Wallet, ShoppingBag, Zap, Shapes, ReceiptText, HandHeart } from '@mui/icons-material';

// import Navbar from './components/Navbar';
// import DailyLogHeader from './components/DailyLogHeader';
// import { TransactionGroup, TransactionItem } from './components/Transaction';
// import DailySummary from './components/DailySummary';
// import EditSalaryModal from './components/EditSalaryModal';
// import AddExpenseModal from './components/AddExpenseModal';

// import { getSalary, getTransactions, saveTransactions } from './utils/storage';

// // ─── Helpers ──────────────────────────────────────────────

// const getDateLabel = (dateStr) => {
//   const today = new Date().toISOString().split('T')[0];
//   const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

//   if (dateStr === today) return 'Today';
//   if (dateStr === yesterday) return 'Yesterday';

//   const d = new Date(dateStr);
//   return d.toLocaleDateString('en-IN', {
//     weekday: 'short',
//     month: 'short',
//     day: 'numeric',
//   });
// };

// const groupTransactionsByDate = (transactions) => {
//   const groups = {};
//   transactions.forEach((tx) => {
//     const key = tx.date || tx.createdAt?.split('T')[0] || 'unknown';
//     if (!groups[key]) groups[key] = [];
//     groups[key].push(tx);
//   });
//   return Object.keys(groups)
//     .sort((a, b) => b.localeCompare(a))
//     .map((date) => ({ date, transactions: groups[date] }));
// };

// // ─── App ──────────────────────────────────────────────────

// function App() {
//   const [salary, setSalary] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
//   const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

//   // Load from localStorage
//   useEffect(() => {
//     const savedSalary = getSalary();
//     if (savedSalary) setSalary(savedSalary);
//     const savedTx = getTransactions();
//     if (savedTx.length > 0) setTransactions(savedTx);
//   }, []);

//   // Sync transactions to localStorage
//   useEffect(() => {
//     if (transactions.length > 0) {
//       saveTransactions(transactions);
//     }
//   }, [transactions]);

//   const handleSalaryUpdate = useCallback((newSalary) => setSalary(newSalary), []);
//   const handleTransactionAdd = useCallback((newTx) => setTransactions((prev) => [...prev, newTx]), []);
//   const handleFloatingAdd = useCallback(() => setIsExpenseModalOpen(true), []);

//   // Computed values
//   const grouped = useMemo(() => groupTransactionsByDate(transactions), [transactions]);
//   const runningBalance = useMemo(() => {
//     return transactions.reduce((acc, tx) => {
//       const amount = tx.type === 'income' ? tx.amount : -tx.amount;
//       return acc + amount;
//     }, 0);
//   }, [transactions]);

//   const dailyTotals = useMemo(() => {
//     const totals = {};
//     transactions.forEach((tx) => {
//       const key = tx.date || tx.createdAt?.split('T')[0] || 'unknown';
//       const amount = tx.type === 'income' ? tx.amount : -tx.amount;
//       totals[key] = (totals[key] || 0) + amount;
//     });
//     return totals;
//   }, [transactions]);

//   // Map category to icon
//   const getIcon = (category) => {
//     const map = {
//       food: Utensils,
//       transport: Car,
//       charity: HandHeart,
//       income: Wallet,
//       bill: ReceiptText,
//       misc: Shapes,
//       shopping: ShoppingBag,
//     };
//     for (const [key, icon] of Object.entries(map)) {
//       if (category?.toLowerCase().includes(key)) return icon;
//     }
//     return Utensils;
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
//       <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, py: 2, position: 'relative', minHeight: '100vh' }}>
//         <Navbar salary={salary} />

//         <Box component="main" sx={{ mt: 1, flex: 1 }}>
//           <DailyLogHeader onAddSalary={() => setIsSalaryModalOpen(true)} salary={salary} />

//           {grouped.length === 0 ? (
//             <Box sx={{ mt: 8, textAlign: 'center' }}>
//               <Typography color="text.secondary" variant="body2" fontWeight={500}>
//                 No transactions yet.
//                 <br />
//                 <Typography component="span" color="text.disabled" variant="caption">
//                   Tap the + button to add one.
//                 </Typography>
//               </Typography>
//             </Box>
//           ) : (
//             grouped.map((group) => {
//               const dayTotal = dailyTotals[group.date] || 0;
//               let cumBalance = 0;
//               let found = false;
//               for (const g of grouped) {
//                 cumBalance += dailyTotals[g.date] || 0;
//                 if (g.date === group.date) { found = true; break; }
//               }
//               const groupBalance = found ? cumBalance : runningBalance;

//               return (
//                 <TransactionGroup
//                   key={group.date}
//                   date={getDateLabel(group.date)}
//                   onAddExpense={() => setIsExpenseModalOpen(true)}
//                 >
//                   {group.transactions.map((tx) => {
//                     const Icon = getIcon(tx.category);
//                     const isIncome = tx.type === 'income';
//                     const timeStr = tx.time || tx.createdAt?.split('T')[1]?.slice(0, 5) || '';
//                     return (
//                       <TransactionItem
//                         key={tx.id}
//                         icon={Icon}
//                         title={tx.title}
//                         category={`${tx.category || 'General'} • ${timeStr}`}
//                         amount={tx.amount}
//                         isIncome={isIncome}
//                       />
//                     );
//                   })}
//                   <DailySummary total={dayTotal} balance={groupBalance} isPositive={groupBalance >= 0} />
//                 </TransactionGroup>
//               );
//             })
//           )}
//         </Box>

//         {/* Footer */}
//         <Box
//           component="footer"
//           sx={{
//             mt: 8,
//             py: 3,
//             borderTop: '1px solid',
//             borderColor: 'divider',
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="caption" color="primary.main" fontWeight={700} letterSpacing="0.05em">
//             FinTrack
//           </Typography>
//           <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
//             © 2026 FinTrack Institutional. Secure & Encrypted.
//           </Typography>
//           <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 0.5 }}>
//             {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} •{' '}
//             {salary ? 'Salary set' : 'No salary'}
//           </Typography>
//         </Box>

//         {/* Floating Action Button */}
//         <Fab
//           color="primary"
//           aria-label="add"
//           onClick={handleFloatingAdd}
//           sx={{
//             position: 'fixed',
//             bottom: { xs: 24, md: 40 },
//             right: { xs: 24, md: 40 },
//             boxShadow: '0 8px 24px rgba(34,197,94,0.25)',
//             '&:hover': { transform: 'scale(1.05)' },
//             transition: 'transform 0.2s',
//           }}
//         >
//           <Add />
//         </Fab>
//       </Container>

//       {/* Modals */}
//       <EditSalaryModal
//         isOpen={isSalaryModalOpen}
//         onClose={() => setIsSalaryModalOpen(false)}
//         onSalaryUpdate={handleSalaryUpdate}
//       />
//       <AddExpenseModal
//         isOpen={isExpenseModalOpen}
//         onClose={() => setIsExpenseModalOpen(false)}
//         onTransactionAdd={handleTransactionAdd}
//       />
//     </Box>
//   );
// }

// export default App;



import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Fab, Container, Typography } from '@mui/material';
import { 
  Plus, 
  Utensils, 
  Car, 
  Wallet, 
  ShoppingBag, 
  Zap, 
  Shapes, 
  ReceiptText, 
  HandHeart 
} from 'lucide-react';

import Navbar from './components/Navbar';
import DailyLogHeader from './components/DailyLogHeader';
import { TransactionGroup, TransactionItem } from './components/Transaction';
import DailySummary from './components/DailySummary';
import EditSalaryModal from './components/EditSalaryModal';
import AddExpenseModal from './components/AddExpenseModal';

import { getSalary, getTransactions, saveTransactions } from './utils/storage';

// ─── Helpers ──────────────────────────────────────────────

const getDateLabel = (dateStr) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';

  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const groupTransactionsByDate = (transactions) => {
  const groups = {};
  transactions.forEach((tx) => {
    const key = tx.date || tx.createdAt?.split('T')[0] || 'unknown';
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });
  return Object.keys(groups)
    .sort((a, b) => b.localeCompare(a))
    .map((date) => ({ date, transactions: groups[date] }));
};

// ─── App ──────────────────────────────────────────────────

function App() {
  const [salary, setSalary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0),
    [transactions],
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((tx) => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0),
    [transactions],
  );

  const amountRemaining = useMemo(
    () => (salary?.amount || 0) + totalIncome - totalExpenses,
    [salary, totalIncome, totalExpenses],
  );

  // Load from localStorage
  useEffect(() => {
    const savedSalary = getSalary();
    if (savedSalary) setSalary(savedSalary);
    const savedTx = getTransactions();
    if (savedTx.length > 0) setTransactions(savedTx);
  }, []);

  // Sync transactions to localStorage
  useEffect(() => {
    if (transactions.length > 0) {
      saveTransactions(transactions);
    }
  }, [transactions]);

  const handleSalaryUpdate = useCallback((newSalary) => setSalary(newSalary), []);
  const handleTransactionAdd = useCallback((newTx) => setTransactions((prev) => [...prev, newTx]), []);
  const handleFloatingAdd = useCallback(() => setIsExpenseModalOpen(true), []);

  // Computed values
  const grouped = useMemo(() => groupTransactionsByDate(transactions), [transactions]);
  const runningBalance = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      const amount = tx.type === 'income' ? tx.amount : -tx.amount;
      return acc + amount;
    }, 0);
  }, [transactions]);

  const dailyTotals = useMemo(() => {
    const totals = {};
    transactions.forEach((tx) => {
      const key = tx.date || tx.createdAt?.split('T')[0] || 'unknown';
      const amount = tx.type === 'income' ? tx.amount : -tx.amount;
      totals[key] = (totals[key] || 0) + amount;
    });
    return totals;
  }, [transactions]);

  // Map category to lucide icon
  const getIcon = (category) => {
    const map = {
      food: Utensils,
      transport: Car,
      charity: HandHeart,
      income: Wallet,
      bill: ReceiptText,
      misc: Shapes,
      shopping: ShoppingBag,
    };
    for (const [key, icon] of Object.entries(map)) {
      if (category?.toLowerCase().includes(key)) return icon;
    }
    return Utensils; // fallback
  };

  useEffect(() => {
  const loadData = async () => {
    const savedSalary = await getSalary();
    if (savedSalary) setSalary(savedSalary);
    const savedTx = await getTransactions();
    if (savedTx.length > 0) setTransactions(savedTx);
  };
  loadData();
}, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, py: 2, position: 'relative', minHeight: '100vh' }}>
        <Navbar salary={salary} />

        <Box component="main" sx={{ mt: 1, flex: 1 }}>
          <DailyLogHeader onAddSalary={() => setIsSalaryModalOpen(true)} salary={salary} />

          {grouped.length === 0 ? (
            <Box sx={{ mt: 8, textAlign: 'center' }}>
              <Typography color="text.secondary" variant="body2" fontWeight={500}>
                No transactions yet.
                <br />
                <Typography component="span" color="text.disabled" variant="caption">
                  Tap the + button to add one.
                </Typography>
              </Typography>
            </Box>
          ) : (
            grouped.map((group) => {
              const dayTotal = dailyTotals[group.date] || 0;
              let cumBalance = 0;
              let found = false;
              for (const g of grouped) {
                cumBalance += dailyTotals[g.date] || 0;
                if (g.date === group.date) { found = true; break; }
              }
              const groupBalance = found ? cumBalance : runningBalance;

              return (
                <TransactionGroup
                  key={group.date}
                  date={getDateLabel(group.date)}
                  onAddExpense={() => setIsExpenseModalOpen(true)}
                >
                  {group.transactions.map((tx) => {
                    const Icon = getIcon(tx.category);
                    const isIncome = tx.type === "income";
                    const timeStr =
                      tx.time || tx.createdAt?.split("T")[1]?.slice(0, 5) || "";
                    return (
                      <TransactionItem
                        key={tx.id}
                        icon={Icon}
                        title={tx.title}
                        category={`${tx.category || "General"} • ${timeStr}`}
                        amount={tx.amount}
                        isIncome={isIncome}
                      />
                    );
                  })}
                  {/* <DailySummary total={dayTotal} balance={groupBalance} isPositive={groupBalance >= 0} /> */}
                  <DailySummary
                    total={dayTotal}
                    balance={groupBalance}
                    isPositive={groupBalance >= 0}
                    amountRemaining={amountRemaining} // ← new prop
                  />
                </TransactionGroup>
              );
            })
          )}
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            mt: 8,
            py: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="primary.main" fontWeight={700} letterSpacing="0.05em">
            FinTrack
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            © 2026 FinTrack Institutional. Secure & Encrypted.
          </Typography>
          <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 0.5 }}>
            {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} •{' '}
            {salary ? 'Salary set' : 'No salary'}
          </Typography>
        </Box>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleFloatingAdd}
          sx={{
            position: 'fixed',
            bottom: { xs: 24, md: 40 },
            right: { xs: 24, md: 40 },
            boxShadow: '0 8px 24px rgba(34,197,94,0.25)',
            '&:hover': { transform: 'scale(1.05)' },
            transition: 'transform 0.2s',
          }}
        >
          <Plus size={24} />
        </Fab>
      </Container>

      {/* Modals */}
      <EditSalaryModal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        onSalaryUpdate={handleSalaryUpdate}
      />
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onTransactionAdd={handleTransactionAdd}
      />
    </Box>
  );
}

export default App;

