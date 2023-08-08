import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-1/3 p-4 border rounded">{children}</div>
    </div>
  );
}
