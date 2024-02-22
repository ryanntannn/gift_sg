"use server";

import getStaff from "@/query/get-staff";
import getTeamRedemptionsAndCount from "@/query/get-teeam-redemptions-and-count";
import { redeemableGiftCount } from "./redeemable-gift-count";
import { Staff } from "@prisma/client";

/**
 * Retrieves the staff information along with the redemption details.
 * @param staffPassId - The ID of the staff pass.
 * @returns A promise that resolves to an object containing the staff information, redeemable amount, and team count.
 * @throws An error if the staff is not found.
 */
export async function getStaffWithRedemption(staffPassId: string) {
  const staff = await getStaff(staffPassId);
  if (!staff) throw new Error("Staff not found");

  const teamName = staff.teamName;
  const { redemptions, teamCount } = await getTeamRedemptionsAndCount(teamName);

  const redeemableAmount = redeemableGiftCount(redemptions, teamCount);

  return {
    ...staff,
    redeemableAmount,
    teamCount,
  } satisfies StaffWithRedemption;
}

export type StaffWithRedemption = Staff & {
  teamCount: number;
  redeemableAmount: number;
};
