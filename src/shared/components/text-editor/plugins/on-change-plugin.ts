import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

// Plugin to sync external value and onChange
function OnChangePlugin({ onChange }: { onChange?: (value: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onChange) return;

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const jsonString = JSON.stringify(editorState.toJSON());
        onChange(jsonString);
      });
    });
  }, [editor, onChange]);

  return null;
}

export default OnChangePlugin;
