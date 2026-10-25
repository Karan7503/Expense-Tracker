// import { X, Check } from 'lucide-react';

// export default function EditSalaryModal({ isOpen, onClose }) {
//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-6"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-surface w-full max-w-md rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
//           <h2 className="text-xl font-bold text-white">Edit Salary</h2>
//           <button 
//             onClick={onClose}
//             className="text-zinc-400 hover:text-white transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="space-y-2">
//             <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
//               Income Source
//             </label>
//             <input 
//               type="text" 
//               defaultValue="Monthly Salary"
//               className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary/50 transition-colors"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
//               Amount
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl sm:text-2xl font-bold text-zinc-500">$</span>
//               <input 
//                 type="text" 
//                 defaultValue="5800.00"
//                 className="w-full bg-white text-zinc-900 rounded-xl pl-9 sm:pl-10 pr-4 py-3 sm:py-4 text-3xl sm:text-4xl font-bold focus:outline-none"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
//               Description (Optional)
//             </label>
//             <textarea 
//               rows="3"
//               placeholder="Institutional Payout for January Services"
//               className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-primary/50 transition-colors resize-none"
//             ></textarea>
//           </div>

//           <div className="space-y-3 pt-2">
//             <button className="w-full bg-primary text-zinc-900 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
//               <Check size={20} strokeWidth={3} />
//               Save Changes
//             </button>
//             <button 
//               onClick={onClose}
//               className="w-full bg-transparent border border-zinc-800 text-zinc-400 py-3.5 rounded-xl font-bold hover:bg-zinc-800/50 hover:text-zinc-200 transition-all"
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
} from '@mui/material';
import { X } from 'lucide-react'; // ← Correct import (not "Close")
import { getSalary, saveSalary } from '../utils/storage';
import { formatCurrency, parseCurrencyInput } from '../utils/currency';

export default function EditSalaryModal({ isOpen, onClose, onSalaryUpdate }) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load salary when modal opens
  useEffect(() => {
    if (isOpen) {
      const saved = getSalary();
      if (saved) {
        setSource(saved.source || '');
        setAmount(String(saved.amount || ''));
        setDescription(saved.description || '');
      } else {
        setSource('');
        setAmount('');
        setDescription('');
      }
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedSource = source.trim();
    if (!trimmedSource) {
      setError('Income source is required.');
      return;
    }

    const numericAmount = parseCurrencyInput(amount);
    if (numericAmount === null || numericAmount < 0) {
      setError('Please enter a valid amount (0 or greater).');
      return;
    }

    const trimmedDesc = description.trim();
    setIsSubmitting(true);

    const salaryData = {
      source: trimmedSource,
      amount: numericAmount,
      description: trimmedDesc,
      updatedAt: new Date().toISOString(),
    };

    const success = saveSalary(salaryData);
    if (success) {
      onSalaryUpdate?.(salaryData);
      onClose();
    } else {
      setError('Failed to save. Please try again.');
    }
    setIsSubmitting(false);
  };

  const displayAmount = amount ? formatCurrency(parseFloat(amount) || 0) : '';

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { bgcolor: 'background.paper' } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            Edit Salary
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
          {/* Income Source */}
          <TextField
            label="Income Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. Monthly Salary"
            fullWidth
            variant="outlined"
            required
          />

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
                startAdornment: <Typography sx={{ mr: 1, fontWeight: 700, color: 'primary.main' }}>₹</Typography>,
              }}
              sx={{ '& .MuiInputBase-input': { fontSize: '1.75rem', fontWeight: 700 } }}
            />
            {amount && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Formatted: {displayAmount}
              </Typography>
            )}
          </Box>

          {/* Description */}
          <TextField
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Institutional Payout for January"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
          />

          {/* Error */}
          {error && (
            <Typography color="error" variant="body2" sx={{ bgcolor: 'error.dark', p: 1.5, borderRadius: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, flexDirection: 'column', gap: 1.5 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save Changes'}
          </Button>
          <Button onClick={onClose} variant="outlined" fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}






