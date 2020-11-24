const mongoose = require('mongoose');
const db = require('./models/db');
const HealthProgram = require('./models/HealthProgramModel');

const url = 'mongodb://localhost:27017/stsweng-kubernetes';
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect(url, options, err => {
    if (err) throw err;
    console.log('Connected at ' + url);
});

var healthprograms = [
    {
        hp_name: 'Blood Donation Program',
        hp_desc: 'Republic Act No. 7719, also known as the National Blood Services Act of 1994, promotes voluntary blood donation to provide sufficient supply of safe blood and to regulate blood banks. This act aims to inculcate public awareness that blood donation is a humanitarian act.',
        hp_location: 'Parañaque, Manila',
        hp_startdate: "2021-01-20",
        hp_enddate: "2021-02-20",
        hp_maxCap: 130,
    },
    {
        hp_name: 'Climate Change',
        hp_desc: 'Ang climate change ay ang pagbabago ng klima o panahon dahil sa pagtaas ng mg greenhouse gases na nagpapainit sa mundo.  Nagdudulot ito ng mga sakuna kagaya ng heatwave, baha at tagtuyot na maaaring magdulot ng pagkakasakit o pagkamatay.  Kapag tumaas ang temperatura ng mundo, dadami ang mga sakit kagaya ng dengue, diarrhea, malnutrisyon at iba pa.',
        hp_location: 'Muntinlupa, Manila',
        hp_startdate: "2021-03-27",
        hp_enddate: "2021-03-28",
        hp_curCap: 400,
        hp_maxCap: 400,
    },
    {
        hp_name: 'Environmental Health',
        hp_desc: 'Drinking-water supply, Sanitation (e.g excreta, sewage and septage management), Zero Open Defecation Program (ZODP), Food Sanitation, Air Pollution (indoor and ambient), Chemical Safety, WASH in Emergency situations, Climate Change for Health and Health Impact Assessment (HIA)',
        hp_location: 'Calamba, Laguna',
        hp_startdate: "2021-06-20",
        hp_enddate: "2021-07-01",
        hp_curCap: 10,
        hp_maxCap: 250,
    },
];

db.insertMany(HealthProgram, healthprograms);



