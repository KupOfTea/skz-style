import { Dispatch, SetStateAction } from "react";
import { MemberStateMap } from "@/shared/types/MemberStateMap";
import { Artist } from "@/shared/interfaces/artist";

interface ModalProps {
  title: string;
  memberType: string;
  setStateMap: Dispatch<SetStateAction<MemberStateMap>>;
  members: Artist[];
}

export default function CustomModal({
  title,
  memberType,
  setStateMap,
  members,
}: ModalProps) {
  const closeModal = () => {
    setStateMap((prevState) => ({
      ...prevState,
      [memberType]: { ...prevState[memberType], showModal: false },
    }));
  };

  const selectMember = (img: string, name: string) => {
    setStateMap((prevState) => ({
      ...prevState,
      [memberType]: {
        showModal: false,
        memberImg: `/images/${img}`,
        memberName: name,
      },
    }));
  };

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
