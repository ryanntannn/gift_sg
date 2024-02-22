import getStaff from "@/query/get-staff";
import StaffIdInput from "./staff-id-input";
import getTeamRedemptionsAndCount from "@/query/get-teeam-redemptions-and-count";
import RedemptionPage from "./redemption-page";
import { getStaffWithRedemption } from "@/lib/get-staff-with-redemption";
import redeemTeamGifts from "@/lib/redeem-team-gifts";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-screen h-screen overflow-hidden">
      <div className="text-3xl font-medium">🎁 GiftSG</div>
      <div>Check staff ID to redeem team gift</div>
      <RedemptionPage
        getStaffWithRedemption={getStaffWithRedemption}
        redeemTeamGifts={redeemTeamGifts}
      />
    </div>
  );
}
