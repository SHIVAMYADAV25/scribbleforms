"use client";

import { trpc } from "~/trpc/client";

export default function Home() {
  const { data, isLoading } = trpc.health.check.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>{data?.status}</div>
    </main>
  );
}