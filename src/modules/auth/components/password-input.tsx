import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { RiEyeLine, RiEyeOffLine, RiLockPasswordLine } from "@remixicon/react";
import { useState, type ComponentProps } from "react";

type PasswordInputProps = ComponentProps<typeof InputGroupInput>;

const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  placeholder = "Password",
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <RiLockPasswordLine />
      </InputGroupAddon>

      <InputGroupInput
        placeholder={placeholder}
        type={visible ? "text" : "password"}
        {...props}
      />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          className="aspect-square h-full rounded-full"
          onClick={() => setVisible((prev) => !prev)}
          type="button"
          tabIndex={-1}
        >
          {visible ? (
            <RiEyeOffLine className="size-4" />
          ) : (
            <RiEyeLine className="size-4" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default PasswordInput;
