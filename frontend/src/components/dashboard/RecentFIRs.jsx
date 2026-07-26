import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { formatDate, getStatusColor } from "../../utils/helpers";

const RecentFIRs = ({ firs = [] }) => {
  const navigate = useNavigate();

  return (
    <Card hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-textDark dark:text-white">
          Recent FIR Filings
        </h3>
        <button
          onClick={() => navigate("/firs")}
          className="text-sm text-primary hover:underline"
        >
          View All
        </button>
      </div>

      {firs.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">No recent FIRs to display.</p>
      ) : (
        <div className="space-y-3">
          {firs.map((fir) => (
            <div
              key={fir._id}
              onClick={() => navigate(`/firs/${fir._id}`)}
              className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-bgLight dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-textDark dark:text-white">
                  {fir.firNumber}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {fir.district?.name || "Unknown District"} • {formatDate(fir.dateFiled)}
                </p>
              </div>
              <Badge text={fir.status} colorClass={getStatusColor(fir.status)} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentFIRs;