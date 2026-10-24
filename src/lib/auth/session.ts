import type { User } from "@/types/user";
import { publicEnv } from "@/config";
import { demoUser } from "@/data/demo-account";

// Auth boundary. Replace the body with a real session lookup (cookie/JWT/Auth.js) later.
export async function getCurrentUser(): Promise<User | null> {
  return publicEnv.demoAccount ? demoUser : null;
}
