"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Navbar } from "@/components/Navbar";
import { apiFetch } from "@/lib/api";

interface Project {
    id: string;
    name: string;
    description?: string;
}

interface CodeFile {
    id: string;
    filename: string;
    language: string;
    content: string;
    project_id: string;
}

interface Provider {
    id: string;
    name: string;
    base_url: string;
    model_name: string;
    is_default: boolean;
}

interface Review {
    id: string;
    project_id: string;
    provider_id: string | null;
    review_type: string;
    status: string;
    summary: string | null;
    raw_output: string | null;
}

interface Finding {
    id: string;
    severity: string;
    title: string;
    description: string;
    recommendation?: string;
    file_path?: string;
    line_number?: number;
}

export default function ProjectPage() {
    const params = useParams();

    const projectId = params.id as string;

    const [project, setProject] =
        useState<Project | null>(null);

    const [files, setFiles] =
        useState<CodeFile[]>([]);

    const [providers, setProviders] =
        useState<Provider[]>([]);

    const [reviews, setReviews] =
        useState<Review[]>([]);

    const [findings, setFindings] =
        useState<Finding[]>([]);

    const [selectedProvider, setSelectedProvider] =
        useState("");

    const [reviewType, setReviewType] =
        useState("security");

    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [uploading, setUploading] =
        useState(false);

    const [runningReview, setRunningReview] =
        useState(false);

    const loadProject = async () => {
        try {
            const data = await apiFetch(
                `/api/projects/${projectId}`
            );

            setProject(data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadFiles = async () => {
        try {
            const data = await apiFetch(
                `/api/projects/${projectId}/files`
            );

            setFiles(data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadProviders = async () => {
        try {
            const data = await apiFetch(
                "/api/providers"
            );

            setProviders(data);

            const defaultProvider =
                data.find(
                    (provider: Provider) =>
                        provider.is_default
                );

            if (defaultProvider) {
                setSelectedProvider(
                    defaultProvider.id
                );
            } else if (data.length > 0) {
                setSelectedProvider(
                    data[0].id
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loadReviews = async () => {
        try {
            const data = await apiFetch(
                `/api/projects/${projectId}/reviews`
            );

            setReviews(data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadFindings = async (
        reviewId: string
    ) => {
        try {
            const data = await apiFetch(
                `/api/projects/${projectId}/reviews/${reviewId}/findings`
            );

            setFindings(data);
        } catch (error) {
            console.error(error);
        }
    };

    const uploadZip = async () => {
        if (!selectedFile) {
            alert("Select a ZIP file");
            return;
        }

        try {
            setUploading(true);

            const token =
                localStorage.getItem("token");

            const formData = new FormData();

            formData.append(
                "file",
                selectedFile
            );

            const response = await fetch(
                `http://127.0.0.1:8000/api/projects/${projectId}/upload`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Upload failed"
                );
            }

            await loadFiles();

            alert(
                "Repository imported successfully"
            );
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const runReview = async () => {
        if (!selectedProvider) {
            alert("Select a provider");
            return;
        }

        try {
            setRunningReview(true);

            await apiFetch(
                `/api/projects/${projectId}/reviews`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        provider_id:
                            selectedProvider,
                        review_type: reviewType,
                    }),
                }
            );

            await loadReviews();

            alert(
                "Review completed successfully"
            );
        } catch (error) {
            console.error(error);
            alert("Review failed");
        } finally {
            setRunningReview(false);
        }
    };

    useEffect(() => {
        if (!projectId) return;

        Promise.all([
            loadProject(),
            loadFiles(),
            loadProviders(),
            loadReviews(),
        ]).finally(() =>
            setLoading(false)
        );
    }, [projectId]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                Loading...
            </main>
        );
    }
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[#f8f8f8]">
                <div className="max-w-7xl mx-auto px-6 py-12">

                    {/* Header */}
                    <div className="mb-10">
                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-[#FF6B35]">
                            Project Workspace
                        </span>

                        <h1 className="mt-5 text-5xl font-extrabold text-gray-900">
                            {project?.name}
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-gray-500">
                            {project?.description ||
                                "No description provided"}
                        </p>
                    </div>

                    {/* Top Grid */}
                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* Upload ZIP */}
                        <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Upload Project ZIP
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Import your repository for analysis
                            </p>

                            <input
                                type="file"
                                accept=".zip"
                                onChange={(e) =>
                                    setSelectedFile(
                                        e.target.files?.[0] || null
                                    )
                                }
                                className="
                  mt-6
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  p-4
                  text-gray-700
                "
                            />

                            <button
                                onClick={uploadZip}
                                disabled={uploading}
                                className="
                  mt-6
                  rounded-full
                  bg-[#FF6B35]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#E85A29]
                  disabled:opacity-50
                "
                            >
                                {uploading
                                    ? "Uploading..."
                                    : "Upload ZIP"}
                            </button>
                        </div>

                        {/* Providers */}
                        <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900">
                                AI Provider
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Select provider used for reviews
                            </p>

                            <select
                                value={selectedProvider}
                                onChange={(e) =>
                                    setSelectedProvider(
                                        e.target.value
                                    )
                                }
                                className="
                  mt-6
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-4
                  text-gray-900
                "
                            >
                                <option value="">
                                    Select Provider
                                </option>

                                {providers.map(
                                    (provider) => (
                                        <option
                                            key={provider.id}
                                            value={provider.id}
                                        >
                                            {provider.name} (
                                            {provider.model_name})
                                        </option>
                                    )
                                )}
                            </select>

                            {providers.length === 0 && (
                                <p className="mt-4 text-sm text-red-500">
                                    No providers found.
                                    Create one first.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Files */}
                    <div className="mt-8 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Project Files
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Files imported into the project
                        </p>

                        <div className="mt-6 space-y-3">
                            {files.length === 0 ? (
                                <p className="text-gray-500">
                                    No files uploaded yet.
                                </p>
                            ) : (
                                files.map((file) => (
                                    <div
                                        key={file.id}
                                        className="
                      rounded-2xl
                      border
                      border-gray-200
                      p-4
                    "
                                    >
                                        <p className="font-semibold text-gray-900">
                                            {file.filename}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {file.language}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Review Section */}
                    <div className="mt-8 grid gap-8 lg:grid-cols-2">

                        {/* Run Review */}
                        <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Run AI Review
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Analyze your project
                            </p>

                            <select
                                value={reviewType}
                                onChange={(e) =>
                                    setReviewType(
                                        e.target.value
                                    )
                                }
                                className="
                  mt-6
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-4
                  text-gray-900
                "
                            >
                                <option value="security">
                                    Security Review
                                </option>

                                <option value="performance">
                                    Performance Review
                                </option>

                                <option value="quality">
                                    Code Quality Review
                                </option>

                                <option value="architecture">
                                    Architecture Review
                                </option>

                                <option value="documentation">
                                    Documentation Review
                                </option>
                            </select>

                            <button
                                onClick={runReview}
                                disabled={runningReview}
                                className="
                  mt-6
                  rounded-full
                  bg-[#FF6B35]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#E85A29]
                  disabled:opacity-50
                "
                            >
                                {runningReview
                                    ? "Running..."
                                    : "Run Review"}
                            </button>
                        </div>

                        {/* Reviews */}
                        <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Review History
                            </h2>

                            <div className="mt-6 space-y-3">
                                {reviews.length === 0 ? (
                                    <p className="text-gray-500">
                                        No reviews found.
                                    </p>
                                ) : (
                                    reviews.map((review) => (
                                        <button
                                            key={review.id}
                                            onClick={() =>
                                                loadFindings(
                                                    review.id
                                                )
                                            }
                                            className="
                        w-full
                        rounded-2xl
                        border
                        border-gray-200
                        p-4
                        text-left
                        hover:border-[#FF6B35]
                      "
                                        >
                                            <p className="font-semibold text-gray-900">
                                                {review.review_type}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {review.status}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-700">
                                                {review.summary}
                                            </p>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Findings */}
                    <div className="mt-8 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Review Findings
                        </h2>

                        <div className="mt-6 space-y-4">
                            {findings.length === 0 ? (
                                <p className="text-gray-500">
                                    Select a review to view findings.
                                </p>
                            ) : (
                                findings.map((finding) => (
                                    <div
                                        key={finding.id}
                                        className="
                      rounded-2xl
                      border
                      border-orange-200
                      bg-orange-50
                      p-5
                    "
                                    >
                                        <span className="text-xs font-semibold uppercase text-orange-600">
                                            {finding.severity}
                                        </span>

                                        <h3 className="mt-2 text-lg font-bold text-gray-900">
                                            {finding.title}
                                        </h3>

                                        <p className="mt-2 text-gray-700">
                                            {finding.description}
                                        </p>

                                        {finding.recommendation && (
                                            <p className="mt-3 text-sm text-gray-600">
                                                <strong>
                                                    Recommendation:
                                                </strong>{" "}
                                                {
                                                    finding.recommendation
                                                }
                                            </p>
                                        )}

                                        {finding.file_path && (
                                            <p className="mt-2 text-sm text-gray-500">
                                                File:{" "}
                                                {finding.file_path}
                                            </p>
                                        )}

                                        {finding.line_number && (
                                            <p className="text-sm text-gray-500">
                                                Line:{" "}
                                                {finding.line_number}
                                            </p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}