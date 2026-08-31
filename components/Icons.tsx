import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export function ArrowRightIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></svg>;
}
export function PhoneIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M7.5 3.5 10 8 7.9 9.7c1.3 2.9 3.5 5.1 6.4 6.4L16 14l4.5 2.5-.8 3.2c-.2.8-.9 1.3-1.7 1.3C9.7 21 3 14.3 3 6c0-.8.5-1.5 1.3-1.7l3.2-.8Z"/></svg>;
}
export function MailIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
}
export function MapPinIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}
export function CalendarIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
}
export function CameraIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 7.5h3l1.4-2h7.2l1.4 2H20A1.5 1.5 0 0 1 21.5 9v9A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18V9A1.5 1.5 0 0 1 4 7.5Z"/><circle cx="12" cy="13.5" r="3.25"/></svg>;
}
export function BoxIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/></svg>;
}
export function HomeIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>;
}
export function BuildingIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="4" y="3" width="11" height="18" rx="1"/><path d="M15 8h5v13H9M8 7h3M8 11h3M8 15h3M18 12h1M18 16h1"/></svg>;
}
export function ShieldIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M12 3 4.5 6v5.5c0 4.7 3.1 7.9 7.5 9.5 4.4-1.6 7.5-4.8 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>;
}
export function ChatIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9h8M8 12h5"/></svg>;
}
export function WhatsAppIcon(props: IconProps) {
  return <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.89a11.9 11.9 0 0 0-3.478-8.416"/></svg>;
}
export function ClipboardIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h4"/></svg>;
}
export function TruckIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M3 6h11v10H3V6ZM14 10h4l3 3v3h-7v-6Z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>;
}
export function MenuIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 7h16"/><path className="menuMiddleV5" d="M4 12h16"/><path d="M4 17h16"/></svg>;
}
export function CloseIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m6 6 12 12M18 6 6 18"/></svg>;
}
export function UserIcon(props: IconProps) {
  return <svg {...base(props)}><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6"/></svg>;
}
export function ClockIcon(props: IconProps) {
  return <svg {...base(props)}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
}
export function CheckIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m5 12 4 4L19 6"/></svg>;
}
