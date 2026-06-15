"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function BlogImageGeneratorPage() {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [image, setImage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const generateImage = async () => {
    if (!title || !content) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/blog-image/generate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        }
      );

      const data =
        await response.json();

      setImage(
        data.featuredImage
      );
    } catch (error) {
      toast.error(
        "Failed to generate image"
      );
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">
        Blog Image Generator
      </h1>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        />

        <textarea
          placeholder="Paste blog content or description..."
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          className="w-full h-64 bg-zinc-900 border border-zinc-700 rounded-xl p-4"
        />

        <button
          onClick={generateImage}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold cursor-pointer"
        >
          {loading
            ? "Generating..."
            : "Generate Image"}
        </button>
      </div>

      {image && (
        <div className="mt-10">
          <img
            src={image}
            alt={title}
            className="w-full rounded-xl border border-zinc-700"
          />
        </div>
      )}
    </div>
  );
}