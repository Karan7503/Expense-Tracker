// import { Bell, User, CircleUserRound } from 'lucide-react';

// export default function Navbar() {
//   return (
//     <header className="flex items-center justify-between py-4 sm:py-6">
//       <div className="flex items-center gap-2">
//         <div className="w-8 h-8 rounded-full bg-surface border border-zinc-700 flex items-center justify-center overflow-hidden">
//           <User size={18} className="text-zinc-400" />
//         </div>
//         <h1 className="text-lg sm:text-xl font-bold text-primary tracking-wide">FinTrack</h1>
//       </div>
      
//       <div className="flex items-center gap-4">
//         {/* Desktop notification bell */}
//         <button className="hidden sm:block text-zinc-400 hover:text-white transition-colors">
//           <Bell size={20} />
//         </button>
//         {/* Desktop User Profile */}
//         <div className="hidden sm:flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center">
//              <User size={18} className="text-zinc-300" />
//           </div>
//           <span className="text-sm font-medium text-zinc-200">Alex Morgan</span>
//         </div>
//         {/* Mobile User Profile Icon */}
//         <button className="sm:hidden w-8 h-8 rounded-full bg-zinc-800 border border-primary flex items-center justify-center text-primary hover:bg-zinc-700 transition-colors">
//           <CircleUserRound size={18} strokeWidth={2.5} />
//         </button>
//       </div>
//     </header>
//   );
// }


import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { AttachMoney, TrendingUp, TrendingDown } from '@mui/icons-material';
import { formatCurrency } from '../utils/currency';

export default function Navbar({ salary }) {
  const monthlyIncome = salary?.amount ?? 0;

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',      // ✅ inside sx, not as a prop
        justifyContent: 'space-between',
        py: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box>
        <Typography variant="h5" component="h1" fontWeight={800} letterSpacing="-0.02em">
          <Box component="span" sx={{ color: 'primary.main' }}>◆</Box> FinTrack
        </Typography>
        <Typography variant="caption" color="textSecondary" fontWeight={600} letterSpacing="0.05em">
          Expense Tracker
        </Typography>
      </Box>

      {/* Use Stack with sx for alignment */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center' }}   // ✅ move to sx
      >
        {monthlyIncome > 0 && (
          <Chip
            icon={<AttachMoney fontSize="small" sx={{ color: 'primary.main' }} />}
            label={
              <Box component="span" sx={{ fontWeight: 600 }}>
                {formatCurrency(monthlyIncome)}
                <Box component="span" sx={{ fontSize: '0.65rem', color: 'text.secondary', ml: 0.5, fontWeight: 500 }}>
                  / mo
                </Box>
              </Box>
            }
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 99,
              py: 0.5,
              '& .MuiChip-label': { px: 1.5 },
            }}
          />
        )}

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Chip
            icon={<TrendingUp fontSize="small" sx={{ color: 'success.main' }} />}
            label="+"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 99,
              '& .MuiChip-label': { color: 'success.main', fontWeight: 700 },
            }}
          />
          <Chip
            icon={<TrendingDown fontSize="small" sx={{ color: 'error.main' }} />}
            label="-"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.04)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 99,
              '& .MuiChip-label': { color: 'error.main', fontWeight: 700 },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}