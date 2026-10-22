import { type FieldErrors, validateEmail, validateMessage, validateMobile, validateName } from "./common";

export function validateContact(v: { name: string; email: string; mobile: string; message: string }) {
  const e: FieldErrors<"name" | "email" | "mobile" | "message"> = {};
  const name = validateName(v.name);
  const email = validateEmail(v.email);
  const mobile = validateMobile(v.mobile);
  const message = validateMessage(v.message, { min: 10, max: 1000 });
  if (name) e.name = name;
  if (email) e.email = email;
  if (mobile) e.mobile = mobile;
  if (message) e.message = message;
  return e;
}
