import { ColorAdjustment } from "@/modules/core/components/SVGComponents";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import OptionsBackgrounds from "./Partials/OptionsBackgrounds";

type TupleOp = 0 | 1;

const TextMenuPost = () => {
  const [optionsText, setOptionsText] = useState<TupleOp>(0);

  const handleClick = () => {
    setOptionsText(1);
  };

  const handleExitOp = () => {
    setOptionsText(0);
  };

  return (
    <>
      <div className="w-full h-16 overflow-x-auto relative hidden-scroll">
        <div className="flex items-center h-full">
          <div className="shadow-lg rounded-full">
            <IconButton onClick={handleClick}>
              <ColorAdjustment className="w-8 h-8" />
            </IconButton>
          </div>

            <AnimatePresence>
              {optionsText !== 0 && (
                <motion.div
                  initial={{ x: "100vw" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100vw" }}
                  transition={{ type: "tween", stiffness: 300, damping: 30 }}
                  className="h-full w-full flex absolute top-0 left-0 z-10 bg-mode-principal items-center gap-2"
                >
                  <div>
                    <IconButton onClick={handleExitOp} className="" sx={{borderRadius: 0}}>
                      <HighlightOffIcon fontSize="large" />
                    </IconButton>
                  </div>
                  <div>
                    {
                        optionsText == 1 &&
                        <OptionsBackgrounds />
                    }

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
    </>
  );
};

export default TextMenuPost;
