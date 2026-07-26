import { useNavigate } from "react-router-dom";
import Badge from "../common/Badge";
import { formatDate, getStatusColor } from "../../utils/helpers";

const CaseTable = ({ cases = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-card border border-borderLight dark:border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-bgLight dark:bg-gray-700 text-gray-500 dark:text-gray-300">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Case Number</th>
            <th className="text-left px-4 py-3 font-medium">Title</th>
            <th className="text-left px-4 py-3 font-medium">District</th>
            <th className="text-left px-4 py-3 font-medium">Priority</th>
            <th className="text-left px-4 py-3 font-medium">Opened</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {cases.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-400">
                No cases found.
              </td>
            </tr>
          ) : (
            cases.map((c) => (
              <tr
                key={c._id}
                onClick={() => navigate(`/cases/${c._id}`)}
                className="border-t border-borderLight dark:border-gray-700 hover:bg-bgLight dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-medium text-textDark dark:text-white">
                  {c.caseNumber}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {c.title || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {c.district?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{c.priority}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {formatDate(c.openedDate)}
                </td>
                <td className="px-4 py-3">
                  <Badge text={c.status} colorClass={getStatusColor(c.status)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CaseTable;