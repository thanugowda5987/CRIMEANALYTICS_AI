import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n
.use(initReactI18next)
.init({

resources: {


// ================= ENGLISH =================

en: {

translation: {


appName: "KSP Crime Analytics Platform",


// Navigation

dashboard: "Dashboard",
home: "Home",
login: "Login",
logout: "Logout",

fir: "FIR Records",
crimeReports: "Crime Reports",
criminals: "Criminal Records",
cases: "Cases",
evidence: "Evidence",
officers: "Officers",
districts: "Districts",

analytics: "Analytics",
prediction: "Crime Prediction",
aiChat: "AI Assistant",

reports: "Reports",
settings: "Settings",


// Common buttons

search: "Search",
add: "Add",
edit: "Edit",
delete: "Delete",
save: "Save",
cancel: "Cancel",
submit: "Submit",
update: "Update",
view: "View",
download: "Download",
upload: "Upload",


// Dashboard

welcome:
"Welcome to KSP Crime Analytics Platform",

totalCrime:
"Total Crimes",

solvedCases:
"Solved Cases",

pendingCases:
"Pending Cases",

activeCases:
"Active Cases",

recentActivity:
"Recent Activities",

quickActions:
"Quick Actions",


// FIR

firNumber:
"FIR Number",

date:
"Date",

location:
"Location",

crimeType:
"Crime Type",

status:
"Status",

complainant:
"Complainant",

description:
"Description",

addFir:
"Add FIR",


// Criminal

criminalName:
"Criminal Name",

age:
"Age",

gender:
"Gender",

address:
"Address",

crimeHistory:
"Crime History",

wanted:
"Wanted",

arrested:
"Arrested",


// Cases

caseId:
"Case ID",

open:
"Open",

closed:
"Closed",

investigation:
"Investigation",

pending:
"Pending",

solved:
"Solved",


// Analytics

crimeTrend:
"Crime Trend",

hotspot:
"Crime Hotspot",

districtAnalysis:
"District Analysis",

monthlyReport:
"Monthly Report",

yearlyReport:
"Yearly Report",


// AI

askQuestion:
"Ask Question",

chat:
"Chat",

predictionResult:
"Prediction Result",

recommendation:
"Recommendation",


// Login

email:
"Email",

password:
"Password",

remember:
"Remember Me",

forgot:
"Forgot Password?",

signIn:
"Sign In",


// Settings

profile:
"Profile",

account:
"Account",

security:
"Security",

notifications:
"Notifications",

changeLanguage:
"Change Language",


// Roles

admin:
"Admin",

investigator:
"Investigator",

officer:
"Officer",

analyst:
"Analyst",

viewer:
"Viewer",


// Messages

loading:
"Loading...",

success:
"Success",

error:
"Error",

noData:
"No Data Available"


}

},



// ================= KANNADA =================


kn: {

translation: {


appName:
"KSP ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ ವೇದಿಕೆ",


// Navigation

dashboard:
"ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",

home:
"ಮುಖಪುಟ",

login:
"ಲಾಗಿನ್",

logout:
"ಲಾಗ್ ಔಟ್",


fir:
"FIR ದಾಖಲೆಗಳು",

crimeReports:
"ಅಪರಾಧ ವರದಿಗಳು",

criminals:
"ಅಪರಾಧಿಗಳ ದಾಖಲೆಗಳು",

cases:
"ಪ್ರಕರಣಗಳು",

evidence:
"ಸಾಕ್ಷ್ಯಗಳು",

officers:
"ಅಧಿಕಾರಿಗಳು",

districts:
"ಜಿಲ್ಲೆಗಳು",


analytics:
"ವಿಶ್ಲೇಷಣೆ",

prediction:
"ಅಪರಾಧ ಭವಿಷ್ಯ",

aiChat:
"AI ಸಹಾಯಕ",

reports:
"ವರದಿಗಳು",

settings:
"ಸೆಟ್ಟಿಂಗ್‌ಗಳು",


// Buttons

search:
"ಹುಡುಕಿ",

add:
"ಸೇರಿಸಿ",

edit:
"ತಿದ್ದು",

delete:
"ಅಳಿಸಿ",

save:
"ಉಳಿಸಿ",

cancel:
"ರದ್ದುಮಾಡಿ",

submit:
"ಸಲ್ಲಿಸಿ",

update:
"ನವೀಕರಿಸಿ",

view:
"ವೀಕ್ಷಿಸಿ",

download:
"ಡೌನ್‌ಲೋಡ್",

upload:
"ಅಪ್‌ಲೋಡ್",


// Dashboard

welcome:
"KSP ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ ವೇದಿಕೆಗೆ ಸ್ವಾಗತ",

totalCrime:
"ಒಟ್ಟು ಅಪರಾಧಗಳು",

solvedCases:
"ಪರಿಹರಿಸಿದ ಪ್ರಕರಣಗಳು",

pendingCases:
"ಬಾಕಿ ಪ್ರಕರಣಗಳು",

activeCases:
"ಸಕ್ರಿಯ ಪ್ರಕರಣಗಳು",

recentActivity:
"ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು",

quickActions:
"ತ್ವರಿತ ಕಾರ್ಯಗಳು",


// FIR

firNumber:
"FIR ಸಂಖ್ಯೆ",

date:
"ದಿನಾಂಕ",

location:
"ಸ್ಥಳ",

crimeType:
"ಅಪರಾಧದ ಪ್ರಕಾರ",

status:
"ಸ್ಥಿತಿ",

complainant:
"ದೂರುದಾರ",

description:
"ವಿವರಣೆ",

addFir:
"FIR ಸೇರಿಸಿ",


// Criminal

criminalName:
"ಅಪರಾಧಿಯ ಹೆಸರು",

age:
"ವಯಸ್ಸು",

gender:
"ಲಿಂಗ",

address:
"ವಿಳಾಸ",

crimeHistory:
"ಅಪರಾಧ ಇತಿಹಾಸ",

wanted:
"ಬೇಕಾಗಿರುವ ವ್ಯಕ್ತಿ",

arrested:
"ಬಂಧಿಸಲಾಗಿದೆ",


// Cases

caseId:
"ಪ್ರಕರಣ ಸಂಖ್ಯೆ",

open:
"ತೆರೆದಿದೆ",

closed:
"ಮುಚ್ಚಲಾಗಿದೆ",

investigation:
"ತನಿಖೆ",

pending:
"ಬಾಕಿ",

solved:
"ಪರಿಹರಿಸಲಾಗಿದೆ",


// Analytics

crimeTrend:
"ಅಪರಾಧ ಪ್ರವೃತ್ತಿ",

hotspot:
"ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್",

districtAnalysis:
"ಜಿಲ್ಲಾ ವಿಶ್ಲೇಷಣೆ",

monthlyReport:
"ಮಾಸಿಕ ವರದಿ",

yearlyReport:
"ವಾರ್ಷಿಕ ವರದಿ",


// AI

askQuestion:
"ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ",

chat:
"ಸಂಭಾಷಣೆ",

predictionResult:
"ಭವಿಷ್ಯ ಫಲಿತಾಂಶ",

recommendation:
"ಶಿಫಾರಸು",


// Login

email:
"ಇಮೇಲ್",

password:
"ಪಾಸ್‌ವರ್ಡ್",

remember:
"ನೆನಪಿಡಿ",

forgot:
"ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?",

signIn:
"ಪ್ರವೇಶಿಸಿ",


// Settings

profile:
"ಪ್ರೊಫೈಲ್",

account:
"ಖಾತೆ",

security:
"ಭದ್ರತೆ",

notifications:
"ಅಧಿಸೂಚನೆಗಳು",

changeLanguage:
"ಭಾಷೆ ಬದಲಾಯಿಸಿ",


// Roles

admin:
"ನಿರ್ವಾಹಕ",

investigator:
"ತನಿಖಾಧಿಕಾರಿ",

officer:
"ಅಧಿಕಾರಿ",

analyst:
"ವಿಶ್ಲೇಷಕ",

viewer:
"ವೀಕ್ಷಕ",


// Messages

loading:
"ಲೋಡ್ ಆಗುತ್ತಿದೆ",

success:
"ಯಶಸ್ವಿ",

error:
"ದೋಷ",

noData:
"ಯಾವುದೇ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ"


}

}

},



lng: "en",

fallbackLng: "en",


interpolation: {

escapeValue:false

}


});


export default i18n;