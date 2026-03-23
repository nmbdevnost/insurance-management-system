import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { Button } from "../../ui/button";
import Spinner from "../../ui/spinner";

type MultiStepFormFooterProps = {
  currentStep: number;
  isLastStep: boolean;
  isSubmitting: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
};

export function MultiStepFormFooter({
  currentStep,
  isLastStep,
  isSubmitting,
  goToPrevious,
  goToNext,
}: MultiStepFormFooterProps) {
  return (
    <>
      {currentStep > 0 ? (
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={goToPrevious}
        >
          <RiArrowLeftLine className="mr-1.5" />
          Previous
        </Button>
      ) : (
        <div />
      )}

      {isLastStep ? (
        <Button type="submit" disabled={isSubmitting} className="ml-auto">
          {isSubmitting && <Spinner />}
          Submit
        </Button>
      ) : (
        <Button
          type="button"
          disabled={isSubmitting}
          className="ml-auto"
          onClick={(e) => {
            e.preventDefault();
            goToNext();
          }}
        >
          Next
          <RiArrowRightLine />
        </Button>
      )}
    </>
  );
}
