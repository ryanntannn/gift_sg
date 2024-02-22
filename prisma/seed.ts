import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as fs from "fs";

/**
 * Removes line endings from a given string.
 * @param str - The input string.
 * @returns The string with line endings removed.
 */
function handleLineEndings(str: string) {
  return str.replace(/\n|\r/g, "");
}

async function main() {
  const filePath = "./data/staff-id-to-team-mapping-long.csv";
  const fileData = fs.readFileSync(filePath, "utf-8");
  const rows = fileData
    .split("\n")
    .splice(1)
    .map((row) => {
      const [staffPassId, teamName, createdAt] = row
        .split(",")
        .map(handleLineEndings);

      return {
        staffPassId,
        teamName,
        createdAt: new Date(parseInt(createdAt)),
      };
    });

  await prisma.staff.createMany({
    data: rows,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
