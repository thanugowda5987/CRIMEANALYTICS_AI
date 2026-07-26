import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { getAllOfficers } from "../api/officerApi";
import { getInitials } from "../utils/helpers";

const Officers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const res = await getAllOfficers();
        setOfficers(res.data.data);
      } catch (err) {
        setOfficers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOfficers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
            Officers
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage officer records across districts and stations.
          </p>
        </div>
        <Button variant="primary" icon={Plus}>
          Add Officer
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {officers.map((officer) => (
            <Card key={officer._id}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-button-gradient text-white flex items-center justify-center font-semibold">
                  {getInitials(officer.name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-textDark dark:text-white">
                    {officer.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {officer.rank} • {officer.badgeNumber}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                {officer.policeStation?.name || "Unassigned"} — {officer.district?.name || "N/A"}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Officers;