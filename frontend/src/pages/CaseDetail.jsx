import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { getCaseById, updateCase } from '../api/caseApi';
import { getEvidenceByCase, createEvidence } from '../api/evidenceApi';

const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evidenceForm, setEvidenceForm] = useState({ type: 'document', title: '', description: '' });

  const fetchAll = async () => {
    const [c, e] = await Promise.all([getCaseById(id), getEvidenceByCase(id)]);
    setCaseData(c.data.data.case);
    setEvidence(e.data.data.evidence);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [id]);

  const handleStatusChange = async (status) => {
    const res = await updateCase(id, { status });
    setCaseData(res.data.data.case);
  };

  const handleEvidenceSubmit = async (e) => {
    e.preventDefault();
    await createEvidence({ ...evidenceForm, caseId: id });
    setEvidenceForm({ type: 'document', title: '', description: '' });
    fetchAll();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader size="lg" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-textDark/60 mb-4 hover:text-primary"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-heading font-semibold mb-3">
            {caseData.caseNumber} — {caseData.title}
          </h2>

          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            <p><span className="text-textDark/50">District:</span> {caseData.district}</p>
            <p><span className="text-textDark/50">Crime Type:</span> {caseData.crimeType}</p>
            <p><span className="text-textDark/50">Priority:</span> {caseData.priority}</p>
            <p><span className="text-textDark/50">Suspects:</span> {caseData.suspects?.length || 0}</p>
          </div>

          <div className="flex gap-2 mb-5">
            {['open', 'under_investigation', 'closed', 'solved'].map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`text-xs px-3 py-1.5 rounded-full border ${
                  caseData.status === s
                    ? 'bg-button-gradient text-white border-transparent'
                    : 'border-border hover:bg-black/5'
                }`}
              >
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>

          <h4 className="font-heading font-semibold text-sm mb-2">Evidence</h4>
          <ul className="space-y-2 text-sm mb-4">
            {evidence.map((ev) => (
              <li key={ev._id} className="border-b border-border/60 pb-2">
                <span className="font-medium">{ev.title}</span> — {ev.type}
              </li>
            ))}
            {evidence.length === 0 && (
              <p className="text-textDark/50">No evidence recorded yet.</p>
            )}
          </ul>

          <form onSubmit={handleEvidenceSubmit} className="grid grid-cols-3 gap-2 text-sm">
            <select
              value={evidenceForm.type}
              onChange={(e) => setEvidenceForm({ ...evidenceForm, type: e.target.value })}
              className="border border-border rounded-lg px-2 py-2"
            >
              <option value="document">Document</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="physical">Physical</option>
              <option value="digital">Digital</option>
            </select>
            <input
              placeholder="Title"
              value={evidenceForm.title}
              onChange={(e) => setEvidenceForm({ ...evidenceForm, title: e.target.value })}
              required
              className="border border-border rounded-lg px-2 py-2"
            />
            <button
              type="submit"
              className="bg-button-gradient text-white rounded-lg text-sm"
            >
              Add Evidence
            </button>
          </form>
        </Card>

        <Card>
          <h4 className="font-heading font-semibold text-sm mb-3">Related FIRs</h4>
          <ul className="space-y-2 text-sm">
            {caseData.relatedFIRs?.map((f) => (
              <li key={f._id} className="border-b border-border/60 pb-2">
                {f.firNumber} — {f.crimeType}
              </li>
            ))}
            {(!caseData.relatedFIRs || caseData.relatedFIRs.length === 0) && (
              <p className="text-textDark/50">No linked FIRs.</p>
            )}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CaseDetail;