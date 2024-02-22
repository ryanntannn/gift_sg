"use server";

import { getStaffWithRedemption } from "./get-staff-with-redemption";
import { prisma } from "@/query/prisma";
import { isValidClaimAmount } from "./is-valid-claim-amount";

/**
 * Redeems team gifts for a staff member.
 *
 * @param staffPassId - The ID of the staff member's pass.
 * @param redeemAmount - The amount to redeem from the staff member's redeemable amount.
 * @returns The remaining redeemable amount after the redemption.
 * @throws Error if the redeemAmount is invalid.
 */
export default async function redeemTeamGifts(
  staffPassId: string,
  redeemAmount: number
) {
  const staffWithRedemption = await getStaffWithRedemption(staffPassId);

  // Check if the redeemAmount is valid before proceeding
  if (!isValidClaimAmount(redeemAmount, staffWithRedemption.redeemableAmount)) {
    throw new Error("Invalid Amount. Please try again.");
  }

  await prisma.redemption.create({
    data: {
      staffPassId,
      teamName: staffWithRedemption.teamName,
      amountRedeemed: redeemAmount,
    },
  });

  return staffWithRedemption.redeemableAmount - redeemAmount;
}
