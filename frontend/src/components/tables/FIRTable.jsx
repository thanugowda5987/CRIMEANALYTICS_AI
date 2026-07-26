import { useNavigate } from "react-router-dom";
import Badge from "../common/Badge";
import { formatDate, getStatusColor } from "../../utils/helpers";

const FIRTable = ({ firs = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-card border border-borderLight dark:border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-bgLight dark:bg-gray-700 text-gray-500 dark:text-gray-300">
          <tr>
            <th className="text-left px-4 py-3 font-medium">FIR Number</th>
            <th className="text-left px-4 py-3 font-medium">District</th>
            <th className="text-left px-4 py-3 font-medium">Category</th>
            <th className="text-left px-4 py-3 font-medium">Date Filed</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {firs.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">
                No FIR records found.
              </td>
            </tr>
          ) : (
            firs.map((fir) => (
              <tr
                key={fir._id}
                onClick={() => navigate(`/firs/${fir._id}`)}
                className="border-t border-borderLight dark:border-gray-700 hover:bg-bgLight dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-medium text-textDark dark:text-white">
                  {fir.firNumber}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {fir.district?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {fir.crimeCategory?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {formatDate(fir.dateFiled)}
                </td>
                <td className="px-4 py-3">
                  <Badge text={fir.status} colorClass={getStatusColor(fir.status)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FIRTable;