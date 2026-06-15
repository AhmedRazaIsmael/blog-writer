// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// interface Portfolio {
//   id: string;
//   title: string;
//   description: string;
//   keywords: string;
//   url: string;
// }

// export default function PortfolioPage() {
//   const [formData, setFormData] =
//     useState({
//       title: "",
//       description: "",
//       keywords: "",
//       url: "",
//     });

//   const [portfolios, setPortfolios] =
//     useState<Portfolio[]>([]);

//   const [editingId, setEditingId] =
//     useState<string | null>(null);

//   const [loading, setLoading] =
//     useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   const fetchPortfolios = async () => {
//     try {
//       const response = await fetch(
//         "/api/portfolio/list"
//       );

//       const data =
//         await response.json();

//       setPortfolios(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchPortfolios();
//   }, []);

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       description: "",
//       keywords: "",
//       url: "",
//     });

//     setEditingId(null);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);

//     const endpoint = editingId
//       ? "/api/portfolio/update"
//       : "/api/portfolio/create";

//     const response = await fetch(
//       endpoint,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           id: editingId,
//         }),
//       }
//     );

//     if (response.ok) {
//       toast.success(
//         editingId
//           ? "Portfolio Updated"
//           : "Portfolio Added"
//       );

//       resetForm();

//       fetchPortfolios();
//     } else {
//       toast.error(
//         "Something went wrong"
//       );
//     }

//     setLoading(false);
//   };

//   const handleEdit = (
//     portfolio: Portfolio
//   ) => {
//     setEditingId(portfolio.id);

//     setFormData({
//       title: portfolio.title,
//       description:
//         portfolio.description,
//       keywords:
//         portfolio.keywords,
//       url: portfolio.url,
//     });
//   };

//   const handleDelete = async (
//     id: string
//   ) => {
//     const response = await fetch(
//       "/api/portfolio/delete",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },
//         body: JSON.stringify({ id }),
//       }
//     );

//     if (response.ok) {
//       toast.success(
//         "Portfolio Deleted"
//       );

//       fetchPortfolios();
//     } else {
//       toast.error(
//         "Delete failed"
//       );
//     }
//   };

//   return (
//     <div className="max-w-4xl">
//       <h1 className="text-4xl font-bold mb-8">
//         Add Portfolio
//       </h1>

//       <div className="space-y-5">
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           placeholder="Project Title"
//           onChange={handleChange}
//           className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
//         />

//         <textarea
//           name="description"
//           value={
//             formData.description
//           }
//           placeholder="Project Description"
//           onChange={handleChange}
//           className="w-full h-40 bg-zinc-900 border border-zinc-700 rounded-xl p-4"
//         />

//         <input
//           type="text"
//           name="keywords"
//           value={formData.keywords}
//           placeholder="Keywords separated by commas"
//           onChange={handleChange}
//           className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
//         />

//         <input
//           type="text"
//           name="url"
//           value={formData.url}
//           placeholder="Project URL"
//           onChange={handleChange}
//           className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
//         />

//         <div className="flex gap-4">
//           <button
//             onClick={handleSubmit}
//             className="bg-white text-black px-6 py-3 rounded-xl font-semibold cursor-pointer"
//           >
//             {loading
//               ? "Saving..."
//               : editingId
//               ? "Update Portfolio"
//               : "Add Portfolio"}
//           </button>

//           {editingId && (
//             <button
//               onClick={resetForm}
//               className="bg-zinc-800 px-6 py-3 rounded-xl cursor-pointer"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="mt-14">
//         <h2 className="text-3xl font-bold mb-6">
//           Portfolio List
//         </h2>

//         <div className="space-y-5">
//           {portfolios.map(
//             (portfolio) => (
//               <div
//                 key={portfolio.id}
//                 className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <h3 className="text-xl font-semibold">
//                       {
//                         portfolio.title
//                       }
//                     </h3>

//                     <p className="text-zinc-400 mt-2">
//                       {
//                         portfolio.description
//                       }
//                     </p>

//                     <p className="text-sm text-zinc-500 mt-3">
//                       {
//                         portfolio.keywords
//                       }
//                     </p>

//                     <a
//                       href={
//                         portfolio.url
//                       }
//                       target="_blank"
//                       className="text-blue-400 block mt-3"
//                     >
//                       {
//                         portfolio.url
//                       }
//                     </a>
//                   </div>

//                   <div className="flex gap-3">
//                     <button
//                       onClick={() =>
//                         handleEdit(
//                           portfolio
//                         )
//                       }
//                       className="bg-yellow-500 text-black px-4 py-2 rounded-lg cursor-pointer"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() =>
//                         handleDelete(
//                           portfolio.id
//                         )
//                       }
//                       className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function PortfolioPage() {
  return (
    <div>
      Portfolio
    </div>
  );
}