import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

/**
 * Retrieves a staff member with the given staffPassId.
 * @param staffPassId - The unique identifier of the staff member.
 * @returns A Promise that resolves to the staff member object, or null if not found.
 */
export default async function getStaff(staffPassId: string) {
  return await prisma.staff.findUnique({
    where: {
      staffPassId,
    },
  });
}
