import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import FIRTable from "../components/tables/FIRTable";
import SearchBar from "../components/common/SearchBar";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { getAllFIRs } from "../api/firApi";

const FIRList = () => {
  const [firs, setFirs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFIRs = async () => {
      setLoading(true);
      try {
        const res = await getAllFIRs({ search, limit: 50 });
        setFirs(res.data.data.firs);
      } catch (err) {
        setFirs([]);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(fetchFIRs, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
            FIR Records
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Search and manage First Information Reports.
          </p>
        </div>
        <Button variant="primary" icon={Plus}>
          New FIR
        </Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search by FIR number or complainant..." />

      {loading ? <Loader /> : <FIRTable firs={firs} />}
    </div>
  );
};

export default FIRList;