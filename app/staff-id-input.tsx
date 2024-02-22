"use client";

import { Redemption, Staff } from "@prisma/client";
import { useState } from "react";
import "../util/color-to-string.extensions";
import { StaffWithRedemption } from "@/lib/get-staff-with-redemption";

export type StaffIdInputProps = {
  getStaffWithRedemption: (staffId: string) => Promise<StaffWithRedemption>;
  setStaffWithRedemption: (
    staffWithRedemption: StaffWithRedemption | null
  ) => void;
};

export default function StaffIdInput({
  getStaffWithRedemption,
  setStaffWithRedemption,
}: StaffIdInputProps) {
  const [staffId, setStaffId] = useState("MANAGER_XJ82E6DN4BMQ");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onStaffIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffId(event.target.value);
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await getStaffWithRedemption(staffId);
      setError(null);
      setStaffWithRedemption(await getStaffWithRedemption(staffId));
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      setStaffWithRedemption(null);
    }
    setIsLoading(false);
  };

  return (
    <>
      <form className="flex flex-row gap-1" onSubmit={onFormSubmit}>
        <input
          className="border rounded p-2"
          value={staffId}
          onChange={onStaffIdInputChange}
          placeholder="Enter staff ID"
        />
        <button
          type="submit"
          className={`border rounded p-2 px-3 ${
            isLoading ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-blue-50"
          }`}
          disabled={isLoading}>
          Check
        </button>
      </form>
      {error && <div className="text-red-600">{error}</div>}
    </>
  );
}
