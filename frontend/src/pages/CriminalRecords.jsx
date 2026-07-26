import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CriminalTable from "../components/tables/CriminalTable";
import SearchBar from "../components/common/SearchBar";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { getAllCriminals } from "../api/criminalApi";

const CriminalRecords = () => {
  const [criminals, setCriminals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllCriminals({ search, limit: 50 });
        setCriminals(res.data.data.criminals);
      } catch (err) {
        setCriminals([]);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(fetchData, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">
            Criminal Records
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Search criminal history and case associations.
          </p>
        </div>
        <Button variant="primary" icon={Plus}>
          New Record
        </Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or alias..." />

      {loading ? <Loader /> : <CriminalTable criminals={criminals} />}
    </div>
  );
};

export default CriminalRecords;