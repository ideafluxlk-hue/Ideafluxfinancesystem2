# IDEAFLUX Finance

Premium financial management system for IDEAFLUX — track every rupee in and out, keep business and personal money separate, see real profit, and allocate it into funds.

## Option 0 — single HTML file (no install, no server)
Open `Ideaflux-Finance.html` in Chrome/Edge/Safari. Everything (UI, SQLite engine, all calculations, Excel/CSV export) is inside the file and works offline. Data is saved in *that browser on that device* — use **Settings → Download backup** regularly, and restore the same file on another browser/device. (Rebuild it with `npm run build:standalone`.)

## Option 1 — server version (multi-device, web app)
1. Install **Node.js 22.13 or newer** (https://nodejs.org).
2. In this folder:
   ```
   npm install
   npm start
   ```
3. Open **http://localhost:4000** → create your login (first run only).
4. Optional: `PORT=5000 npm start`, or `HOST=0.0.0.0 npm start` to open it from your phone on the same Wi-Fi.

Your real data is stored in `data/ideaflux.db` (starts **empty**). Demo data is in `data/demo.db` — use **View demo data** in the sidebar to explore, and **Switch to REAL data** to go back. Daily automatic backups go to `data/backups/`; **Settings → Download backup** gives you a portable file you can restore from.

## Suggested first steps
1. **Settings → Accounts**: set the opening balance of the personal account if it already holds business money.
2. **Income → Record income** for each job (invoice amount + what you've received so far).
3. **Expenses → Add expense** — mark "I paid personally" for business costs you paid from your own pocket.
4. At month end: **Profit Allocation → Preview → Allocate**.
5. **Reports** for P&L, cash flow, profitability — export to Excel/CSV.

## How the money rules work (short version)
* **Revenue = money actually received.** Unpaid invoices show as *Outstanding* and are never counted as cash.
* **Net profit = revenue received − business expenses.**
* **Cash ≠ profit ≠ savings.** Cash = what sits in your accounts. Profit = what the business earned. Savings = profit you have earmarked in funds.
* **Transfers / withdrawals / contributions / reimbursements are not income or expenses.**
* **Profit allocation never changes profit or cash.**

## Tests
`npm test` runs 16 end-to-end tests of these rules (partial payments, transfers, withdrawals, owner-paid expenses, allocation, duplicates, backup/restore, exports, auth).

See `docs/ARCHITECTURE.md` for the schema and design.
