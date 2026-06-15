// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function DashboardPage() {
//   const [jobPost, setJobPost] =
//     useState("");

//   const [proposal, setProposal] =
//     useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const [profiles, setProfiles] =
//     useState<any[]>([]);

//   const [selectedProfile, setSelectedProfile] =
//     useState("");

//   useEffect(() => {
//     fetchProfiles();
//   }, []);

//   const fetchProfiles = async () => {
//     const response = await fetch(
//       "/api/profile/list"
//     );

//     const data =
//       await response.json();

//     setProfiles(data);

//     if (data.length > 0) {
//       setSelectedProfile(data[0].id);
//     }
//   };

//   const generateProposal = async () => {
//     if (!jobPost || !selectedProfile)
//       return;

//     setLoading(true);

//     const response = await fetch(
//       "/api/generate-cover-letter",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },
//         body: JSON.stringify({
//           jobPost,
//           profileId:
//             selectedProfile,
//         }),
//       }
//     );

//     const data =
//       await response.json();

//     setProposal(data.proposal);

//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-8">
//         Generate Proposal
//       </h1>

//       <div className="mb-5">
//         <label className="block mb-2 text-sm text-zinc-400">
//           Select Profile
//         </label>

//         <select
//           value={selectedProfile}
//           onChange={(e) =>
//             setSelectedProfile(
//               e.target.value
//             )
//           }
//           className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
//         >
//           {profiles.map((profile) => (
//             <option
//               key={profile.id}
//               value={profile.id}
//             >
//               {profile.name} —{" "}
//               {profile.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       <textarea
//         value={jobPost}
//         onChange={(e) =>
//           setJobPost(e.target.value)
//         }
//         placeholder="Paste Upwork Job Post..."
//         className="w-full h-64 bg-zinc-900 border border-zinc-700 rounded-xl p-5 outline-none"
//       />

//       <button
//         onClick={generateProposal}
//         className="mt-5 bg-white text-black px-6 py-3 rounded-xl font-semibold cursor-pointer"
//       >
//         {loading
//           ? "Generating..."
//           : "Generate"}
//       </button>

//       {proposal && (
//       <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-xl p-6 relative">
        
//         {/* Top Copy Button */}
//         <button
//           onClick={() => {
//             navigator.clipboard.writeText(
//               proposal
//             );
//             toast.success("Copied");
//           }}
//           className="absolute top-4 right-4 bg-white text-black text-sm px-4 py-2 rounded-lg font-medium cursor-pointer"
//         >
//           Copy
//         </button>

//         <div className="whitespace-pre-wrap pt-10 pb-10">
//           {proposal}
//         </div>

//         {/* Bottom Copy Button */}
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={() => {
//               navigator.clipboard.writeText(
//                 proposal
//               );
//               toast.success("Copied");
//             }}
//             className="bg-white text-black text-sm px-4 py-2 rounded-lg font-medium cursor-pointer"
//           >
//             Copy Proposal
//           </button>
//         </div>
//       </div>
//     )}
//     </div>
//   );
// }

export default function DashboardPage() {
  return (
    <div>
      Dashboard
    </div>
  );
}