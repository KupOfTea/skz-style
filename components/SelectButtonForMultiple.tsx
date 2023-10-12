import {
  answerStateMapsState,
  selectedItemState,
  selectedUserState,
} from "@/shared/store/state";
import { MemberStateMap } from "@/shared/types/MemberStateMap";
import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";

interface ButtonProps {
  title: string;
  userIndex: number;
  itemIndex: number;
  handleShowModal: (item: string, userIndex: number) => void;
  memberImg: string;
  memberName: string;
}

export default function SelectButtonForMultiple({
  title,
  userIndex,
  itemIndex,
  handleShowModal,
  memberImg,
  memberName,
}: ButtonProps) {
  const [_, setMemberStateMaps] = useRecoilState(answerStateMapsState);

  const [__, setSelectedUser] = useRecoilState(selectedUserState);

  const [___, setSelectedItem] = useRecoilState(selectedItemState);

  const handleSelectMember = () => {
    setMemberStateMaps((prevMaps) => {
      const updatedMap: MemberStateMap = {
        ...prevMaps[userIndex],
        [title]: {
          ...prevMaps[userIndex][title],
          showModal: true,
        },
      };
      const newMaps = [...prevMaps];
      newMaps[userIndex] = updatedMap;
      return newMaps;
    });
    setSelectedUser(userIndex);
    setSelectedItem(title);
    handleShowModal(title, userIndex);
  };

  return (
    <button
      onClick={handleSelectMember}
      key={`selectButton${(userIndex + 1) * (itemIndex + 1)}`}
      className="flex flex-col items-center cursor-pointer text-gray-600 hover:border-black hover:text-black justify-center"
    >
      <p className="text-[10px] font-black py-0.5 rounded-xl text-black">
        {title}
      </p>
      {memberImg !== "" && memberName !== "" ? (
        <div>
          <img
            className="w-9 h-9 object-cover object-center rounded-md aspect-square"
            src={memberImg}
            alt=""
          />
          <p className="text-[10px] font-extrabold py-1 whitespace-nowrap">
            {memberName}
          </p>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-[18px] h-[18px]"
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
