"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  skills: string;
}

export default function ProfilePage() {
  const [formData, setFormData] =
    useState({
      name: "",
      title: "",
      bio: "",
      skills: "",
    });

  const [profiles, setProfiles] =
    useState<Profile[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const fetchProfiles = async () => {
    try {
      const response = await fetch(
        "/api/profile/list"
      );

      const data =
        await response.json();

      setProfiles(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      bio: "",
      skills: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const endpoint = editingId
      ? "/api/profile/update"
      : "/api/profile/create";

    const response = await fetch(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: editingId,
        }),
      }
    );

    if (response.ok) {
      toast.success(
        editingId
          ? "Profile Updated"
          : "Profile Created"
      );

      resetForm();

      fetchProfiles();
    } else {
      toast.error(
        "Something went wrong"
      );
    }

    setLoading(false);
  };

  const handleEdit = (
    profile: Profile
  ) => {
    setEditingId(profile.id);

    setFormData({
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      skills: profile.skills,
    });
  };

  const handleDelete = async (
    id: string
  ) => {
    const response = await fetch(
      "/api/profile/delete",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    if (response.ok) {
      toast.success(
        "Profile Deleted"
      );

      fetchProfiles();
    } else {
      toast.error(
        "Delete failed"
      );
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">
        Profile Settings
      </h1>

      <div className="space-y-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        />

        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Professional Title"
          onChange={handleChange}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        />

        <textarea
          name="bio"
          value={formData.bio}
          placeholder="Short Bio"
          onChange={handleChange}
          className="w-full h-40 bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        />

        <input
          type="text"
          name="skills"
          value={formData.skills}
          placeholder="Skills separated by commas"
          onChange={handleChange}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        />

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold cursor-pointer"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Profile"
              : "Save Profile"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-zinc-800 px-6 py-3 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-6">
          Profile List
        </h2>

        <div className="space-y-5">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {profile.name}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    {profile.title}
                  </p>

                  <p className="text-zinc-500 mt-3">
                    {profile.bio}
                  </p>

                  <p className="text-sm text-zinc-400 mt-3">
                    {profile.skills}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleEdit(
                        profile
                      )
                    }
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        profile.id
                      )
                    }
                    className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}