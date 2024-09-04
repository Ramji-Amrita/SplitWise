Here's a more organized and user-friendly version of the installation guide for the SplitWise Clone, SpendShare:

---

# **SpendShare Installation Guide**

**SpendShare** is a web application designed to help users manage group expenses, track payments, and view activity history. Follow this step-by-step guide to set up the application on your local machine.

---

### **1. Clone the Repository**

Begin by cloning the SpendShare repository to your local machine:

```bash
git clone https://github.com/PawanSirsat/SpendShare.git
```

### **2. Install Dependencies**

Navigate to the project directory and install the required Node.js packages:

```bash
cd spendshare
npm install
```

### **3. Install and Configure Tailwind CSS**

Install Tailwind CSS and initialize it in your project:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### **4. Setup Appwrite (Database Configuration)**

#### **Step 1: Create an Appwrite Account**
- Sign up for an Appwrite account at [Appwrite](https://appwrite.io).

#### **Step 2: Create a New Project**
- In the Appwrite dashboard, create a new project (e.g., **Splitwise**).

#### **Step 3: Setup the Database**
- Go to the **Databases** section and create a new database (e.g., **Expense**).

#### **Step 4: Create Collections**
Create the following collections within your database:

1. **Users**
   - **UserName**: `string` (Default: `-`)
   - **email**: `email` (Default: `-`)
   - **accountId**: `string` (Default: `-`)

2. **Groups**
   - **groupName**: `string` (Default: `-`)
   - **Creator**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Cascade on delete)
   - **Members**: `Relationship` (Two-way Relationship with **Users**; `Many to Many`, Set Null on delete)

3. **Friends**
   - **friendsId**: `Relationship` (Two-way Relationship with **Users**; `Many to many`, Set Null on delete)
   - **CollectionId**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Set Null on delete)

4. **Activity**
   - **Desc**: `string` (Default: `-`)
   - **Time**: `DateTime` (Default: `-`)
   - **Amout**: `string` (Default: `-`) *Note: If you change this spelling, update it in the React app.*
   - **IsSettled**: `boolean` (Default: `false`)
   - **splitMember**: `Relationship` (Two-way Relationship with **Users**; `Many to many`, Set Null on delete)
   - **PaidBy**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Set Null on delete)
   - **Group**: `Relationship` (Two-way Relationship with **Groups**; `Many to one`, Cascade on delete)

5. **Transaction**
   - **Amount**: `string` (Default: `-`)
   - **Time**: `DateTime` (Default: `-`)
   - **IsOld**: `boolean` (Default: `false`)
   - **payerId**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Set Null on delete)
   - **receiverId**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Set Null on delete)

#### **Step 5: Copy IDs to .env File**

1. In **Project Settings**, copy the **Project ID** and **API Endpoint**.
2. Copy the **Database ID** and all **Collection IDs** from the database.
3. Create a `.env.local` file and add the copied IDs as follows:

```bash
VITE_APPWRITE_URL='https://cloud.appwrite.io/v1'
VITE_APPWRITE_PROJECT_ID='657c067565211fbcf173'
VITE_APPWRITE_DATABASE_ID='657c0953b37f27853da8'
VITE_APPWRITE_STORAGE_ID='655731fab34674189956216'
VITE_APPWRITE_USER_COLLECTION_ID='657casd56db7f49cee3b20'
VITE_APPWRITE_GROUPS_COLLECTION_ID='657c09839424664asd87496'
VITE_APPWRITE_ACTIVITY_COLLECTION_ID='657c099dd2eda1dd9ebb'
VITE_APPWRITE_FRIENDS_COLLECTION_ID='6581b28b356casds5dd28d'
VITE_APPWRITE_TRANSACTION_COLLECTION_ID='65aasd54f3a07faec3c8'
```

### **5. Run the Project**

Finally, start the development server:

```bash
npm run dev
```

---


# Login
![Screenshot (463)](https://github.com/PawanSirsat/SplitWise/assets/48860105/6feaf149-4f67-474b-ac5b-a61f6eacbb63)

# Signup
![Screenshot (464)](https://github.com/PawanSirsat/SplitWise/assets/48860105/71c31b5f-beee-4a61-87ff-3398fdd6e98f)

# Home
![Screenshot (457)](https://github.com/PawanSirsat/SplitWise/assets/48860105/b09536d8-43a5-402d-8590-7b6c4edbfd59)

# All Activity
![Screenshot (458)](https://github.com/PawanSirsat/SplitWise/assets/48860105/63a37885-204b-4d6c-b1e1-6d2f09b3dcd8)

# Group Activity
![Screenshot (460)](https://github.com/PawanSirsat/SplitWise/assets/48860105/ae8b0631-8a98-49d1-96cb-9810a0673586)

# Profile 
![Screenshot (459)](https://github.com/PawanSirsat/SplitWise/assets/48860105/8f6f3be7-7883-483b-9e23-05aaf8fcc29f)


### Built With

React - A JavaScript library for building user interfaces.
React Router - Declarative routing for React.js.
Tailwind CSS - A utility-first CSS framework.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
