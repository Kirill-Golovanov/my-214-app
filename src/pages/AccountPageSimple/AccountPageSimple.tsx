// src/pages/AccountPageSimple/AccountPageSimple.tsx

// import { useQuery } from "@tanstack/react-query";
// import { LogOut, Mail, User } from "lucide-react";
// import { useAppDispatch } from "@/app/hooks";
// import { logout } from "@/features/user/userSlice";
// import { getCurrentUser } from "@/api/getCurrentUser";


// export interface UserData {
//   id: number;
//   username: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   gender: "male" | "female";
//   image: string;
// }

// export default function AccountPageSimple() {
//   const dispatch = useAppDispatch();

//   const {
//     data: user,
//     isLoading,
//     error,
//     isFetching,
//   } = useQuery<UserData>({
//     queryKey: ["auth-user"],
//     queryFn: async () => {
//       console.log("Начинаем загрузку данных пользователя...");

//       try {
//         const result = await getCurrentUser();
//         console.log("✅ Данные пользователя успешно получены:", result);
//         return result;
//       } catch (err) {
//         console.error("❌ Ошибка при получении данных пользователя:", err);
//         throw err;
//       }
//     },
//     retry: 1,
//     staleTime: 5 * 60 * 1000,
//     cacheTime: 10 * 60 * 1000,
//   });

//   // Логирование состояния загрузки
//   if (isLoading && !isFetching) {
//     console.log("🔄 Первый запрос на получение данных...");
//   }

//   if (isFetching && !isLoading) {
//     console.log("⏳ Обновляем данные пользователя...");
//   }

//   const handleLogout = () => {
//     console.log("Выполняется выход из аккаунта...");
//     dispatch(logout());
//     window.location.href = "/";
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-xl text-gray-600">Загрузка профиля...</p>
//       </div>
//     );
//   }

//   if (error || !user) {
//     console.warn(
//       "⚠️ Не удалось загрузить профиль:",
//       error?.message || "Пользователь не найден"
//     );

//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 text-xl mb-4">
//             {error?.message || "Не авторизован"}
//           </p>
//           <a href="/" className="text-blue-600 underline hover:text-blue-800">
//             Вернуться на главную
//           </a>
//         </div>
//       </div>
//     );
//   }

//   console.log("📄 Отображаем профиль пользователя:", user);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Обложка + аватар */}
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
//             <div className="absolute -bottom-16 left-8">
//               <img
//                 src={user.image || "/default-avatar.png"}
//                 alt={`${user.firstName} ${user.lastName}`}
//                 className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
//               />
//             </div>
//           </div>

//           <div className="pt-20 pb-8 px-8">
//             {/* Имя и юзернейм */}
//             <div className="mb-6">
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {user.firstName} {user.lastName}
//               </h1>
//               <p className="text-gray-600">@{user.username}</p>
//             </div>

//             {/* Информация */}
//             <div className="space-y-4 text-gray-700">
//               <div className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 text-blue-600" />
//                 <span className="break-all">{user.email}</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <User className="w-5 h-5 text-indigo-600" />
//                 <span className="capitalize">{user.gender}</span>
//               </div>
//             </div>

//             {/* Кнопка выхода */}
//             <div className="mt-10 text-center">
//               <button
//                 onClick={handleLogout}
//                 className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-md"
//               >
//                 <LogOut className="w-5 h-5" />
//                 Выйти из аккаунта
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
