import React from "react";

export default function ResponseCardLoading() {
  return (
    <section className="mt-6 flex flex-col space-x-4 p-4 border rounded-lg w-1/2 animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="border p-2 rounded-lg bg-gray-100 h-24"></div>
    </section>
  );
}
