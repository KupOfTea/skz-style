import CustomModalForMultiple from "@/components/CustomModalForMultiple";
import SelectButtonForMultiple from "@/components/SelectButtonForMultiple";
import UserInput from "@/components/UserInput";
import { EIGHT_ITEMS, SKZ } from "@/shared/data/constants";
import {
  answerStateMapsState,
  selectedItemState,
  userProfilesState,
} from "@/shared/store/state";
import { MemberStateMap } from "@/shared/types/MemberStateMap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function EightForSix() {
  const [userProfiles, _] = useRecoilState(userProfilesState);
  const [answerStateMaps, setMemberStateMaps] =
    useRecoilState(answerStateMapsState);
  const [selectedItem] = useRecoilState(selectedItemState);

  const handleShowModal = (item: string, userIndex: number) => {
    setMemberStateMaps((prevMaps) => {
      const updatedMap: MemberStateMap = {
        ...prevMaps[userIndex],
        [item]: {
          ...prevMaps[userIndex][item],
          showModal: true,
        },
      };
      const newMaps = [...prevMaps];
      newMaps[userIndex] = updatedMap;
      return newMaps;
    });
  };

  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center bg-white pb-[200px]">
        <div className="w-full bg-grey-100 border-[1px] border-[#ECECEC] h-[48px] px-[14px] flex flex-col justify-center">
          <div className="flex justify-between items-center">
            <button onClick={handleBackButtonClick}>←</button>
            <div className="text-center flex-grow text-[14px] font-extrabold text-grey-900">
              6인 8문항 취향표 만들기
            </div>
            <div className="w-[16px] hidden">←</div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-10 justify-center w-full px-5 py-10 min-h-screen bg-white">
          <div className="flex flex-col items-center">
            <div className="font-bold text-[14px] mb-[10px] text-grey-900 text-center">{`나와 내 트친들의 취향표를 만들어 보세요.`}</div>
            <div className="font-semibold text-[#A6A6A6] text-[10px] mb-[24px]">
              빠진 문항이 없도록 잘 입력해 주세요.
            </div>
          </div>
          {userProfiles.map((_, index) => (
            <div className="flex flex-col space-y-5" key={`form${index}`}>
              <UserInput userIndex={index} key={`userInput${index}`} />
              <div className="flex flex-row space-x-2">
                {EIGHT_ITEMS.map((item, itemIndex) => (
                  <SelectButtonForMultiple
                    key={(itemIndex + 1) * (index + 1)}
                    title={item}
                    userIndex={index}
                    itemIndex={itemIndex}
                    memberImg={answerStateMaps[index][item].memberImg}
                    memberName={answerStateMaps[index][item].memberName}
                    handleShowModal={() => handleShowModal(item, index)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {EIGHT_ITEMS.map((item: string) =>
          item === selectedItem ? (
            <CustomModalForMultiple
              key={item}
              members={SKZ}
              title={item}
              memberType={item}
            />
          ) : null
        )}
      </div>
      <div
        onClick={() => {
          router.push("/eight/download");
        }}
        className={`fixed rounded-[28px] left-1/2 -translate-x-1/2 text-center items-center justify-center py-[16px] bg-gray-900 text-white font-bold text-[13px] w-[85%] bottom-[35px] ${"block"}`}
      >
        만들기
      </div>
    </div>
  );
}
