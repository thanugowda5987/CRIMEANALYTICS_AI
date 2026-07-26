import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Button from "../components/common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4">
      <ShieldAlert size={56} className="text-primary mb-4" />
      <h1 className="font-heading text-3xl font-semibold text-textDark dark:text-white">
        404 — Page Not Found
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button variant="primary" className="mt-6" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;