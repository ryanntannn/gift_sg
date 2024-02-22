/**
 * Checks if the claim amount is valid based on the redeemable gift count.
 * @param claimAmount The claim amount to be checked.
 * @param redeemableGiftCount The number of redeemable gifts.
 * @returns True if the claim amount is valid, false otherwise.
 */
export function isValidClaimAmount(
  claimAmount: number,
  redeemableGiftCount: number
) {
  return claimAmount <= redeemableGiftCount && claimAmount > 0;
}
