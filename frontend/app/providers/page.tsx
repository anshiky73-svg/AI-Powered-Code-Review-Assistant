"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/Navbar";
import { apiFetch } from "@/lib/api";

interface Provider {
  id: string;
  name: string;
  base_url: string;
  model_name: string;
  is_default: boolean;
}

export default function ProvidersPage() {
  const [providers, setProviders] =
    useState<Provider[]>([]);

  const [name, setName] =
    useState("");

  const [baseUrl, setBaseUrl] =
    useState("http://localhost:1234/v1");

  const [modelName, setModelName] =
    useState("");

  const [apiKey, setApiKey] =
    useState("");

  const [isDefault, setIsDefault] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  const loadProviders = async () => {
    try {
      const data = await apiFetch(
        "/api/providers"
      );

      setProviders(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load providers");
    }
  };

  const createProvider = async () => {
    if (
      !name ||
      !baseUrl ||
      !modelName
    ) {
      alert(
        "Please fill all required fields"
      );
      return;
    }

    try {
      setCreating(true);

      await apiFetch(
        "/api/providers",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            base_url: baseUrl,
            api_key: apiKey,
            model_name: modelName,
            is_default: isDefault,
          }),
        }
      );

      setName("");
      setModelName("");
      setApiKey("");
      setIsDefault(false);

      await loadProviders();

      alert(
        "Provider created successfully"
      );
    } catch (error) {
      console.error(error);
      alert("Failed to create provider");
    } finally {
      setCreating(false);
    }
  };

  const deleteProvider = async (
    providerId: string
  ) => {
    const confirmed =
      window.confirm(
        "Delete this provider?"
      );

    if (!confirmed) return;

    try {
      await apiFetch(
        `/api/providers/${providerId}`,
        {
          method: "DELETE",
        }
      );

      await loadProviders();
    } catch (error) {
      console.error(error);
      alert("Failed to delete provider");
    }
  };

  useEffect(() => {
    loadProviders().finally(() =>
      setLoading(false)
    );
  }, []);

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
              AI Configuration
            </span>

            <h1 className="mt-5 text-5xl font-extrabold text-gray-900">
              AI Providers
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-500">
              Manage AI providers used for
              code reviews. Connect LM Studio
              or OpenAI-compatible APIs.
            </p>
          </div>

          {/* Create Provider */}
          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              Add Provider
            </h2>

            <p className="mt-2 text-gray-500">
              Configure a new AI model endpoint.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              <input
                placeholder="Provider Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                "
              />

              <input
                placeholder="Base URL"
                value={baseUrl}
                onChange={(e) =>
                  setBaseUrl(e.target.value)
                }
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                "
              />

              <input
                placeholder="Model Name"
                value={modelName}
                onChange={(e) =>
                  setModelName(
                    e.target.value
                  )
                }
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                "
              />

              <input
                placeholder="API Key (optional)"
                value={apiKey}
                onChange={(e) =>
                  setApiKey(
                    e.target.value
                  )
                }
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-gray-900
                "
              />

            </div>

            <div className="mt-6 flex items-center gap-3">

              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) =>
                  setIsDefault(
                    e.target.checked
                  )
                }
              />

              <label className="text-gray-700">
                Set as default provider
              </label>

            </div>

            <button
              onClick={createProvider}
              disabled={creating}
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
              {creating
                ? "Creating..."
                : "Add Provider"}
            </button>

          </div>

          {/* Providers List */}
          <div className="mt-10">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-3xl font-bold text-gray-900">
                Configured Providers
              </h2>

              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600">
                {providers.length} Providers
              </span>

            </div>

            {providers.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-12 text-center">

                <h3 className="text-xl font-semibold text-gray-900">
                  No Providers Configured
                </h3>

                <p className="mt-3 text-gray-500">
                  Add your first provider to
                  start AI reviews.
                </p>

              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {providers.map(
                  (provider) => (
                    <div
                      key={provider.id}
                      className="
                        rounded-[28px]
                        border
                        border-gray-200
                        bg-white
                        p-6
                        shadow-sm
                      "
                    >

                      <div className="flex items-start justify-between">

                        <h3 className="text-xl font-bold text-gray-900">
                          {provider.name}
                        </h3>

                        {provider.is_default && (
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-[#FF6B35]">
                            Default
                          </span>
                        )}

                      </div>

                      <p className="mt-4 text-sm text-gray-500">
                        Model
                      </p>

                      <p className="font-medium text-gray-900">
                        {provider.model_name}
                      </p>

                      <p className="mt-4 text-sm text-gray-500">
                        Endpoint
                      </p>

                      <p className="break-all text-sm text-gray-700">
                        {provider.base_url}
                      </p>

                      <button
                        onClick={() =>
                          deleteProvider(
                            provider.id
                          )
                        }
                        className="
                          mt-6
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
                  )
                )}

              </div>
            )}

          </div>

        </div>
      </main>
    </>
  );
}