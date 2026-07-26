import { useState } from "react";


const Settings = () => {


const [language,setLanguage]=useState("English");


return (

<div className="p-8">


<h1 className="text-3xl font-bold">
Settings
</h1>


<div className="mt-6 bg-white rounded-xl shadow p-6">


<h2 className="text-xl font-semibold">
Language Settings
</h2>



<p className="mt-3">
Selected Language: {language}
</p>



<button

onClick={()=>setLanguage("English")}

className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg"

>

English

</button>




<button

onClick={()=>setLanguage("ಕನ್ನಡ")}

className="ml-3 px-5 py-2 bg-blue-600 text-white rounded-lg"

>

ಕನ್ನಡ

</button>



</div>


</div>

);

};


export default Settings;