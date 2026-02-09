import { DetailField } from "@/shared/components/details/detail-field";
import { DetailsSection } from "@/shared/components/details/detail-section";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import type { ScheduledNotification } from "@/shared/lib/types/notifications";
import { format } from "date-fns";

const ScheduledNotificationDetails = ({
  rowData,
}: {
  rowData: ScheduledNotification;
}) => {
  const expiryDate = new Date(rowData.expiry_date);
  const scheduledDate = new Date(rowData.scheduled_date);

  return (
    <ScrollArea className="max-h-[75vh]">
      <div className="space-y-8 p-6">
        <DetailsSection title="Overview">
          <DetailField
            label="Policy Number"
            value={rowData.policy_number}
            variant="mono"
          />
          <DetailField label="CIF ID" value={rowData.cif_id} variant="mono" />

          <DetailField label="Type" value={rowData.type} />

          <DetailField label="status" value={rowData.status} variant="badge" />
        </DetailsSection>

        <DetailsSection title="Schedule">
          <DetailField label="Type" value={format(scheduledDate, "PPP")} />

          <DetailField
            label="Scheduled Date"
            value={format(expiryDate, "PPP")}
          />
        </DetailsSection>

        <DetailsSection title="Recipient">
          <DetailField label="Username" value={rowData.username} />
        </DetailsSection>
      </div>
    </ScrollArea>
  );
};

export default ScheduledNotificationDetails;
