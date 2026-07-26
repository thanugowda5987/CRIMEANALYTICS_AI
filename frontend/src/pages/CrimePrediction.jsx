import { useState } from "react";
import { TrendingUp, MapPin, Gauge } from "lucide-react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { getPrediction } from "../api/aiApi";

const CrimePrediction = () => {
  const [district, setDistrict] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await getPrediction({ district });
      setResult(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
          Crime Prediction
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          AI-powered forecasting of crime hotspots and risk scores.
        </p>
      </div>

      <Card hover={false}>
        <div className="flex gap-3 flex-wrap items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-gray-500 mb-1 block">District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Enter district name"
              className="w-full px-4 py-2.5 rounded-xl border border-borderLight dark:border-gray-700 bg-bgLight dark:bg-gray-700 text-sm text-textDark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <Button variant="primary" onClick={handlePredict} disabled={loading}>
            {loading ? "Predicting..." : "Run Prediction"}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card>
          <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
            <Gauge size={20} />
          </div>
          <p className="text-sm text-gray-500">Risk Score</p>
          <p className="text-xl font-heading font-semibold text-textDark dark:text-white">
            {result?.riskScore ?? "Not Available"}
          </p>
        </Card>
        <Card>
          <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-3">
            <MapPin size={20} />
          </div>
          <p className="text-sm text-gray-500">High Risk Areas</p>
          <p className="text-xl font-heading font-semibold text-textDark dark:text-white">
            {result?.highRiskAreas?.length ?? "Not Available"}
          </p>
        </Card>
        <Card>
          <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3">
            <TrendingUp size={20} />
          </div>
          <p className="text-sm text-gray-500">AI Confidence</p>
          <p className="text-xl font-heading font-semibold text-textDark dark:text-white">
            {result?.confidence ? `${result.confidence}%` : "Not Available"}
          </p>
        </Card>
      </div>

      {!result && !loading && (
        <p className="text-sm text-gray-400 text-center py-4">
          Prediction results will appear here once the AI service is connected.
        </p>
      )}
    </div>
  );
};

export default CrimePrediction;