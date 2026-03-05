import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { BUILD_ID } from "@/config/build";
import { navItems } from "@/config/nav";

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];

function buildFooterColumns() {
  return navItems.map((item) => ({
    heading: item.label,
    links: item.groups
      ? item.groups.flatMap((g) =>
          g.links.map((l) => ({ label: l.label, href: l.href })),
        )
      : [{ label: item.label, href: item.href }],
  }));
}

const footerColumns = buildFooterColumns();

export function Footer() {
  return (
    <footer className="bg-muted/50 relative">
      <div className="section-separator" aria-hidden="true" />
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <Link href="/" className="flex items-center" aria-label="ZUUZ home">
                <Image
                  src="/brand/zuuz-logo.png"
                  alt="ZUUZ"
                  width={90}
                  height={27}
                  className="h-6 w-auto"
                />
              </Link>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
                Short brand description placeholder.
              </p>
              <div className="mt-4 flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={s.label}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Generated columns */}
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {col.heading}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.slice(0, 6).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ZUUZ, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
        <div className="text-[10px] text-muted-foreground/40 mt-4 text-center">BUILD: {BUILD_ID}</div>
      </Container>
    </footer>
  );
}
