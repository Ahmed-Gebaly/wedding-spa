import type { AnchorHTMLAttributes, ReactNode } from "react";

type LuxuryActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export default function LuxuryActionLink({
  className = "",
  children,
  ...props
}: LuxuryActionLinkProps) {
  return (
    <a {...props} className={`luxury-action ${className}`.trim()}>
      {children}
    </a>
  );
}
