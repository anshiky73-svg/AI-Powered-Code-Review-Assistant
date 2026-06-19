"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Project {
    id: string;
    name: string;
    description?: string;
}

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const loadProjects = async () => {
        try {
            const data = await apiFetch("/api/projects/");
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    const createProject = async () => {
        try {
            await apiFetch("/api/projects/", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    description,
                }),
            });

            setName("");
            setDescription("");

            await loadProjects();
        } catch (error) {
            console.error(error);
            alert("Failed to create project");
        }
    };

    const deleteProject = async (projectId: string) => {
        try {
            await apiFetch(`/api/projects/${projectId}`, {
                method: "DELETE",
            });

            await loadProjects();
        } catch (error) {
            console.error(error);
            alert("Failed to delete project");
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <main className="p-10 min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="flex flex-col gap-4 max-w-md mb-10">
                <input
                    className="border border-gray-700 bg-gray-900 text-white p-3 rounded"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="border border-gray-700 bg-gray-900 text-white p-3 rounded"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button
                    onClick={createProject}
                    className="bg-blue-600 p-3 rounded"
                >
                    Create Project
                </button>
            </div>

            <h2 className="text-2xl font-semibold mb-4">
                Projects
            </h2>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="border border-gray-700 p-4 rounded"
                    >
                        <a
                            href={`/projects/${project.id}`}
                            className="text-xl font-bold text-blue-400"
                        >
                            {project.name}
                        </a>

                        <p>
                            {project.description}
                        </p>

                        <button
                            onClick={() =>
                                deleteProject(project.id)
                            }
                            className="bg-red-600 px-3 py-2 rounded mt-3"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}