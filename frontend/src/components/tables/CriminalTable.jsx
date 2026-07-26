import { useNavigate } from "react-router-dom";
import Badge from "../common/Badge";
import { getStatusColor, getInitials } from "../../utils/helpers";

const CriminalTable = ({ criminals = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto rounded-card border border-borderLight dark:border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-bgLight dark:bg-gray-700 text-gray-500 dark:text-gray-300">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Name</th>
            <th className="text-left px-4 py-3 font-medium">Age</th>
            <th className="text-left px-4 py-3 font-medium">Gender</th>
            <th className="text-left px-4 py-3 font-medium">District</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {criminals.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">
                No criminal records found.
              </td>
            </tr>
          ) : (
            criminals.map((criminal) => (
              <tr
                key={criminal._id}
                onClick={() => navigate(`/criminals/${criminal._id}`)}
                className="border-t border-borderLight dark:border-gray-700 hover:bg-bgLight dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-button-gradient text-white flex items-center justify-center text-xs font-semibold">
                      {getInitials(criminal.name)}
                    </div>
                    <span className="font-medium text-textDark dark:text-white">
                      {criminal.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {criminal.age || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {criminal.gender || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {criminal.district?.name || "N/A"}
                </td>
                <td className="px-4 py-3">
                  <Badge text={criminal.status} colorClass={getStatusColor(criminal.status)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CriminalTable;