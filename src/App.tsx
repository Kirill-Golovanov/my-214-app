// // src/App.tsx
// import { Routes, Route } from "react-router-dom";
// import ProductsPage from "./pages/ProductsPage/ProductsPage";
// import Layout from "./components/Layout/Layout";
// import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
// import CartPage from "./pages/CartPage/CartPage";
// import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
// // import AccountPage from "./pages/AccountPage/AccountPage";
// import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
// import AccountPageSimple from "./pages/AccountPageSimple/AccountPageSimple";


// export default function App() {
//   return (
//     <Layout>
//       <Routes>
//         <Route path="/" element={<ProductsPage />} />
//         <Route path="/products" element={<ProductsPage />} />
//         <Route path="/products/:id" element={<ProductDetailPage />} />
//         <Route path="/favorites" element={<FavoritesPage />} />
//         <Route path="/cart" element={<CartPage />} />
//         {/* <Route path="/my-account" element={<AccountPage/>} /> */}
//         <Route path="/my-account" element={<AccountPageSimple />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//       </Routes>
//     </Layout>
//   );
// }


// src/App.tsx
import { Routes, Route } from "react-router-dom";


import AccountPageVersion2 from "./pages/AccountPageVersion2/AccountPageVersion2";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Публичные */}
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Защищённый */}
        <Route element={<ProtectedRoute />}>
          <Route path="/my-account" element={<AccountPageVersion2 />} />
        </Route>
      </Routes>
    </Layout>
  );
}