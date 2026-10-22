import {
  type FieldErrors,
  validateEmail,
  validateIdentifier,
  validateMobile,
  validateName,
  validatePassword,
  validatePasswordConfirm,
} from "./common";

export type { FieldErrors };

export function validateLogin(v: { identifier: string; password: string }) {
  const e: FieldErrors<"identifier" | "password"> = {};
  const id = validateIdentifier(v.identifier);
  if (id) e.identifier = id;
  if (!v.password) e.password = "Password is required.";
  return e;
}

export function validateRegister(v: {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  confirm: string;
}) {
  const e: FieldErrors<"fullName" | "mobile" | "email" | "password" | "confirm"> = {};
  const name = validateName(v.fullName, "Full name");
  const mobile = validateMobile(v.mobile);
  const email = validateEmail(v.email);
  const password = validatePassword(v.password);
  const confirm = validatePasswordConfirm(v.password, v.confirm);
  if (name) e.fullName = name;
  if (mobile) e.mobile = mobile;
  if (email) e.email = email;
  if (password) e.password = password;
  if (confirm) e.confirm = confirm;
  return e;
}

export function validateEmailOnly(email: string) {
  const msg = validateEmail(email);
  return msg ? { email: msg } : {};
}
