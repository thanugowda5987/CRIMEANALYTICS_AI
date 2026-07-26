const Reports = () => {

return (

<div className="p-8">

<h1 className="text-3xl font-bold">
Crime Reports
</h1>


<div className="mt-6 bg-white rounded-xl shadow p-6">


<h2 className="text-xl font-semibold">
AI Crime Analysis Report
</h2>


<div className="mt-4 space-y-2">

<p>
Total Crime Reports : 2000
</p>

<p>
Solved Cases : 1240
</p>

<p>
Pending Investigation : 760
</p>


</div>


<button
className="mt-5 px-5 py-2 rounded-lg bg-purple-600 text-white"
>

Generate Report

</button>


</div>


</div>

);

};


export default Reports;