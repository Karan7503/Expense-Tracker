// import { X, Clock, Utensils, Car, HandHeart, Wallet, ReceiptText, Shapes } from 'lucide-react';
// import { useState } from 'react';

// const CATEGORIES = [
//   { id: 'food', label: 'Food', icon: Utensils },
//   { id: 'transport', label: 'Transport', icon: Car },
//   { id: 'charity', label: 'Charity', icon: HandHeart },
//   { id: 'money', label: 'Money Credited', icon: Wallet },
//   { id: 'bill', label: 'Bill Paid', icon: ReceiptText },
//   { id: 'misc', label: 'Miscellaneous', icon: Shapes },
// ];

// export default function AddExpenseModal({ isOpen, onClose }) {
//   const [selectedCategory, setSelectedCategory] = useState('');

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-0 sm:p-6"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-surface w-full sm:max-w-md h-full sm:h-auto sm:rounded-2xl border-t sm:border border-zinc-800 shadow-2xl overflow-y-auto animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:fade-in sm:zoom-in duration-200"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-800/50">
//           <h2 className="text-xl font-bold text-white">Add Expense</h2>
//           <button 
//             onClick={onClose}
//             className="text-zinc-400 hover:text-white transition-colors p-1"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-5 sm:p-6 space-y-6 sm:space-y-8">
//           {/* Time Badge */}
//           <div className="flex justify-center">
//             <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-1.5">
//               <Clock size={14} className="text-primary" />
//               <span className="text-xs font-semibold text-zinc-300 tracking-wide">Today, 10:45 AM</span>
//             </div>
//           </div>

//           {/* Amount Input */}
//           <div className="space-y-2">
//             <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider pl-1">
//               Amount
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-primary">$</span>
//               <input 
//                 type="text" 
//                 placeholder="0.00"
//                 className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl pl-10 pr-4 py-4 text-3xl font-bold text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 transition-colors"
//               />
//             </div>
//           </div>

//           {/* Category Selection */}
//           <div className="space-y-3">
//             <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider pl-1">
//               Category
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               {CATEGORIES.map((cat) => {
//                 const Icon = cat.icon;
//                 const isSelected = selectedCategory === cat.id;
                
//                 return (
//                   <button
//                     key={cat.id}
//                     onClick={() => setSelectedCategory(cat.id)}
//                     className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
//                       isSelected 
//                         ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
//                         : 'bg-[#0a0a0a] border-zinc-800 hover:border-zinc-700'
//                     }`}
//                   >
//                     <div className="w-10 h-10 rounded-lg bg-zinc-800/80 flex items-center justify-center shrink-0">
//                       <Icon size={20} className="text-primary" />
//                     </div>
//                     <span className="text-xs font-bold text-zinc-200 leading-tight pr-2">
//                       {cat.label}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="space-y-3 pt-4 sm:pt-2">
//             <button className="w-full bg-primary text-zinc-900 py-3.5 sm:py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
//               Save Expense
//             </button>
//             <button 
//               onClick={onClose}
//               className="w-full bg-transparent border border-zinc-800 text-zinc-300 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-zinc-800/50 hover:text-white transition-all"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { X, Clock, Utensils, Car, HandHeart, Wallet, ReceiptText, Shapes, Plus } from 'lucide-react';
import { addTransaction, getToday, getTime, generateId } from '../utils/storage';
import { formatCurrency, parseCurrencyInput } from '../utils/currency';

const CATEGORIES = [
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'transport', label: 'Transport', icon: Car },
  { id: 'charity', label: 'Charity', icon: HandHeart },
  { id: 'income', label: 'Money Credited', icon: Wallet },
  { id: 'bill', label: 'Bill Paid', icon: ReceiptText },
  { id: 'misc', label: 'Miscellaneous', icon: Shapes },
];

export default function AddExpenseModal({ isOpen, onClose, onTransactionAdd }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('expense');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory('');
      setAmount('');
      setTitle('');
      setType('expense');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Please enter a title.');
      return;
    }

    const numericAmount = parseCurrencyInput(amount);
    if (numericAmount === null || numericAmount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    if (!selectedCategory) {
      setError('Please select a category.');
      return;
    }

    setIsSubmitting(true);

    const transaction = {
      id: generateId(),
      type: type === 'income' ? 'income' : 'expense',
      title: trimmedTitle,
      category: CATEGORIES.find((c) => c.id === selectedCategory)?.label || selectedCategory,
      amount: numericAmount,
      date: getToday(),
      time: getTime(),
      createdAt: new Date().toISOString(),
    };

    const updated = addTransaction(transaction);
    if (updated) {
      onTransactionAdd?.(transaction);
      onClose();
    } else {
      setError('Failed to save. Please try again.');
    }
    setIsSubmitting(false);
  };

  const currentTime = getTime();
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { bgcolor: "background.paper" } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Add Transaction
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}
        >
          {/* Time Badge */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "rgba(255,255,255,0.03)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 99,
                px: 2,
                py: 0.75,
              }}
            >
              <Clock size={14} color="#22c55e" />
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.secondary"
              >
                {today}, {currentTime}
              </Typography>
            </Box>
          </Box>

          {/* Type Toggle */}
          <ToggleButtonGroup
            value={type}
            exclusive
            onChange={(_, val) => val && setType(val)}
            fullWidth
            sx={{
              "& .MuiToggleButton-root": {
                flex: 1,
                py: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                fontWeight: 700,
                textTransform: "none",
                "&.Mui-selected": {
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderColor: "primary.main",
                },
              },
            }}
          >
            <ToggleButton
              value="expense"
              sx={{
                color: type === "expense" ? "error.main" : "text.secondary",
              }}
            >
              Expense
            </ToggleButton>
            <ToggleButton
              value="income"
              sx={{
                color: type === "income" ? "success.main" : "text.secondary",
              }}
            >
              Income
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Amount */}
          <Box>
            <TextField
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              fullWidth
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <Typography
                    sx={{ mr: 1, fontWeight: 700, color: "primary.main" }}
                  >
                    ₹
                  </Typography>
                ),
              }}
              sx={{
                "& .MuiInputBase-input": { fontSize: "2rem", fontWeight: 700 },
              }}
            />
          </Box>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Grocery Store"
            fullWidth
            variant="outlined"
            required
          />

          {/* Category Selection */}
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={700}
              letterSpacing="0.05em"
              sx={{ mb: 1.5, display: "block" }}
            >
              Category
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1.5,
              }}
            >
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <Button
                    key={cat.id}
                    variant="outlined"
                    startIcon={<Icon size={20} color="#22c55e" />}
                    onClick={() => setSelectedCategory(cat.id)}
                    sx={{
                      justifyContent: "flex-start",
                      borderColor: isSelected ? "primary.main" : "divider",
                      bgcolor: isSelected
                        ? "rgba(34,197,94,0.08)"
                        : "transparent",
                      "&:hover": {
                        borderColor: isSelected
                          ? "primary.main"
                          : "text.secondary",
                      },
                    }}
                  >
                    <Typography variant="body2" fontWeight={600} noWrap>
                      {cat.label}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
          </Box>

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ bgcolor: "error.dark", p: 1.5, borderRadius: 2 }}
            >
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, flexDirection: "column", gap: 1.5 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            startIcon={<Plus size={18} />}
          >
            {isSubmitting ? "Saving…" : "Save Transaction"}
          </Button>
          <Button onClick={onClose} variant="outlined" fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

