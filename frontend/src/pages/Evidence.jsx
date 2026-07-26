import { useEffect, useState } from "react";
import { Plus, Paperclip } from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { getAllEvidence } from "../api/evidenceApi";
import { formatDate } from "../utils/helpers";

const Evidence = () => {
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await getAllEvidence();
        setEvidence(res.data.data);
      } catch (err) {
        setEvidence([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
            Evidence Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track physical and digital evidence with chain of custody.
          </p>
        </div>
        <Button variant="primary" icon={Plus}>
          Add Evidence
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : evidence.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No evidence records found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {evidence.map((item) => (
            <Card key={item._id}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Paperclip size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-textDark dark:text-white">{item.type}</p>
                  <p className="text-xs text-gray-500">{formatDate(item.collectedDate)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description || "No description provided."}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Evidence;