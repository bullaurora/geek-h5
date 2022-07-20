import { AppThunkDispatch } from "@/types/store";
import { useDispatch } from "react-redux";

const useMyDispatch = ():AppThunkDispatch=>useDispatch() 
export default useMyDispatch