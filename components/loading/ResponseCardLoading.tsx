import React from "react";
function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}
export default function ResponseCardLoading() {
  return (
    <section className="mt-6 flex flex-col space-x-4 p-4 border rounded-lg w-1/2 animate-pulse">
      <Spinner />
    </section>
  );
}
