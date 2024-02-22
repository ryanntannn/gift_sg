import { prisma } from "./prisma";

/**
 * Retrieves the redemption and team count for a given team name.
 * @param teamName - The name of the team.
 * @returns An object containing the redemption and team count.
 */
export default async function getTeamRedemptionsAndCount(teamName: string) {
  const [redemptions, teamCount] = await prisma.$transaction([
    prisma.redemption.findMany({
      where: {
        teamName,
      },
    }),
    prisma.staff.count({
      where: {
        teamName,
      },
    }),
  ]);

  return {
    redemptions,
    teamCount,
  };
}
