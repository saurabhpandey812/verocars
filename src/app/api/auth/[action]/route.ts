import { NextResponse } from "next/server";

// Placeholder for login / register / forgot-password. Wire to real auth + MySQL later.
export async function POST() {
  return NextResponse.json({ message: "Sign-in is not connected yet. It will be enabled when the customer database is added." }, { status: 501 });
}
