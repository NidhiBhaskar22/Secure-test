import { useDisableContextMenu } from "./useDisableContextMenu";
import { useCopyDisable } from "./useCopyDisable";
import { useSelectionDisable } from "./useSelectionDisable";
import {
  useFullScreenDetection,
  triggerFullscreen,
} from "./useFullScreenDetection";
import { useTabFocusDetection } from "./useTabFocusDetection";

export function useProctoring({
  preventTabSwitch = false,
  forceFullScreen = false,
  preventContextMenu = false,
  preventUserSelection = false,
  preventCopy = false,
} = {}) {
  useDisableContextMenu({ disabled: !preventContextMenu });
  useCopyDisable({ disabled: !preventCopy });
  useSelectionDisable({ disabled: !preventUserSelection });


  const { tabFocusStatus } = useTabFocusDetection({
    disabled: !preventTabSwitch,
  });

  console.log(tabFocusStatus, "from proctoring");

  const { fullScreenStatus } = useFullScreenDetection({
    disabled: !forceFullScreen,
  });

  return {
    fullScreen: { status: fullScreenStatus, trigger: triggerFullscreen },
    tabFocus: { status: tabFocusStatus },
  };
}
