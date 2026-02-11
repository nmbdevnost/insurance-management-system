import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

/**
 * To prevent conflicting shortcuts when text editor is focused.
 * For e.g. Ctrl+B:
 * - toggles sidebar
 * - toggles bold in text editor
 */
const KeyboardShortcutPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const rootElement = editor.getRootElement();

    if (!rootElement) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent Ctrl+B from bubbling when editor is focused
      if ((event.ctrlKey || event.metaKey) && event.key === "b") {
        event.stopPropagation();
      }
    };

    rootElement.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      rootElement.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
    };
  }, [editor]);

  return null;
};

export default KeyboardShortcutPlugin;
