"use client";

import StaffIdInput from "./staff-id-input";
import { useState } from "react";
import { StaffWithRedemption } from "@/lib/get-staff-with-redemption";
import RedemptionForm from "./staff-redemption-card";

export type RedemptionPageProps = {
  getStaffWithRedemption: (staffId: string) => Promise<StaffWithRedemption>;
  redeemTeamGifts: (
    staffPassId: string,
    redeemAmount: number
  ) => Promise<number>;
};

export default function RedemptionPage({
  getStaffWithRedemption,
  redeemTeamGifts,
}: RedemptionPageProps) {
  const [staffWithRedemption, setStaffWithRedemption] =
    useState<StaffWithRedemption | null>(null);

  const onRedeemTeamGifts = async (
    staffPassId: string,
    redeemAmount: number
  ) => {
    const newRedeemableAmount = await redeemTeamGifts(
      staffPassId,
      redeemAmount
    );
    setStaffWithRedemption((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        redeemableAmount: newRedeemableAmount,
      };
    });

    return newRedeemableAmount;
  };

  return (
    <div className="flex flex-col gap-3">
      <StaffIdInput
        getStaffWithRedemption={getStaffWithRedemption}
        setStaffWithRedemption={setStaffWithRedemption}
      />
      {staffWithRedemption && (
        <RedemptionForm
          staffWithRedemption={staffWithRedemption}
          redeemTeamGifts={onRedeemTeamGifts}
        />
      )}
    </div>
  );
}
