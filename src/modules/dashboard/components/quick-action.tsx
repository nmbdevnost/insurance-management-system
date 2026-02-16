import { RiArrowRightUpLine } from "@remixicon/react";

export type QuickActionProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
};

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-900 hover:bg-slate-50"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-slate-100 p-2 transition-colors group-hover:bg-slate-900 group-hover:text-white">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <RiArrowRightUpLine className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-900" />
      </div>
    </button>
  );
};

export default QuickAction;
