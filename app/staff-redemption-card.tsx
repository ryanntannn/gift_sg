import { StaffWithRedemption } from "@/lib/get-staff-with-redemption";
import { redeemableGiftCount } from "@/lib/redeemable-gift-count";
import { PropsWithChildren, useEffect, useState } from "react";

export type RedemptionFormProps = {
  staffWithRedemption: StaffWithRedemption;
  redeemTeamGifts: (
    staffPassId: string,
    redeemAmount: number
  ) => Promise<number>;
};

function AmountFractionButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button className="w-full border rounded p-2 px-3" {...props}>
      {props.children}
    </button>
  );
}

export default function RedemptionForm({
  staffWithRedemption,
  redeemTeamGifts,
}: RedemptionFormProps) {
  const [giftClaimAmount, setGiftClaimAmount] = useState(
    staffWithRedemption.redeemableAmount
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGiftClaimAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    setGiftClaimAmount(parseInt(event.target.value));
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await redeemTeamGifts(staffWithRedemption.staffPassId, giftClaimAmount);
      setError(null);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setGiftClaimAmount(staffWithRedemption.redeemableAmount);
  }, [staffWithRedemption.redeemableAmount]);

  return (
    <div className="flex flex-col border p-3 rounded gap-3">
      <div>
        <div className="font-medium text-sm text-gray-500">STAFF PASS ID</div>
        <div className="font-bold font-mono">
          {staffWithRedemption.staffPassId}
        </div>
      </div>
      <div>
        <div className="font-medium text-sm text-gray-500">TEAM NAME</div>
        <div
          style={{ color: staffWithRedemption.teamName.toColor() }}
          className={`font-bold font-mono text-[${staffWithRedemption.teamName.toColor()}]`}>
          {staffWithRedemption.teamName}
        </div>
      </div>
      <div>
        <div className="font-medium text-sm text-gray-500">
          REDEMPTION STATUS
        </div>
        {staffWithRedemption.redeemableAmount <= 0 ? (
          <div className="text-red-600 font-mono font-bold">
            {staffWithRedemption.teamName} TEAM HAS REDEEMED ALL GIFTS
          </div>
        ) : (
          <div className="text-green-600 font-mono font-bold">
            ABLE TO REDEEM {staffWithRedemption.redeemableAmount} GIFTS
          </div>
        )}
      </div>{" "}
      {staffWithRedemption.redeemableAmount > 0 && (
        <div className="flex flex-col gap-2">
          <div className="font-medium text-sm text-gray-500">
            REDEEM GIFTS FOR TEAM {staffWithRedemption.teamName}
          </div>
          <form className="flex flex-row gap-1" onSubmit={onFormSubmit}>
            <input
              className="border rounded p-2"
              type="number"
              value={giftClaimAmount}
              onChange={onGiftClaimAmountChange}
              placeholder="Enter staff ID"
            />
            <button
              type="submit"
              className={`border rounded p-2 px-3 ${
                isLoading
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-blue-50"
              }`}
              disabled={isLoading}>
              Redeem
            </button>
          </form>
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex flex-row gap-1 w-full">
            <AmountFractionButton
              disabled={isLoading}
              onClick={() =>
                setGiftClaimAmount(
                  Math.floor(staffWithRedemption.redeemableAmount / 4)
                )
              }>
              1/4x
            </AmountFractionButton>
            <AmountFractionButton
              disabled={isLoading}
              onClick={() =>
                setGiftClaimAmount(
                  Math.floor(staffWithRedemption.redeemableAmount / 2)
                )
              }>
              1/2x
            </AmountFractionButton>
            <AmountFractionButton
              disabled={isLoading}
              onClick={() =>
                setGiftClaimAmount(staffWithRedemption.redeemableAmount)
              }>
              1x
            </AmountFractionButton>
          </div>
        </div>
      )}
    </div>
  );
}
