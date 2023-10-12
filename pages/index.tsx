import Image from "next/image";
import cx from "classnames";
import { Dangam } from "@/shared/data/font";
import NavigationButton from "@/components/NavigationButton";
import { useResetRecoilState } from "recoil";
import {
  answerStateMapsState,
  selectedItemState,
  selectedUserState,
  userProfilesState,
} from "@/shared/store/state";

export default function Home() {
  const answerMapReset = useResetRecoilState(answerStateMapsState);
  const userProfilesReset = useResetRecoilState(userProfilesState);
  const selectedItemReset = useResetRecoilState(selectedItemState);
  const selectedUserReset = useResetRecoilState(selectedUserState);

  return (
    <div className="flex flex-col items-center justify-center w-full px-5 py-10 min-h-screen bg-white">
      <div
        className={cx("mb-20 text-4xl font-black text-black", Dangam.className)}
      >
        SKZ 취향표
      </div>
      <Image
        className="object-cover w-[50%] mb-40"
        src="/images/logo.svg"
        alt=""
        width={200}
        height={37}
        unoptimized={true}
      />
      <div className="mb-10 flex flex-col w-full space-y-5 items-center justify-center">
        <NavigationButton
          onClick={() => {}}
          href={"/nine"}
          title={"1인용 9문항 만들기"}
          border={true}
        />
        <NavigationButton
          onClick={() => {
            answerMapReset();
            userProfilesReset();
            selectedItemReset();
            selectedUserReset();
          }}
          href={"/eight/6"}
          title={"6인용 8문항 만들기"}
          border={false}
        />
      </div>
    </div>
  );
}
