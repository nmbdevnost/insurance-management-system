import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $isHeadingNode,
  type HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  type ElementFormatType,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

// shadcn/ui components (keep your existing imports)
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { Toggle } from "@/shared/components/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Tooltip } from "@base-ui/react";
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiBold,
  RiH1,
  RiH2,
  RiH3,
  RiItalic,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiUnderline,
} from "@remixicon/react";

const ALIGMENT_LAYOUT: ElementFormatType[] = [
  "left",
  "center",
  "right",
  "justify",
];

const getAlignment = (alignmentOrder: number): ElementFormatType => {
  if (alignmentOrder > ALIGMENT_LAYOUT.length) {
    return "left";
  }

  return ALIGMENT_LAYOUT[alignmentOrder - 1];
};

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<ElementFormatType>("left");

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      const format = element.getFormat();
      const alignment = getAlignment(format);

      if (alignment) {
        setAlignment(alignment);
      }

      // Update block type
      if ($isListNode(element)) {
        const parentList = element;
        const listType = parentList.getListType();
        setBlockType(listType === "number" ? "ol" : "ul");
      } else {
        const type = $isHeadingNode(element)
          ? element.getTag()
          : element.getType();
        setBlockType(type);
      }

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  const formatParagraph = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  }, [editor]);

  const formatHeading = useCallback(
    (headingTag: HeadingTagType) => {
      if (blockType !== headingTag) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(headingTag));
          }
        });
      }
    },
    [blockType, editor]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  return (
    <TooltipProvider delay={500}>
      <div className="toolbar rounded-t-lg border-b p-2">
        <div className="flex flex-wrap items-center gap-4">
          {/* Undo/Redo */}
          <div>
            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.dispatchCommand(UNDO_COMMAND, undefined)
                    }
                    disabled={!canUndo}
                  >
                    <RiArrowGoBackLine />
                  </Button>
                }
              />
              <TooltipContent>Undo</TooltipContent>
            </Tooltip.Root>

            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      editor.dispatchCommand(REDO_COMMAND, undefined)
                    }
                    disabled={!canRedo}
                  >
                    <RiArrowGoForwardLine />
                  </Button>
                }
              />
              <TooltipContent>Redo</TooltipContent>
            </Tooltip.Root>
          </div>

          <Separator orientation="vertical" />

          {/* Block Type */}
          <ToggleGroup value={[blockType]}>
            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <ToggleGroupItem value="paragraph" onClick={formatParagraph}>
                    <RiParagraph />
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>Normal</TooltipContent>
            </Tooltip.Root>

            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <ToggleGroupItem
                    value="h1"
                    onClick={() => formatHeading("h1")}
                  >
                    <RiH1 />
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>Heading 1</TooltipContent>
            </Tooltip.Root>

            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <ToggleGroupItem
                    value="h2"
                    onClick={() => formatHeading("h2")}
                  >
                    <RiH2 />
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>Heading 2</TooltipContent>
            </Tooltip.Root>

            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <ToggleGroupItem
                    value="h3"
                    onClick={() => formatHeading("h3")}
                  >
                    <RiH3 />
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>Heading 3</TooltipContent>
            </Tooltip.Root>
          </ToggleGroup>

          <Separator orientation="vertical" />

          {/* Text Formatting */}
          <div>
            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <Toggle
                    pressed={isBold}
                    onPressedChange={() =>
                      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
                    }
                  >
                    <RiBold />
                  </Toggle>
                }
              />
              <TooltipContent>Bold</TooltipContent>
            </Tooltip.Root>

            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <Toggle
                    pressed={isItalic}
                    onPressedChange={() =>
                      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
                    }
                  >
                    <RiItalic />
                  </Toggle>
                }
              />
              <TooltipContent>Italic</TooltipContent>
            </Tooltip.Root>

            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <Toggle
                    pressed={isUnderline}
                    onPressedChange={() =>
                      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
                    }
                  >
                    <RiUnderline />
                  </Toggle>
                }
              />
              <TooltipContent>Underline</TooltipContent>
            </Tooltip.Root>
          </div>

          <Separator orientation="vertical" />

          {/* Lists */}
          <div>
            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <Toggle
                    pressed={blockType === "ul"}
                    onPressedChange={() => {
                      if (blockType !== "ul") {
                        editor.dispatchCommand(
                          INSERT_UNORDERED_LIST_COMMAND,
                          undefined
                        );
                      } else {
                        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
                      }
                    }}
                  >
                    <RiListUnordered />
                  </Toggle>
                }
              />
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip.Root>

            <Tooltip.Root>
              <TooltipTrigger
                render={
                  <Toggle
                    pressed={blockType === "ol"}
                    onPressedChange={() => {
                      if (blockType !== "ol") {
                        editor.dispatchCommand(
                          INSERT_ORDERED_LIST_COMMAND,
                          undefined
                        );
                      } else {
                        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
                      }
                    }}
                  >
                    <RiListOrdered />
                  </Toggle>
                }
              />
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip.Root>
          </div>

          <Separator orientation="vertical" />

          {/* Alignment */}
          <ToggleGroup value={[alignment]}>
            {ALIGMENT_LAYOUT.map((alignment) => (
              <Tooltip.Root key={alignment}>
                <TooltipTrigger
                  render={
                    <ToggleGroupItem
                      value={alignment}
                      onClick={() =>
                        editor.dispatchCommand(
                          FORMAT_ELEMENT_COMMAND,
                          alignment
                        )
                      }
                    >
                      {alignment === "left" && <RiAlignLeft />}
                      {alignment === "center" && <RiAlignCenter />}
                      {alignment === "right" && <RiAlignRight />}
                      {alignment === "justify" && <RiAlignJustify />}
                    </ToggleGroupItem>
                  }
                />
                <TooltipContent className="capitalize">
                  Align {alignment}
                </TooltipContent>
              </Tooltip.Root>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </TooltipProvider>
  );
}
