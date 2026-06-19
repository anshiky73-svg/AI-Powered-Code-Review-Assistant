"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Navbar } from "@/components/Navbar";

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
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="mb-12">
            <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-[#FF6B35]">
              Dashboard
            </span>

            <h1 className="mt-5 text-5xl font-extrabold text-gray-900">
              Your Projects
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-500">
              Manage projects, upload source code, run AI reviews,
              and analyze findings from one central dashboard.
            </p>
          </div>

          {/* Create Project */}
          <div className="mb-12 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              Create New Project
            </h2>

            <p className="mt-2 text-gray-500">
              Start a new AI code review workspace.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              <input
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  focus:border-[#FF6B35]
                "
              />

              <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                  outline-none
                  focus:border-[#FF6B35]
                "
              />
            </div>

            <button
              onClick={createProject}
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
              "
            >
              Create Project
            </button>
          </div>

          {/* Projects */}
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Active Projects
              </h2>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                {projects.length} Projects
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  No Projects Yet
                </h3>

                <p className="mt-3 text-gray-500">
                  Create your first project to start reviewing code.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="
                      rounded-[28px]
                      border
                      border-gray-200
                      bg-white
                      p-6
                      shadow-sm
                      transition
                      hover:-translate-y-1
                      hover:shadow-md
                    "
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="block"
                    >
                      <h3 className="text-xl font-bold text-gray-900">
                        {project.name}
                      </h3>

                      <p className="mt-3 text-sm text-gray-500">
                        {project.description ||
                          "No description provided"}
                      </p>
                    </Link>

                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/projects/${project.id}`}
                        className="
                          flex-1
                          rounded-full
                          bg-[#FF6B35]
                          px-4
                          py-2
                          text-center
                          font-medium
                          text-white
                        "
                      >
                        Open
                      </Link>

                      <button
                        onClick={() =>
                          deleteProject(project.id)
                        }
                        className="
                          rounded-full
                          border
                          border-red-200
                          px-4
                          py-2
                          text-red-600
                          hover:bg-red-50
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  );
}