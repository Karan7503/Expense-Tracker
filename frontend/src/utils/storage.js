// const KEYS = {
//   SALARY: 'expenseTracker_salary',
//   TRANSACTIONS: 'expenseTracker_transactions',
// };

// export const getSalary = () => {
//   try {
//     const raw = localStorage.getItem(KEYS.SALARY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// };

// export const saveSalary = (salary) => {
//   try {
//     localStorage.setItem(KEYS.SALARY, JSON.stringify(salary));
//     return true;
//   } catch {
//     return false;
//   }
// };

// export const getTransactions = () => {
//   try {
//     const raw = localStorage.getItem(KEYS.TRANSACTIONS);
//     return raw ? JSON.parse(raw) : [];
//   } catch {
//     return [];
//   }
// };

export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
    return true;
  } catch {
    return false;
  }
};

// export const addTransaction = (transaction) => {
//   const existing = getTransactions();
//   const updated = [...existing, transaction];
//   return saveTransactions(updated) ? updated : null;
// };

export const generateId = () => crypto.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
export const getToday = () => new Date().toISOString().split('T')[0];
export const getTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });







const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getSalary() {
  const res = await fetch(`${API_BASE}/salary`);
  if (!res.ok) return null;
  return res.json();
}

export async function saveSalary(salary) {
  const res = await fetch(`${API_BASE}/salary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(salary),
  });
  return res.ok;
}

export async function getTransactions() {
  const res = await fetch(`${API_BASE}/transactions`);
  if (!res.ok) return [];
  return res.json();
}

export async function addTransaction(transaction) {
  const res = await fetch(`${API_BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  return res.ok;
}

// Keep generateId, getToday, getTime as they are



