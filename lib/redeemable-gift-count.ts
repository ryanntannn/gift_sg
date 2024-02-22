import { Redemption } from "@prisma/client";

/**
 * Calculates the number of redeemable gifts based on the given redemptions and team count.
 * @param redemptions - An array of Redemption objects representing the redemptions made.
 * @param teamCount - The total number of teams.
 * @returns The number of redeemable gifts.
 */
export function redeemableGiftCount(
  redemptions: Redemption[],
  teamCount: number
) {
  return redemptions.reduce((acc, redemption) => {
    return acc - redemption.amountRedeemed;
  }, teamCount);
}
