import { Dispatch, SetStateAction } from "react";
import { MemberStateMap } from "../types/MemberStateMap";

export const setMember = (
  item: string,
  key: string,
  value: string,
  setStateMap: Dispatch<SetStateAction<MemberStateMap>>
) => {
  setStateMap((prev) => ({ ...prev, [item]: { ...prev[item], [key]: value } }));
};
