/** Shared field validators used across auth, contact and booking forms. */

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MOBILE_RE = /^(\+91[\s-]?)?[6-9]\d{9}$/;
const NAME_RE = /^[a-zA-Z][a-zA-Z\s'.-]{1,59}$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function required(value: string, label = "This field") {
  return value.trim() ? undefined : `${label} is required.`;
}

export function validateName(value: string, label = "Name") {
  const t = value.trim();
  if (!t) return `${label} is required.`;
  if (t.length < 2) return `Enter your full ${label.toLowerCase()}.`;
  if (!NAME_RE.test(t)) return `${label} can only include letters, spaces and basic punctuation.`;
  return undefined;
}

export function validateEmail(value: string) {
  const t = value.trim();
  if (!t) return "Email is required.";
  if (!EMAIL_RE.test(t)) return "Enter a valid email address (e.g. name@example.com).";
  return undefined;
}

export function validateMobile(value: string) {
  const t = value.replace(/\s/g, "");
  if (!t) return "Mobile number is required.";
  if (!MOBILE_RE.test(t)) return "Enter a valid 10-digit Indian mobile number.";
  return undefined;
}

/** Email or Indian mobile — for login identifier. */
export function validateIdentifier(value: string) {
  const t = value.trim();
  if (!t) return "Email or mobile is required.";
  const compact = t.replace(/\s/g, "");
  if (EMAIL_RE.test(t) || MOBILE_RE.test(compact)) return undefined;
  return "Enter a valid email or 10-digit mobile number.";
}

export function validatePassword(value: string, { required: need = true }: { required?: boolean } = {}) {
  if (!value) return need ? "Password is required." : undefined;
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!PASSWORD_RE.test(value)) return "Password must include at least one letter and one number.";
  return undefined;
}

export function validatePasswordConfirm(password: string, confirm: string) {
  if (!confirm) return "Confirm your password.";
  if (confirm !== password) return "Passwords do not match.";
  return undefined;
}

export function validateMessage(value: string, { min = 10, max = 1000, label = "Message" } = {}) {
  const t = value.trim();
  if (!t) return `${label} is required.`;
  if (t.length < min) return `${label} must be at least ${min} characters.`;
  if (t.length > max) return `${label} must be under ${max} characters.`;
  return undefined;
}

export function validateLicence(value: string) {
  const t = value.trim().toUpperCase();
  if (!t) return "Driving licence number is required.";
  if (t.length < 8 || t.length > 20) return "Enter a valid driving licence number.";
  if (!/^[A-Z0-9\-\s]+$/.test(t)) return "Licence number can only include letters, numbers and hyphens.";
  return undefined;
}
