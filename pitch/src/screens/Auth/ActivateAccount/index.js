import ActivateAccount from "./activateAccount";
import enhancer from "./activateAccount.enhancer";
import { hoistStatics } from "recompose";

export default hoistStatics(enhancer)(ActivateAccount);
