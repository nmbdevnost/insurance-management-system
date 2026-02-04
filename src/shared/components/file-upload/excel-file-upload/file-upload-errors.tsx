import { useFileUpload } from "@/shared/providers/file-upload-provider";
import { RiAlertLine } from "@remixicon/react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";

const FileUploadErrors = () => {
  const {
    fileUploadState: { errors },
  } = useFileUpload();

  return (
    <>
      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <RiAlertLine />
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default FileUploadErrors;
