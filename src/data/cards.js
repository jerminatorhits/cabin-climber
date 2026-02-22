// Recommended cards for accruing points to Tokyo business class. Ordered by ease of approval + hitting bonus.
export const recommendedCards = [
  { id: 'csp', name: 'Chase Sapphire Preferred®', bank: 'Chase', bonus: 60000, spendRequired: 4000, monthsToSpend: 3, transferPartners: ['United', 'Hyatt', 'Virgin Atlantic'], difficulty: 'easy', note: 'Strong first card; 60k UR can transfer to United for ANA/United to Tokyo.' },
  { id: 'csr', name: 'Chase Sapphire Reserve®', bank: 'Chase', bonus: 60000, spendRequired: 4000, monthsToSpend: 3, transferPartners: ['United', 'Hyatt', 'Virgin Atlantic'], difficulty: 'medium', note: 'Higher annual fee; same transfer partners as CSP.' },
  { id: 'cff', name: 'Chase Freedom Flex®', bank: 'Chase', bonus: 20000, spendRequired: 500, monthsToSpend: 3, transferPartners: 'Transfer to CSP/CSR', difficulty: 'easy', note: 'No-fee; points combine with Sapphire.' },
  { id: 'amex-plat', name: 'The Platinum Card® (Amex)', bank: 'Amex', bonus: 80000, spendRequired: 6000, monthsToSpend: 6, transferPartners: ['ANA', 'Delta', 'Virgin Atlantic'], difficulty: 'medium', note: 'Transfers to ANA for Tokyo; higher spend requirement.' },
  { id: 'amex-gold', name: 'American Express® Gold Card', bank: 'Amex', bonus: 60000, spendRequired: 6000, monthsToSpend: 6, transferPartners: ['ANA', 'Delta', 'Virgin Atlantic'], difficulty: 'medium', note: 'Good for dining/groceries.' },
]
