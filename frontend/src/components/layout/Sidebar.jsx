import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Briefcase,
  FileText,
  Fingerprint,
  Map,
  FileBarChart,
  Settings,
  Shield,
  Users,
  MapPin,
} from "lucide-react";


const navItems = [

  {
    key: "dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },

  {
    key: "aiChat",
    path: "/ai-chat",
    icon: MessageSquare
  },

  {
    key: "analytics",
    path: "/analytics",
    icon: BarChart3
  },

  {
    key: "prediction",
    path: "/crime-prediction",
    icon: TrendingUp
  },

  {
    key: "cases",
    path: "/cases",
    icon: Briefcase
  },

  {
    key: "fir",
    path: "/firs",
    icon: FileText
  },

  {
    key: "criminals",
    path: "/criminals",
    icon: Fingerprint
  },

  {
    key: "evidence",
    path: "/evidence",
    icon: Map
  },

  {
    key: "officers",
    path: "/officers",
    icon: Users
  },

  {
    key: "districts",
    path: "/districts",
    icon: MapPin
  },

  {
    key: "reports",
    path: "/reports",
    icon: FileBarChart
  }

];



const Sidebar = ({ isOpen }) => {


  const { t, i18n } = useTranslation();



  return (

    <aside

      className={`fixed top-0 left-0 h-screen 
      bg-sidebar-gradient text-white z-40 
      transition-all duration-300
      ${isOpen ? "w-64" : "w-20"}
      flex flex-col`}

    >



      {/* Logo */}

      <div className="flex items-center gap-3 px-5 py-6">


        <div className="
        w-10 h-10 rounded-xl 
        bg-white/10 flex items-center 
        justify-center">

          <Shield size={22}/>

        </div>



        {
          isOpen &&

          <div className="leading-tight">

            <p className="font-heading font-semibold text-sm">
              KSP AI
            </p>


            <p className="text-xs text-white/60">

              {t("appName")}

            </p>


          </div>

        }


      </div>





      {/* Menu */}

      <nav className="flex-1 overflow-y-auto px-3 space-y-1">


        {
          navItems.map(
            ({key,path,icon:Icon}) => (


            <NavLink

              key={path}

              to={path}


              className={({isActive}) =>

              `flex items-center gap-3 
              px-3 py-2.5 rounded-xl 
              text-sm transition-all duration-200

              ${
                isActive
                ?
                "bg-white/15 font-medium"
                :
                "text-white/70 hover:bg-white/10 hover:text-white"
              }`

              }


            >


              <Icon 
              size={19}
              className="flex-shrink-0"
              />



              {
                isOpen &&

                <span>

                  {t(key)}

                </span>

              }



            </NavLink>


          ))
        }


      </nav>





      {/* Bottom Section */}

      <div className="px-3 pb-5">



        {/* Settings */}

        <NavLink

          to="/settings"

          className="
          flex items-center gap-3 
          px-3 py-2.5 rounded-xl 
          text-sm text-white/70
          hover:bg-white/10 
          hover:text-white"

        >


          <Settings size={19}/>



          {
            isOpen &&

            <span>

              {t("settings")}

            </span>

          }


        </NavLink>





        {/* Language Buttons */}

        {
          isOpen &&

          <div className="mt-4 flex gap-2">


            <button

              onClick={() => i18n.changeLanguage("en")}

              className="
              bg-white text-purple-700
              px-3 py-1 rounded"

            >

              English

            </button>




            <button

              onClick={() => i18n.changeLanguage("kn")}

              className="
              bg-white text-purple-700
              px-3 py-1 rounded"

            >

              ಕನ್ನಡ

            </button>



          </div>

        }



      </div>



    </aside>

  );

};


export default Sidebar;