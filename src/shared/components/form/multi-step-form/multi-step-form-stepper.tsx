import { cn } from "@/shared/lib/utils";
import { Badge } from "../../ui/badge";
import {
  StepperIndicator,
  StepperTitle,
  StepperTrigger,
} from "../../ui/stepper";

export type Step = {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

type MultiStepFormStepperProps = {
  step: Step;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
};

export function MultiStepFormStepper({
  step,
  index,
  isActive,
  isCompleted,
}: MultiStepFormStepperProps) {
  return (
    <StepperTrigger className="flex grow flex-col items-start justify-center gap-2.5 outline-none">
      <StepperIndicator
        className={cn(
          "size-10 border-2 [&_svg:not([class*='size-'])]:size-5",
          isCompleted && "bg-success text-white",
          !isActive &&
            !isCompleted &&
            "border-border text-muted-foreground bg-transparent"
        )}
      >
        {step.icon}
      </StepperIndicator>

      <div className="flex flex-col items-start gap-1">
        <div className="text-muted-foreground text-[10px] font-semibold uppercase">
          Step {index + 1}
        </div>

        <StepperTitle
          className={cn(
            "text-start text-base font-semibold",
            !isActive && "text-muted-foreground"
          )}
        >
          {step.title}
        </StepperTitle>

        <div>
          {isActive && (
            <Badge size="sm" variant="primary-light">
              In Progress
            </Badge>
          )}
          {isCompleted && (
            <Badge size="sm" variant="success-light">
              Completed
            </Badge>
          )}
          {!isActive && !isCompleted && (
            <Badge
              size="sm"
              variant="secondary"
              className="text-muted-foreground"
            >
              Pending
            </Badge>
          )}
        </div>
      </div>
    </StepperTrigger>
  );
}
