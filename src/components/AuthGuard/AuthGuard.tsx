// import { useAuth } from "@/features/auth/useAuth";
// import { useEffect } from "react";
// import { Navigate, useLocation } from "react-router-dom";


// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated, checkAuth } = useAuth();
//   const location = useLocation();

//   // Проверяем авторизацию при загрузке
//   useEffect(() => {
//     if (!isAuthenticated) {
//       checkAuth();
//     }
//   }, [isAuthenticated, checkAuth]);

//   if (isAuthenticated) {
//     return <>{children}</>;
//   }

//   // Сохраняем текущий путь для редиректа после входа
//   return <Navigate to="/login" state={{ from: location }} replace />;
// }
