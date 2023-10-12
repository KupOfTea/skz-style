import CustomModal from "@/components/CustomModal";
import SelectButton from "@/components/SelectButton";
import SelectButtonForMultiple from "@/components/SelectButton";
import { NINE_ITEMS, SKZ } from "@/shared/data/constants";
import { handleImageDownload } from "@/shared/helper/hanldeImageDownload";
import { setShowModal } from "@/shared/helper/setShowModal";
import { MemberStateMap } from "@/shared/types/MemberStateMap";
import Link from "next/link";
import { useState } from "react";

export default function NineVersionLayout() {
  const initialMemberStateMap: MemberStateMap = NINE_ITEMS.reduce(
    (obj: MemberStateMap, item: string) => {
      obj[item] = { showModal: false, memberImg: "", memberName: "" };
      return obj;
    },
    {}
  );

  const [skzMemberStateMap, setSkzMemberStateMap] = useState(
    initialMemberStateMap
  );

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center bg-white">
        <div className="flex flex-col mb-10 w-full bg-white border-[1px] border-[#ECECEC] h-[48px] px-[14px] justify-center">
          <Link href="/" className="text-xl text-gray-900 font-medium">
            ←
          </Link>
        </div>
        <div className="m-1 w-12/13 items-center justify-center">
          <div
            id="card"
            className="p-1.5 w-full grid grid-cols-3 items-center justify-center rounded-xl bg-white border-[1px] border-gray-300"
          >
            {NINE_ITEMS.map((item: string, index: number) => (
              <SelectButton
                title={item}
                index={index}
                setShowModal={() => setShowModal(item, setSkzMemberStateMap)}
                memberImg={skzMemberStateMap[item].memberImg}
                memberName={skzMemberStateMap[item].memberName}
              />
            ))}
            <div className="p-2">
              <p className="text-[6px] text-gray-900 font-light whitespace-nowrap">
                개발자 타이가 @DevvTyga
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleImageDownload("card")}
          className="mt-5 bg-black hover:bg-black text-white py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-none"
        >
          다운로드
        </button>
      </div>
      {NINE_ITEMS.map((item: string) =>
        skzMemberStateMap[item].showModal ? (
          <CustomModal
            members={SKZ}
            title={item}
            setStateMap={setSkzMemberStateMap}
            memberType={item}
          />
        ) : null
      )}
    </div>
  );
}
