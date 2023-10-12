import { Dispatch, SetStateAction } from "react";
import { MemberStateMap } from "../types/MemberStateMap";

export const setShowModal = (
  item: string,
  setStateMap: Dispatch<SetStateAction<MemberStateMap>>
) => {
  setStateMap((prev: any) => ({
    ...prev,
    [item]: { ...prev[item], showModal: !prev[item].showModal },
  }));
};
