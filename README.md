# 📋 **Form Builder**

A powerful, user-friendly form creation tool built with **Next.js**, **TypeScript**, **Tailwind CSS**, **MongoDb**, **React Hook Form**, and **Zod** for validation. This app allows users to dynamically create, preview, and share customizable forms. It also tracks form completion status for users filling the form.

---

## 🚀 **Features**

- **Drag-and-Drop Form Builder**: Easily add, edit, and rearrange form fields with a simple interface.
- **Live Form Preview**: View how the form will look in a **modal preview** before publishing.
- **Dynamic Field Types**: Select from a variety of input fields like text, number, radio, and more.
- **Field Management**: Users can **remove any field** directly from the form.
- **Save as Draft**: Save the form as a draft to continue editing later.
- **Shareable Forms**: Once published, a **sharable link** is generated for each form.
- **Form Submission**: End users can fill out shared forms, and submission data is stored in **MongoDB**.
- **Form Library**: View a list of all previously created forms on the `/forms` page.
- **Progress Indicator**: A progress bar shows users how much of the form they've completed.
- **Data Storage in MongoDB**: All created forms and form submissions are securely stored in **MongoDB**.
- **Robust Form Validation**: Powered by **Zod** and **React Hook Form** to ensure secure and accurate form inputs.

---

## 🛠️ **Tech Stack**

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **State Management**: React Hook Form
- **Form Validation**: Zod
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Modal & Dropdown**: Radix UI

---

## 📸 **Screenshots**

### 1️⃣ **Form Builder Page**

> Add input fields, customize labels, and change field types via a dropdown menu.  
> ![Form Builder Screenshot](/public//ss-1.png) > ![Form Builder Screenshot](/public/ss-2.png) > ![Form Builder Screenshot](/public/ss-4.png)

### 2️⃣ **Live Preview (Modal)**

> View a live preview of your form before publishing.  
> ![Preview Modal Screenshot](/public/ss-3.png)

### 3️⃣ **Submit Form**

> Submit form page
> ![Preview Modal Screenshot](/public/ss-5.png)

### 4️⃣ **Form Library**

> View all previously created forms on the `/forms` page.  
> ![Forms List Screenshot](/public/ss-6.png)
