import Image from "next/image";
import Link from "next/link";

export default function Logo({ footer = false }: { dark?: boolean; footer?: boolean }) {
  return (
    <Link href="/" className={`brand ${footer ? "brand--footer" : ""}`} aria-label="On The Move Again home">
      <Image
        className="brand__asset brand__asset--full"
        src="/brand/otma-logo.png"
        alt="On The Move Again - Making your move a breeze"
        width={1250}
        height={765}
        priority={!footer}
      />
      <Image
        className="brand__asset brand__asset--compact"
        src="/brand/otma-logo-compact.png"
        alt=""
        width={1175}
        height={602}
      />
    </Link>
  );
}
