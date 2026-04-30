# 💰 Simple Money Manager

A clean, compact, and functional money manager / expense tracking application built with **Nuxt 4**, **Vue 3**, and **Tailwind CSS**.

## ✨ Features

-   **Compact Dashboard**: View your total balance, total income, and total expenses at a glance.
-   **Onboarding Flow**: Set your initial balance when you first use the app to ensure accurate tracking.
-   **Transaction Management**:
    -   Add income or expense with descriptions and amounts.
    -   Delete individual transactions from the history.
    -   Reset all data (including initial balance) to start fresh.
-   **Local Persistence**: All data is stored in your browser's `localStorage`. No account or backend required.
-   **Responsive Design**: Optimized for both mobile and desktop usage with a modern UI.
-   **Currency Formatting**: Automatically formats values to Indonesian Rupiah (IDR).

## 🛠️ Tech Stack

-   **Framework**: [Nuxt 4](https://nuxt.com/)
-   **Frontend Library**: [Vue 3](https://vuejs.org/) (Composition API)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **State Management**: Vue 3 Composables
-   **Icons/UI**: Custom SVG icons and Vanilla CSS transitions.

## 🚀 Getting Started

### Prerequisites

-   Node.js (latest LTS recommended)
-   pnpm (or npm/yarn)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd money-manager
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Start the development server:
    ```bash
    pnpm dev
    ```

4.  Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

-   `app/app.vue`: Main layout and entry point.
-   `app/components/`: Modular UI components (Header, Forms, List, Modals).
-   `app/composables/`: Reusable business logic and state management (`useTransactions`).
-   `app/assets/css/`: Global styles and Tailwind configuration.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
