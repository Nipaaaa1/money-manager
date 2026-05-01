# 💰 Simple Money Manager

A clean, compact, and functional money manager / expense tracking application built with **Nuxt 4**, **Vue 3**, and **Tailwind CSS**.

## ✨ Features

-   **Compact Dashboard**: View your total balance, total income, and total expenses at a glance.
-   **Multi-language Support**: Fully supports **English** and **Indonesian** with a seamless language switcher.
-   **Multi-currency Support**: Choose between **IDR** and **USD** with appropriate formatting and decimal support.
-   **Dark Mode**: Native dark mode support with a theme switcher (System, Light, Dark) for comfortable viewing in any environment.
-   **Onboarding Flow**: Set your initial balance when you first use the app to ensure accurate tracking.
-   **Transaction Management**:
    -   Add income or expense with intuitive radio selections.
    -   Delete individual transactions from the history.
    -   Custom confirmation dialog for resetting all data safely.
-   **Local Persistence**: All data is stored in your browser's `localStorage`. No account or backend required.
-   **Modern UI/UX**:
    -   Beautiful animations and transitions.
    -   Native dark mode support with smooth color transitions.
    -   Integrated iconography using **Lucide Icons** via Nuxt Icon.
    -   Mobile-first responsive design.
-   **Currency Formatting**: Automatically formats values to Indonesian Rupiah (IDR).

## 🛠️ Tech Stack

-   **Framework**: [Nuxt 4](https://nuxt.com/)
-   **Frontend Library**: [Vue 3](https://vuejs.org/) (Composition API)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Modules**:
    -   [`@nuxt/icon`](https://nuxt.com/modules/icon): For consistent and high-quality iconography.
    -   [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/): For seamless multi-language support.
    -   [`@nuxtjs/color-mode`](https://color-mode.nuxtjs.org/): For intelligent and custom dark mode management.
-   **State Management**: Vue 3 Composables (`useTransactions`)
-   **Persistence**: Browser `localStorage`.

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

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
