import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { getFIRById } from "../api/firApi";
import { formatDate, getStatusColor } from "../utils/helpers";

const FIRDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fir, setFir] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFIR = async () => {
      try {
        const res = await getFIRById(id);
        setFir(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchFIR();
  }, [id]);

  if (loading) return <Loader />;
  if (!fir) return <p className="text-center text-gray-400 py-10">FIR not found.</p>;

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
            FIR {fir.firNumber}
          </h1>
          <Badge text={fir.status} colorClass={getStatusColor(fir.status)} />
        </div>
        <Button variant="outline" icon={Download}>
          Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover={false}>
          <h3 className="font-heading font-semibold text-textDark dark:text-white mb-4">
            FIR Information
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Police Station</dt>
              <dd className="text-textDark dark:text-white">{fir.policeStation?.name || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">District</dt>
              <dd className="text-textDark dark:text-white">{fir.district?.name || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Crime Category</dt>
              <dd className="text-textDark dark:text-white">{fir.crimeCategory?.name || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Date Filed</dt>
              <dd className="text-textDark dark:text-white">{formatDate(fir.dateFiled)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Investigating Officer</dt>
              <dd className="text-textDark dark:text-white">
                {fir.investigatingOfficer?.name || "Not Assigned"}
              </dd>
            </div>
          </dl>
        </Card>

        <Card hover={false}>
          <h3 className="font-heading font-semibold text-textDark dark:text-white mb-4">
            Complainant & Incident
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Complainant Name</dt>
              <dd className="text-textDark dark:text-white">{fir.complainantName || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Contact</dt>
              <dd className="text-textDark dark:text-white">{fir.complainantContact || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Incident Location</dt>
              <dd className="text-textDark dark:text-white">{fir.incidentLocation || "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Incident Date</dt>
              <dd className="text-textDark dark:text-white">{formatDate(fir.incidentDate)}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <Card hover={false}>
        <h3 className="font-heading font-semibold text-textDark dark:text-white mb-3">
          Description
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {fir.description || "No description provided."}
        </p>
      </Card>
    </div>
  );
};

export default FIRDetails;