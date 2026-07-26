import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import CaseTable from "../components/tables/CaseTable";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

import { getAllCases, createCase } from "../api/caseApi";


const Cases = () => {

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm,setShowForm] = useState(false);


  const [formData,setFormData] = useState({

    caseNumber:"",
    title:"",
    district:"",
    priority:"Low",
    status:"Open"

  });



  const fetchCases = async () => {

    try {

      const res = await getAllCases({ limit: 50 });

      setCases(res.data.data.cases || []);

    }

    catch(err){

      console.log(err);
      setCases([]);

    }

    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchCases();

  },[]);



  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };



  const handleSubmit=async()=>{


    try{


      await createCase(formData);


      alert("Case Added Successfully");


      setShowForm(false);


      setFormData({

        caseNumber:"",
        title:"",
        district:"",
        priority:"Low",
        status:"Open"

      });


      fetchCases();


    }

    catch(error){

      console.log(error);

      alert("Failed to add case");

    }


  };



  return (

    <div className="space-y-6">


      <div className="flex items-center justify-between flex-wrap gap-4">

        <div>

          <h1 className="font-heading text-2xl font-semibold text-textDark dark:text-white">

            Cases

          </h1>


          <p className="text-sm text-gray-500 dark:text-gray-400">

            Track investigation progress across cases.

          </p>


        </div>



        <Button

          variant="primary"

          icon={Plus}

          onClick={()=>setShowForm(true)}

        >

          New Case

        </Button>


      </div>





      {showForm && (

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">


          <div className="flex justify-between">

            <h2 className="text-xl font-semibold">

              Add New Case

            </h2>


            <X

            className="cursor-pointer"

            onClick={()=>setShowForm(false)}

            />

          </div>





          <input

          name="caseNumber"

          placeholder="Case Number"

          className="border p-3 rounded w-full"

          value={formData.caseNumber}

          onChange={handleChange}

          />




          <input

          name="title"

          placeholder="Case Title"

          className="border p-3 rounded w-full"

          value={formData.title}

          onChange={handleChange}

          />





          <input

          name="district"

          placeholder="District"

          className="border p-3 rounded w-full"

          value={formData.district}

          onChange={handleChange}

          />






          <select

          name="priority"

          className="border p-3 rounded w-full"

          value={formData.priority}

          onChange={handleChange}

          >

          <option>Low</option>

          <option>Medium</option>

          <option>High</option>

          <option>Critical</option>


          </select>





          <select

          name="status"

          className="border p-3 rounded w-full"

          value={formData.status}

          onChange={handleChange}

          >


          <option>Open</option>

          <option>Under Investigation</option>

          <option>Pending Trial</option>

          <option>Closed</option>

          <option>Solved</option>


          </select>





          <button

          onClick={handleSubmit}

          className="bg-purple-700 text-white px-6 py-3 rounded-xl"

          >

          Save Case

          </button>



        </div>

      )}






      {loading ? 

      <Loader /> 

      : 

      <CaseTable cases={cases} />

      }


    </div>

  );

};


export default Cases;