import { isValidClaimAmount } from "./is-valid-claim-amount";

describe("isValidClaimAmount", () => {
  it("should return true if claim amount is less than or equal to redeemable gift count", () => {
    const claimAmount = 10;
    const redeemableGiftCount = 15;
    const result = isValidClaimAmount(claimAmount, redeemableGiftCount);
    expect(result).toBe(true);
  });

  it("should return false if claim amount is greater than redeemable gift count", () => {
    const claimAmount = 20;
    const redeemableGiftCount = 15;
    const result = isValidClaimAmount(claimAmount, redeemableGiftCount);
    expect(result).toBe(false);
  });

  it("should return false if claim amount is less than or equal to 0", () => {
    const claimAmount = 0;
    const redeemableGiftCount = 15;
    const result = isValidClaimAmount(claimAmount, redeemableGiftCount);
    expect(result).toBe(false);
  });
});
