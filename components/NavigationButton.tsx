import cx from "classnames";
import { useRouter } from "next/router";

export interface NavigationButtonProps {
  onClick(): void;
  href: string;
  title: string;
  border: boolean;
}

export default function NavigationButton({
  onClick,
  href,
  title,
  border,
}: NavigationButtonProps) {
  const classes = cx(
    "text-center text-lg font-extrabold py-5 w-full shadow-sm rounded-full",
    border
      ? "bg-white text-black border-black border-2 "
      : "bg-black text-white"
  );

  const router = useRouter();

  return (
    <button
      onClick={() => {
        onClick();
        router.push(href);
      }}
      className={classes}
    >
      {title}
    </button>
  );
}
