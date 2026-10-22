import type { User } from "@/types/user";
import { demoUser } from "@/data/demo-account";

// Auth boundary. Replace the body with a real session lookup (cookie/JWT/Auth.js) later.
export async function getCurrentUser(): Promise<User | null> {
  return process.env.NEXT_PUBLIC_DEMO_ACCOUNT === "true" ? demoUser : null;
}
