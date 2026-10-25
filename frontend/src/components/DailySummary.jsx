// export default function DailySummary({ total, balance, isPositive }) {
//   return (
//     <div className="flex flex-col p-4 sm:p-5 bg-surface rounded-xl border border-zinc-800/80 mt-1 relative overflow-hidden">
//       {/* Decorative left border */}
//       <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-xl"></div>
      
//       <div className="pl-2 w-full">
//         <div className="text-[10px] text-primary font-bold tracking-wider mb-3 uppercase">Daily Summary</div>
        
//         <div className="flex items-end justify-between">
//           <div>
//             <div className="text-[10px] sm:text-[11px] text-zinc-400 font-bold mb-1">Daily Total</div>
//             <div className={`text-xl sm:text-2xl font-bold tracking-tight ${isPositive ? 'text-primary' : 'text-danger'}`}>
//               {isPositive ? '+' : '-'}{total}
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="text-[10px] sm:text-[11px] text-zinc-400 font-bold mb-1">Running Balance</div>
//             <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
//               {balance}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import { formatCurrency } from '../utils/currency';

// export default function DailySummary({ total, balance, isPositive }) {
//   const numericTotal = typeof total === 'number' ? total : parseFloat(total) || 0;
//   const numericBalance = typeof balance === 'number' ? balance : parseFloat(balance) || 0;

//   const totalSign = numericTotal >= 0 ? '+' : '-';
//   const totalColor = numericTotal >= 0 ? 'success.main' : 'error.main';
//   const balanceColor = numericBalance >= 0 ? 'success.main' : 'error.main';

//   return (
//     <Box
//       sx={{
//         mt: 2,
//         pt: 2,
//         borderTop: '1px solid',
//         borderColor: 'divider',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         px: 0.5,
//       }}
//     >
//       <Box display="flex" alignItems="center" gap={1.5}>
//         <Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing="0.05em">
//           Daily
//         </Typography>
//         <Typography variant="body2" fontWeight={700} sx={{ color: totalColor }}>
//           {totalSign}
//           {formatCurrency(Math.abs(numericTotal))}
//         </Typography>
//       </Box>

//       <Box display="flex" alignItems="center" gap={1.5}>
//         <Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing="0.05em">
//           Balance
//         </Typography>
//         <Typography variant="body2" fontWeight={700} sx={{ color: balanceColor }}>
//           {formatCurrency(numericBalance)}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }


import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatCurrency } from '../utils/currency';

export default function DailySummary({ total, balance, isPositive, amountRemaining }) {
  const numericTotal = typeof total === 'number' ? total : parseFloat(total) || 0;
  const numericBalance = typeof balance === 'number' ? balance : parseFloat(balance) || 0;
  const numericAmountRemaining = typeof amountRemaining === 'number' ? amountRemaining : 0;

  const totalSign = numericTotal >= 0 ? '+' : '-';
  const totalColor = numericTotal >= 0 ? 'success.main' : 'error.main';
  const balanceColor = numericBalance >= 0 ? 'success.main' : 'error.main';

  return (
    <Box
      sx={{
        mt: 2,
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexWrap: 'wrap',          // allow wrap on small screens
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,                    // spacing between items
      }}
    >
      {/* Daily */}
      <Box>
        <Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing="0.05em">
          Daily
        </Typography>
        <Typography variant="body2" fontWeight={700} sx={{ color: totalColor }}>
          {totalSign}
          {formatCurrency(Math.abs(numericTotal))}
        </Typography>
      </Box>

      {/* Amount Remaining (new) */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing="0.05em">
          Amount Remaining
        </Typography>
        <Typography variant="body2" fontWeight={700} sx={{ color: 'text.primary' }}>
          {formatCurrency(numericAmountRemaining)}
        </Typography>
      </Box>

      {/* Balance */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing="0.05em">
          Balance
        </Typography>
        <Typography variant="body2" fontWeight={700} sx={{ color: balanceColor }}>
          {formatCurrency(numericBalance)}
        </Typography>
      </Box>
    </Box>
  );
}


