import { cn } from "@/shared/lib/utils";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { $getRoot, $insertNodes, type LexicalEditor } from "lexical";
import KeyboardShortcutPlugin from "./plugins/keyboard-shortcut-plugin";
import ToolbarPlugin from "./plugins/toolbar-plugin";
import { editorTheme } from "./theme";

type TextEditorProps = {
  placeholder?: string;
  className?: string;
  invalid?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
};

const TextEditor = ({
  placeholder,
  className,
  invalid,
  value,
  onChange,
  onBlur,
  disabled,
}: TextEditorProps) => {
  const initialConfig = {
    namespace: "rich-text-editor",
    theme: editorTheme,
    onError: (error: unknown) => console.error(error),
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      LinkNode,
      AutoLinkNode,
    ],
    editable: !disabled,
    editorState: value
      ? (editor: LexicalEditor) => {
          // Parse HTML and set as initial state
          const parser = new DOMParser();
          const dom = parser.parseFromString(value, "text/html");
          const nodes = $generateNodesFromDOM(editor, dom);

          const root = $getRoot();
          root.clear();
          root.select();
          $insertNodes(nodes);
        }
      : undefined,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        aria-invalid={invalid}
        className={cn(
          "dark:bg-input/30 border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 w-full rounded-lg border bg-transparent transition-colors outline-none focus-within:ring-[3px] aria-invalid:ring-[3px]",
          disabled &&
            "bg-input/50 dark:bg-input/80 pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
      >
        <ToolbarPlugin />

        <div className="editor-inner relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="prose max-sm:prose-sm max-w-none p-4 focus:outline-none"
                onBlur={onBlur}
              />
            }
            placeholder={
              placeholder ? (
                <div className="editor-placeholder text-muted-foreground pointer-events-none absolute top-4 left-4">
                  {placeholder}
                </div>
              ) : (
                <></>
              )
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <KeyboardShortcutPlugin />
          <OnChangePlugin
            onChange={(editorState, editor) => {
              editorState.read(() => {
                const html = $generateHtmlFromNodes(editor, null);
                onChange?.(html);
              });
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default TextEditor;
