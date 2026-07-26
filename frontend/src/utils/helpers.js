export const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status) => {
  const colors = {
    Filed: "bg-secondary/10 text-secondary",
    "Under Investigation": "bg-warning/10 text-warning",
    "Chargesheet Filed": "bg-primary/10 text-primary",
    Closed: "bg-gray-200 text-gray-600",
    Solved: "bg-success/10 text-success",
    Open: "bg-secondary/10 text-secondary",
    "Pending Trial": "bg-warning/10 text-warning",
    Wanted: "bg-danger/10 text-danger",
    "In Custody": "bg-warning/10 text-warning",
    Released: "bg-gray-200 text-gray-600",
    "Under Trial": "bg-secondary/10 text-secondary",
    Convicted: "bg-danger/10 text-danger",
  };
  return colors[status] || "bg-gray-100 text-gray-600";
};

export const getSeverityColor = (severity) => {
  const colors = {
    Low: "text-success",
    Medium: "text-warning",
    High: "text-danger",
    Critical: "text-danger font-bold",
  };
  return colors[severity] || "text-gray-500";
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};