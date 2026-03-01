// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { setUser, setLoading, setError } from "./authSlice";
// import { authApi } from "./authApi";

// export function useAuth() {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated, loading, error } = useSelector(
//     (state: RootState) => state.auth
//   );
//   const [showModal, setShowModal] = useState(false);

//   const login = async (username: string, password: string) => {
//     try {
//       dispatch(setLoading(true));
//       const data = await authApi.login(username, password);
//       dispatch(setUser(data));
//       dispatch(setError(null));
//       setShowModal(false);
//     } catch (err) {
//       dispatch(setError("Ошибка авторизации"));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const logout = () => {
//     dispatch(setUser(null));
//     // Очистка cookies произойдёт автоматически при запросе к API
//   };

//   const checkAuth = async () => {
//     try {
//       const user = await authApi.getCurrentUser();
//       dispatch(setUser(user));
//     } catch (err) {
//       dispatch(setUser(null));
//     }
//   };

//   return {
//     user,
//     isAuthenticated,
//     loading,
//     error,
//     showModal,
//     setShowModal,
//     login,
//     logout,
//     checkAuth,
//   };
// }
