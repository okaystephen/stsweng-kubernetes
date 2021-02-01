const mongoose = require('mongoose');
const db = require('./models/db');
const HealthProgram = require('./models/HealthProgramModel');
const dotenv = require('dotenv');

dotenv.config();
// const url = process.env.MONGO_URI;
const url = "mongodb+srv://dolomed:Dol0m3d@dolomed.rizqg.mongodb.net/<dbname>?retryWrites=true&w=majority"
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
        hp_startdate: "2021-01-20 08:00",
        hp_enddate: "2021-02-20 13:00",
        hp_maxCap: 130,
    },
    {
        hp_name: 'Climate Change',
        hp_desc: 'Ang climate change ay ang pagbabago ng klima o panahon dahil sa pagtaas ng mg greenhouse gases na nagpapainit sa mundo.  Nagdudulot ito ng mga sakuna kagaya ng heatwave, baha at tagtuyot na maaaring magdulot ng pagkakasakit o pagkamatay.  Kapag tumaas ang temperatura ng mundo, dadami ang mga sakit kagaya ng dengue, diarrhea, malnutrisyon at iba pa.',
        hp_location: 'Muntinlupa, Manila',
        hp_startdate: "2021-03-27 10:00",
        hp_enddate: "2021-03-28 12:00",
        hp_maxCap: 400,
    },
    {
        hp_name: 'Environmental Health',
        hp_desc: 'Drinking-water supply, Sanitation (e.g excreta, sewage and septage management), Zero Open Defecation Program (ZODP), Food Sanitation, Air Pollution (indoor and ambient), Chemical Safety, WASH in Emergency situations, Climate Change for Health and Health Impact Assessment (HIA)',
        hp_location: 'Calamba, Laguna',
        hp_startdate: "2021-06-20 12:00",
        hp_enddate: "2021-07-01 15:00",
        hp_maxCap: 250,
    },
    {
        hp_name: 'On-site influenza vaccines',
        hp_desc: 'Protect yourself from flu this fall and winter with a flu vaccine. While getting a flu vaccine will not protect against COVID-19, it can protect you from becoming sick with flu. Flu is another potentially serious respiratory illness that can cause missed work, hospitalization, and, in some cases, even death.',
        hp_location: 'San Pedro, Laguna',
        hp_startdate: "2021-01-20 9:00",
        hp_enddate: "2021-02-01 12:00",
        hp_maxCap: 250,
    },
    {
    hp_name: 'Weight loss programs that offer counseling and education',
        hp_desc: 'Weight loss programmes applied to obese patients with PCOS result in the improvement of the abnormal biochemical and hormonal parameters.',
        hp_location: 'Sta. Rosa, Laguna',
        hp_startdate: "2021-02-15 11:00",
        hp_enddate: "2021-02-28 13:00",
        hp_maxCap: 50,
    },
    {
        hp_name: 'Adolescent health and development program',
            hp_desc: 'Its mission is to ensure that all adolescents have access to comprehensive health care and services in an adolescent-friendly environment.',
            hp_location: 'Sta. Rosa, Laguna',
            hp_startdate: "2021-01-15 13:00",
            hp_enddate: "2021-02-01 16:00",
            hp_maxCap: 70,
    },
    {
        hp_name: 'Barangay Nutrition Scholar (BNS) Program',
            hp_desc: 'The Barangay Nutrition Scholar (BNS) Program is a human resource development strategy of the Philippine Plan of Action for Nutrition, which involves the recruitment, training, deployment and supervision of volunteer workers or barangay nutrition scholars (BNS). Presidential Decree No. 1569 mandated the deployment of one BNS in every barangay in the country to monitor the nutritional status of children and/or link communities with nutrition and related service providers. PD 1569 also mandated the NNC to administer the program in cooperation with local government units.',
            hp_location: 'Navotas, Manila',
            hp_startdate: "2021-03-15 11:00",
            hp_enddate: "2021-03-27 13:00",
            hp_maxCap: 100,
    },
    {
        hp_name: 'Expanded Program on Immunization',
            hp_desc: 'The Expanded Program on Immunization (EPI) was established in 1976 to ensure that infants/children and mothers have access to routinely recommended infant/childhood vaccines. Six vaccine-preventable diseases were initially included in the EPI: tuberculosis, poliomyelitis, diphtheria, tetanus, pertussis and measles. In 1986, 21.3% “fully immunized” children less than fourteen months of age based on the EPI Comprehensive Program review.',
            hp_location: 'Marikina, Manila',
            hp_startdate: "2021-04-01 13:00",
            hp_enddate: "2021-04-20 15:00",
            hp_maxCap: 100,
    },
    {
        hp_name: 'Garantisadong Pambata',
            hp_desc: 'Comprehensive and integrated  package of services and communication on health, nutrition and environment for children available everyday at various settings such as home, school, health facilities and communities by government and non-government organizations, private sectors and civic groups.',
            hp_location: 'Mandaluyong, Manila',
            hp_startdate: "2021-01-03 9:00",
            hp_enddate: "2021-02-25 11:00",
            hp_maxCap: 50,
    },
    {
        hp_name: 'Infant and Young Child Feeding (IYCF)',
            hp_desc: 'Children have the right to adequate nutrition and access to safe and nutritious food, and both are essential for fulfilling their right to the highest attainable standard of health. Mothers and Infants form a biological and social unit and improved IYCF begins with ensuring the health and nutritional status of women.',
            hp_location: 'Pasay, Manila',
            hp_startdate: "2021-04-01 8:00",
            hp_enddate: "2021-04-29 12:00",
            hp_maxCap: 30,
    },
    {
        hp_name: 'National Family Planning Program',
            hp_desc: 'Provision of free FP Commodities that are medically safe, legal, non-abortifacient, effective and culturally acceptable to all in need of the FP service. Delivery of FP services by hospitals to the poor communities especially Geographically Isolated and Disadvantaged Areas (GIDAs)',
            hp_location: 'Pasay, Manila',
            hp_startdate: "2021-04-01 13:00",
            hp_enddate: "2021-04-29 15:00",
            hp_maxCap: 30,
    },
    {
        hp_name: 'National Family Planning Program',
            hp_desc: 'Provision of free FP Commodities that are medically safe, legal, non-abortifacient, effective and culturally acceptable to all in need of the FP service. Delivery of FP services by hospitals to the poor communities especially Geographically Isolated and Disadvantaged Areas (GIDAs)',
            hp_location: 'Pasay, Manila',
            hp_startdate: "2021-04-01 10:00",
            hp_enddate: "2021-04-29 12:00",
            hp_maxCap: 40,
    },
    {
        hp_name: 'Malaria Control Program',
            hp_desc: 'Malaria is a life-threatening disease caused by plasmodium parasites transmitted by anopheles mosquito or rarely through blood transfusion and sharing of contaminated needles causing acute febrile illness and symptoms in the form of fever, headache and chills. Untreated, P. falciparum malaria may progress to severe illness and possibly, death.',
            hp_location: 'Quezon City, Manila',
            hp_startdate: "2021-05-15 9:00",
            hp_enddate: "2021-05-30 13:00",
            hp_maxCap: 60,
    },
    {
        hp_name: 'Rabies Prevention and Control Program',
            hp_desc: 'Rabies is a human infection that occurs after a transdermal bite or scratch by an infected animal, like dogs and cats. It can be transmitted when infectious material, usually saliva, comes into direct contact with a victim’s fresh skin lesions. Rabies may also occur, though in very rare cases, through inhalation of virus-containing spray or through organ transplants.',
            hp_location: 'Hermosa, Bulacan',
            hp_startdate: "2021-03-10 10:00",
            hp_enddate: "2021-03-20 14:00",
            hp_maxCap: 35,
    },
    {
        hp_name: 'Philippine Cancer Control Program',
            hp_desc: 'Cancer is one of the four epidemic non-communicable diseases (NCDs) or lifestyle-related diseases (LRDs) which include cardiovascular diseases, diabetes mellitus, and chronic respiratory diseases. According to Dr. Antonio Miguel Dans in his paper “Introduction to Non-Communicable Diseases” in August 2014, the NCDs are now considered a “silent disaster” of massive proportion that is ravaging the Filipino population, killing 300,000 victims a year, 800 every day, and 33 every hour. Its toll on lives is likened to “two 747 planes packed with passengers crashing every day”. Those NCDs share common risk factors, such as tobacco use, unhealthy diet, insufﬁcient physical activity and the harmful use of alcohol.',
            hp_location: 'Limay, Bulacan',
            hp_startdate: "2021-04-15 11:00",
            hp_enddate: "2021-05-10 15:00",
            hp_maxCap: 35,
    },

    {
        hp_name: 'AAA Latest Test Program',
            hp_desc: 'This is a test program that has the latest everything to sort.',
            hp_location: 'AAA Limay, Bulacan',
            hp_startdate: "3021-04-15 11:00",
            hp_enddate: "3021-05-10 15:00",
            hp_maxCap: 1,
    },
    {
        hp_name: 'ZZZ Oldest Test Program',
            hp_desc: 'This is a test program that has the oldest everything to sort.',
            hp_location: 'ZZZ Limay, Bulacan',
            hp_startdate: "1021-01-01 11:00",
            hp_enddate: "1021-01-01 15:00",
            hp_maxCap: 1,
    },
    {
        hp_name: 'Test Program',
            hp_desc: 'This is a test program.',
            hp_location: 'Limay, Bulacan',
            hp_startdate: "2021-04-15 11:00",
            hp_enddate: "2021-05-10 15:00",
            hp_maxCap: 1,
    },
];


db.insertMany(HealthProgram, healthprograms);



