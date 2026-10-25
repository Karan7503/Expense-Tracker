# Changelog

All notable changes to the FinTrack application will be documented in this file.

## [Unreleased]

### Added
- Initial UI implementation based on design mockups.
- Setup React with Vite, Tailwind CSS, and Lucide React.
- Responsive layout supporting mobile and desktop views.
- Components for Header, Daily Log, Transaction Groups, and Daily Summary.

### Changed
- Refactored `Header.jsx` to `Navbar.jsx` for better naming convention.
- Consolidated `TransactionGroup.jsx` and `TransactionItem.jsx` into `Transaction.jsx` to enhance readability and scalability.
- Updated `App.jsx` to use the new `Navbar` and `Transaction` components.

### Added
- Created `EditSalaryModal.jsx` to allow users to update their income source and amount.
- Integrated modal state in `App.jsx` and connected it to the "Add / Edit Salary" button.
- Improved `EditSalaryModal.jsx` responsiveness for mobile devices and fixed click-outside-to-close behavior.

### Changed
- Refined UI scaling across mobile views matching design mockups (dynamic button shapes, transaction badges, typography scaling, Daily Summary layout).
