import { FC, useLayoutEffect, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableOfContentData } from "@tiptap-pro/extension-table-of-contents";
import { ToC as MemorizedToC } from "./toc";
import { Editor } from "@tiptap/core";
import { cn } from "@/lib/utils";
import { debounce } from "lodash-es";
import "./index.scss";

interface IProps {
  toc: TableOfContentData;
  editor: Editor;
}

const SidePanel: FC<IProps> = ({ toc, editor }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoverVisible, setIsHoverVisible] = useState(false);

  useLayoutEffect(() => {
    const controller = new AbortController();
    application();
    window.addEventListener(
      "resize",
      () => {
        debounceApplication();
      },
      { signal: controller.signal }
    );
    return () => {
      controller.abort();
    };
  }, [isVisible]);

  const application = () => {
    const alignRight = countAlignRight();
    document.body.style.setProperty(
      "--viewer-center-align-right",
      isVisible ? alignRight : "1rem"
    );
  };

  const debounceApplication = useMemo(
    () => debounce(application, 100),
    [isVisible]
  );

  const countAlignRight = () => {
    const scrollWrap = document.getElementById("scroll-wrap")!;
    const editorWrap = document.getElementById("editor-wrap")!;
    const containerWidth = scrollWrap.clientWidth;
    const editorWidth = editorWrap.clientWidth;
    const editorOriginWdith = 880;
    const tocOriginWdith = isVisible ? 305 : 39;
    let alignRight = `${tocOriginWdith}px`;
    if (containerWidth > editorOriginWdith) {
      const singleMargin = (containerWidth - editorWidth) / 2;
      if (tocOriginWdith > singleMargin) {
        const alignRightWidth = tocOriginWdith - singleMargin;
        alignRight = `${alignRightWidth}px`;
      } else {
        alignRight = `0px`;
      }
    }
    return alignRight;
  };

  const visible = useMemo(
    () => isVisible || isHoverVisible,
    [isVisible, isHoverVisible]
  );

  return (
    <div
      className={`fixed ${
        visible ? "top-[56px] right-0" : "top-20 right-4"
      } max-w-[305px] h-[calc(100%-56px)] bg-background z-[1]`}
    >
      <div
        className={cn("mt-6 max-h-[calc(100%-50px)]", {
          "w-[305px]": visible,
          "w-[39px]": !visible,
        })}
        onMouseEnter={() => {
          setIsHoverVisible(true);
        }}
        onMouseLeave={() => {
          setIsHoverVisible(false);
        }}
      >
        {visible && (
          <div className="pb-1">
            <div className="flex items-center px-[25px]">
              <h2 className="text-sm font-semibold">大纲</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-1"
                onClick={() => {
                  setIsVisible(!isVisible);
                  setIsHoverVisible(false);
                }}
              >
                {isVisible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}
        <MemorizedToC editor={editor} items={toc} isVisible={visible} />
      </div>
    </div>
  );
};

export default SidePanel;
