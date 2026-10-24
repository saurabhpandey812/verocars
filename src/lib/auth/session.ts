import type { User } from "@/types/user";
import { publicEnv } from "@/config";
import { demoUser } from "@/data/demo-account";
import { getSessionCustomer } from "@/server/auth";

export async function getCurrentUser(): Promise<User | null> {
  if (publicEnv.demoAccount) return demoUser;
  const c = await getSessionCustomer();
  if (!c) return null;
  return {
    id: c.id,
    fullName: c.fullName,
    mobile: c.mobile,
    email: c.email,
    role: "customer",
    createdAt: c.createdAt,
  };
}
