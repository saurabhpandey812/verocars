import { site } from "@/lib/constants/site";
export const whatsappLink = (msg: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
export const carEnquiryLink = (name: string) => whatsappLink(`Hello, I am interested in booking the ${name} for self-drive in Lucknow.`);
