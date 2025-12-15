// import { useState, useEffect } from "react";
// import { getCurrentUser } from "./api/auth";

// const UserProfile = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userData = await getCurrentUser();
//         setUser(userData);
//         setError(null);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("Неизвестная ошибка");
//         }
//         setUser(null);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }

//   if (!user) {
//     return <div>Загрузка...</div>;
//   }

//   return (
//     <div>
//       <h1>Профиль пользователя</h1>
//       <p>
//         Имя: {user.firstName} {user.lastName}
//       </p>
//       <p>Email: {user.email}</p>
//     </div>
//   );
// };

// export default UserProfile;
