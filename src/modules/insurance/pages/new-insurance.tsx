import TextEditor from "@/shared/components/text-editor";
import { useState } from "react";

const NewInsurancePage = () => {
  const [value, setValue] = useState<string | undefined>(
    `<h1><span style="white-space: pre-wrap;">This is Heading 1</span></h1><h2><span style="white-space: pre-wrap;">This is Heading 2</span></h2><h3><span style="white-space: pre-wrap;">This is Heading 3</span></h3><p class="text-foreground"><span style="white-space: pre-wrap;">This is paragraph</span></p><p class="text-foreground"><b><strong class="font-bold" style="white-space: pre-wrap;">This is bold paragraph</strong></b></p><p class="text-foreground"><u><span class="underline" style="white-space: pre-wrap;">This is underlined paragraph</span></u></p><p class="text-foreground"><i><em class="italic" style="white-space: pre-wrap;">This is italic paragraph</em></i></p>`
  );

  return (
    <div>
      <TextEditor value={value} onChange={setValue} />
      <pre className="break-all whitespace-pre-wrap">{value}</pre>
    </div>
  );
};

export default NewInsurancePage;
