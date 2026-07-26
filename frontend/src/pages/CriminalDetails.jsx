import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Loader from "../components/common/Loader";
import { getCriminalById } from "../api/criminalApi";
import { getStatusColor, getInitials } from "../utils/helpers";

const CriminalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [criminal, setCriminal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCriminalById(id);
        setCriminal(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (!criminal) return <p className="text-center text-gray-400 py-10">Record not found.</p>;

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <Card hover={false}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-button-gradient text-white flex items-center justify-center text-xl font-semibold">
            {getInitials(criminal.name)}
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold text-textDark dark:text-white">
              {criminal.name}
            </h1>
            <Badge text={criminal.status} colorClass={getStatusColor(criminal.status)} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover={false}>
          <h3 className="font-heading font-semibold text-textDark dark:text-white mb-4">
            Personal Details
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Age</dt>
              <dd className="text-textDark dark:text-white">{criminal.age || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Gender</dt>
              <dd className="text-textDark dark:text-white">{criminal.gender || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">District</dt>
              <dd className="text-textDark dark:text-white">{criminal.district?.name || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Identification Marks</dt>
              <dd className="text-textDark dark:text-white">
                {criminal.identificationMarks || "N/A"}
              </dd>
            </div>
          </dl>
        </Card>

        <Card hover={false}>
          <h3 className="font-heading font-semibold text-textDark dark:text-white mb-4">
            Criminal History
          </h3>
          {criminal.criminalHistory?.length ? (
            <ul className="space-y-3 text-sm">
              {criminal.criminalHistory.map((h, idx) => (
                <li key={idx} className="border-b border-borderLight dark:border-gray-700 pb-2">
                  <p className="text-textDark dark:text-white font-medium">
                    {h.crimeCategory?.name || "Unknown Category"} ({h.year})
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">{h.outcome}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No prior history recorded.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CriminalDetails;