import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import { getAllDistricts } from "../api/districtApi";

const Districts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await getAllDistricts();
        setDistricts(res.data.data);
      } catch (err) {
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
          Districts
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          All Karnataka districts covered by the platform.
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {districts.map((d) => (
            <Card key={d._id}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-textDark dark:text-white">{d.name}</p>
                  <p className="text-xs text-gray-500">{d.region}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Districts;