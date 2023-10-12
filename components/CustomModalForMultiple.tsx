import { useEffect } from "react";
import { useRecoilState } from "recoil";

import {
  answerStateMapsState,
  selectedItemState,
  selectedUserState,
} from "@/shared/store/state";
import { Artist } from "@/shared/interfaces/artist";
import { MemberStateMap } from "@/shared/types/MemberStateMap";

interface ModalProps {
  title: string;
  memberType: string;
  members: Artist[];
}

export default function CustomModalForMultiple({
  title,
  memberType,
  members,
}: ModalProps) {
  const [answerStateMaps, setMemberStateMaps] =
    useRecoilState<MemberStateMap[]>(answerStateMapsState);
  const [selectedUserIndex] = useRecoilState<number>(selectedUserState);

  const [__, setSelectedItem] = useRecoilState(selectedItemState);

  const closeModal = () => {
    setMemberStateMaps((prevMaps) => {
      const newStateMaps = [...prevMaps];
      const updatedStateMap: MemberStateMap = {
        ...newStateMaps[selectedUserIndex],
        [memberType]: {
          ...newStateMaps[selectedUserIndex][memberType],
          showModal: false,
        },
      };
      newStateMaps[selectedUserIndex] = updatedStateMap;
      return newStateMaps;
    });
    setSelectedItem("");
  };

  const selectMember = (img: string, name: string) => {
    setMemberStateMaps((prevMaps) => {
      const newStateMaps = [...prevMaps];
      const updatedStateMap: MemberStateMap = {
        ...newStateMaps[selectedUserIndex],
        [memberType]: {
          ...newStateMaps[selectedUserIndex][memberType],
          memberImg: `/images/${img}`,
          memberName: name,
        },
      };
      newStateMaps[selectedUserIndex] = updatedStateMap;
      return newStateMaps;
    });

    setSelectedItem("");
  };

  useEffect(() => {}, [answerStateMaps, selectedUserIndex, memberType]);

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={closeModal}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3 sm:flex">
            <div className="mt-2 text-start sm:ml-4 sm:text-left">
              <span className="mx-3 text-white bg-black px-3 py-1.5 rounded-2xl text-sm font-bold">
                {title}
              </span>
              <div className="grid grid-cols-3">
                {members.map((member, i) => (
                  <button
                    key={i}
                    onClick={() => selectMember(member.img, member.name)}
                    className="flex flex-col items-center p-4 space-y-2 cursor-pointer justify-center"
                  >
                    <img
                      className="object-cover object-center rounded-md aspect-square"
                      src={`/images/${member.img}`}
                      alt=""
                    />
                    <p className="text-gray-900 text-sm font-semibold">{`${member.name}`}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
