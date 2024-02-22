import { redeemableGiftCount } from "./redeemable-gift-count";
import { Redemption } from "@prisma/client";

describe("redeemableGiftCount", () => {
  it("should return the correct count of redeemable gifts", () => {
    const redemptions: Redemption[] = [
      {
        id: 1,
        staffPassId: "ABC",
        teamName: "XXX",
        amountRedeemed: 1,
        createdAt: new Date(),
      },
      {
        id: 1,
        staffPassId: "ABC",
        teamName: "XXX",
        amountRedeemed: 1,
        createdAt: new Date(),
      },
      {
        id: 1,
        staffPassId: "ABC",
        teamName: "XXX",
        amountRedeemed: 2,
        createdAt: new Date(),
      },
    ];
    const teamCount = 10;

    const result = redeemableGiftCount(redemptions, teamCount);

    expect(result).toBe(6);
  });

  it("should return input teamCount if there are no redemptions", () => {
    // Arrange
    const redemptions: Redemption[] = [];
    const teamCount = 5;

    // Act
    const result = redeemableGiftCount(redemptions, teamCount);

    expect(result).toBe(5);
  });

  it("should return 0 if there are no team members or redemptions", () => {
    // Arrange
    const redemptions: Redemption[] = [];
    const teamCount = 0;

    // Act
    const result = redeemableGiftCount(redemptions, teamCount);

    expect(result).toBe(0);
  });
});
