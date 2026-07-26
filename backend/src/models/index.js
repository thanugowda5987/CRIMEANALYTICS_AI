// Central model registry.
// Ensures every schema is registered with Mongoose before any
// populate() call needs it — required once at server startup.

require("./User");
require("./District");
require("./Taluk");
require("./PoliceStation");
require("./Officer");
require("./CrimeCategory");
require("./Victim");
require("./CriminalRecord");
require("./Evidence");
require("./FIR");
require("./Case");
require("./CrimeReport");
require("./CrimeStatistic");