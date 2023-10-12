import { Dispatch, SetStateAction } from "react";
import cx from "classnames";

interface ButtonProps {
  title: string;
  index: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  memberImg: string;
  memberName: string;
}

export default function SelectButton({
  title,
  index,
  setShowModal,
  memberImg,
  memberName,
}: ButtonProps) {
  return (
    <button
      onClick={() => setShowModal(true)}
      className="flex flex-col items-center p-1 space-y-3 cursor-pointer text-gray-600 hover:border-black hover:text-black justify-center"
    >
      <p className="text-xs font-extrabold py-0.5 px-1 rounded-xl text-black">
        {title}
      </p>
      {memberImg !== "" && memberName !== "" ? (
        <div>
          <img
            className="object-cover object-center rounded-md aspect-square"
            src={memberImg}
            alt=""
          />
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      )}
    </button>
  );
}
