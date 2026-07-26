import { Routes, Route } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";


// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import FIRList from "../pages/FIRList";
import FIRDetails from "../pages/FIRDetails";

import CriminalRecords from "../pages/CriminalRecords";
import CriminalDetails from "../pages/CriminalDetails";

import Cases from "../pages/Cases";
import Evidence from "../pages/Evidence";

import Analytics from "../pages/Analytics";
import CrimePrediction from "../pages/CrimePrediction";

import AIChat from "../pages/AIChat";

import Officers from "../pages/Officers";
import Districts from "../pages/Districts";

import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

import NotFound from "../pages/NotFound";


const AppRoutes = () => {

return (

<Routes>


{/* PUBLIC ROUTES */}

<Route element={<PublicLayout />}>

<Route 
path="/" 
element={<Home />} 
/>


<Route 
path="/login" 
element={<Login />} 
/>

</Route>



{/* PRIVATE DASHBOARD ROUTES */}

<Route element={<DashboardLayout />}>


<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
}
/>



<Route
path="/firs"
element={
<ProtectedRoute>
<FIRList />
</ProtectedRoute>
}
/>



<Route
path="/firs/:id"
element={
<ProtectedRoute>
<FIRDetails />
</ProtectedRoute>
}
/>



<Route
path="/criminals"
element={
<ProtectedRoute>
<CriminalRecords />
</ProtectedRoute>
}
/>



<Route
path="/criminals/:id"
element={
<ProtectedRoute>
<CriminalDetails />
</ProtectedRoute>
}
/>



<Route
path="/cases"
element={
<ProtectedRoute>
<Cases />
</ProtectedRoute>
}
/>



<Route
path="/evidence"
element={
<ProtectedRoute>
<Evidence />
</ProtectedRoute>
}
/>



<Route
path="/analytics"
element={
<ProtectedRoute>
<Analytics />
</ProtectedRoute>
}
/>



<Route
path="/crime-prediction"
element={
<ProtectedRoute>
<CrimePrediction />
</ProtectedRoute>
}
/>



<Route
path="/ai-chat"
element={
<ProtectedRoute>
<AIChat />
</ProtectedRoute>
}
/>



<Route
path="/officers"
element={
<ProtectedRoute>
<Officers />
</ProtectedRoute>
}
/>



<Route
path="/districts"
element={
<ProtectedRoute>
<Districts />
</ProtectedRoute>
}
/>



{/* FIXED ROUTES */}

<Route
path="/reports"
element={
<ProtectedRoute>
<Reports />
</ProtectedRoute>
}
/>



<Route
path="/settings"
element={
<ProtectedRoute>
<Settings />
</ProtectedRoute>
}
/>



</Route>



{/* 404 */}

<Route 
path="*" 
element={<NotFound />} 
/>


</Routes>

);

};


export default AppRoutes;