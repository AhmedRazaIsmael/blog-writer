"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function BlogGeneratorPage() {
  const [title, setTitle] =
    useState("");

  const [websiteUrl, setWebsiteUrl] =
    useState("");

  const [keywords, setKeywords] =
    useState("");

  const [plainText, setPlainText] =
    useState("");

  const [htmlBlog, setHtmlBlog] =
    useState("");

  const [metaTitle, setMetaTitle] =
    useState("");

    const [featuredImage, setFeaturedImage] =
    useState("");

  const [
    metaDescription,
    setMetaDescription,
  ] = useState("");

  const [
    metaKeywords,
    setMetaKeywords,
  ] = useState("");

  const [slug, setSlug] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("preview");

  const [loading, setLoading] =
    useState(false);

  const generateBlog = async () => {
    if (
      !title ||
      !websiteUrl ||
      !keywords
    ) {
      toast.error(
        "Please fill all fields"
      );

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/blog/generate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            websiteUrl,
            keywords,
          }),
        }
      );

      const data =
        await response.json();

      setPlainText(
        data.plainText
      );

      setHtmlBlog(data.html);

      setMetaTitle(
        data.metaTitle
      );

      setMetaDescription(
        data.metaDescription
      );

      setMetaKeywords(
        data.metaKeywords
      );

      setFeaturedImage(
    data.featuredImage
    );

      setSlug(data.slug);
    } catch (error) {
      toast.error(
        "Failed to generate blog"
      );
    }

    setLoading(false);
  };

  const copyPlainText =
    async () => {
      await navigator.clipboard.writeText(
        plainText
      );

      toast.success(
        "Plain text copied"
      );
    };

  const copyHtml =
    async () => {
      await navigator.clipboard.writeText(
        htmlBlog
      );

      toast.success(
        "HTML copied"
      );
    };

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">
        SEO Blog Generator
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
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
        />

        <input
          type="text"
          placeholder="Website URL"
          value={websiteUrl}
          onChange={(e) =>
            setWebsiteUrl(
              e.target.value
            )
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
        />

        <input
          type="text"
          placeholder="Keywords separated by commas"
          value={keywords}
          onChange={(e) =>
            setKeywords(
              e.target.value
            )
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 outline-none"
        />

        <button
          onClick={generateBlog}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold cursor-pointer"
        >
          {loading
            ? "Generating..."
            : "Generate Blog"}
        </button>
      </div>

      {featuredImage && (
        <div className="mt-10">
            <img
            src={featuredImage}
            alt={title}
            className="w-full rounded-2xl border border-zinc-700"
            />
        </div>
        )}

      {(plainText ||
        htmlBlog) && (
        <>
          {/* SEO Meta Data */}
          <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-xl p-6 space-y-5">
            <h2 className="text-2xl font-bold">
              SEO Metadata
            </h2>

            <div>
              <h3 className="font-semibold mb-1">
                Meta Title
              </h3>

              <p className="text-zinc-300">
                {metaTitle}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                Meta Description
              </h3>

              <p className="text-zinc-300">
                {metaDescription}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                Meta Keywords
              </h3>

              <p className="text-zinc-300">
                {metaKeywords}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                Slug
              </h3>

              <p className="text-zinc-300">
                {slug}
              </p>
            </div>
          </div>

          {/* Blog Tabs */}
          <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">

            {/* Tabs */}
            <div className="flex border-b border-zinc-700">
              <button
                onClick={() =>
                  setActiveTab(
                    "preview"
                  )
                }
                className={`px-6 py-4 text-sm font-medium ${
                activeTab === "preview"
                    ? "bg-white text-black"
                    : "text-white"
                }`}
              >
                Plain Text
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    "html"
                  )
                }
                className={`px-6 py-4 text-sm font-medium ${
                activeTab === "html"
                    ? "bg-white text-black"
                    : "text-white"
                }`}
              >
                HTML Version
              </button>
            </div>

            {/* Plain Text */}
            {activeTab ===
              "preview" && (
              <div className="relative p-6">
                <button
                  onClick={
                    copyPlainText
                  }
                  className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-lg text-sm"
                >
                  Copy
                </button>

                <div className="whitespace-pre-wrap pt-12 leading-8 text-zinc-200">
                  {plainText}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={
                      copyPlainText
                    }
                    className="bg-white text-black px-4 py-2 rounded-lg text-sm"
                  >
                    Copy Plain Text
                  </button>
                </div>
              </div>
            )}

            {/* HTML */}
            {activeTab ===
              "html" && (
              <div className="relative p-6">
                <button
                  onClick={copyHtml}
                  className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-lg text-sm"
                >
                  Copy HTML
                </button>

                <textarea
                  value={htmlBlog}
                  readOnly
                  className="w-full h-[700px] bg-black text-green-400 rounded-xl p-5 outline-none font-mono text-sm"
                />

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={
                      copyHtml
                    }
                    className="bg-white text-black px-4 py-2 rounded-lg text-sm"
                  >
                    Copy HTML
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
