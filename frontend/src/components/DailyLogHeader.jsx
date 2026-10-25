// import { Banknote } from 'lucide-react';

// export default function DailyLogHeader({ onAddSalary }) {
//   return (
//     <div className="flex  py-1 w-[400px] sm:w-full mb-2">
//       <div className="flex-1 min-w-0 pr-2">
//         <h2 className="text-xl sm:text-3xl font-bold text-white mb-1 truncate">Daily Log</h2>
//         <p className="text-zinc-400 text-[11px] sm:text-sm leading-tight">Your automated financial Expense Tracker</p>
//       </div>
//       <button 
//         onClick={onAddSalary}
//         // bg-transparent
//         className="flex items-center gap-1.5 bg-primary text-zinc-900 text-primary border border-primary sm:border-transparent hover:opacity-90 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg transition-colors w-fit font-semibold text-[11px] sm:text-sm shrink-0 text-left"
//       >
//         <Banknote size={16} className="sm:w-[18px] sm:h-[18px]" />
//         <span className="leading-tight sm:whitespace-nowrap">Add / Edit Salary</span>
//       </button>
//     </div>
//   );
// }

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Edit, Wallet } from '@mui/icons-material';
import { formatCurrency } from '../utils/currency';

export default function DailyLogHeader({ onAddSalary, salary }) {
  const hasSalary = salary && salary.amount > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        py: 2,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 700,
          }}
        >
          <span>📋</span> Daily Log
        </Typography>
        {hasSalary && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: 'block' }}
          >
            Salary • {formatCurrency(salary.amount)}
            {salary.source && ` · ${salary.source}`}
          </Typography>
        )}
      </Box>

      <Button
        variant="outlined"
        startIcon={<Wallet fontSize="small" />}
        endIcon={<Edit fontSize="small" />}
        onClick={onAddSalary}
        sx={{
          borderRadius: 99,
          borderColor: 'divider',
          color: 'text.secondary',
          '&:hover': {
            borderColor: 'text.primary',
            bgcolor: 'rgba(255,255,255,0.03)',
          },
        }}
      >
        {hasSalary ? 'Edit Salary' : 'Add Salary'}
      </Button>
    </Box>
  );
}

