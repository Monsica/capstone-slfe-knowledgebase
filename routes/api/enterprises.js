const express = require('express');
const router = express.Router();

//Enterprise Model
const Enterprise = require('../../models/enterprise');

// @route  GET api/enterprises
// @desc   Get all enterprises
// @access Public
router.get('/', (req, res) => {
  Enterprise.find({})
    .sort({ID: 1})
    .then(enterprises => res.json(enterprises))
});

router.get('/domains', (req, res)=>{
  Enterprise
    .distinct("Primary Domain", 
              {"Primary Domain": {$nin: ["", null]}
              }
            )
    .then(domains => res.json(domains))
});

router.get('/solutions', (req, res)=>{
  Enterprise.distinct("Solution Type", {"Solution Type": {$nin: ["", null]}})
    .then(solutions => res.json(solutions))
});

router.get('/latlong', (req, res)=>{
  Enterprise.find({},{lat:1,long:1})
  .then(result => res.json(result))
})

router.get('/i/:id/', (req, res)=>{
  Enterprise.findById(req.params.id, function(err, enterprise){
    if(err){
      res.send("error occured");
      next();
    }
    res.json(enterprise);
  })
});

router.get('/f/:field/:n', (req, res)=>{
  let name = req.params.field;
  let value = {$nin: ["", null]};
  let query = {};
  query[name] = value;
  if(req.params.n == 0){
    Enterprise.distinct(req.params.field, query)
    .then(solutions => res.json(solutions))
  }
  else if (req.params.n == 1 ){
    let q = JSON.parse('{"'+req.params.field+'": 1, "_id":0}')
    Enterprise.find({}, q)
    .then(solutions => res.json(solutions))
  }
});

router.get('/q/:field/:value', (req, res)=>{
  var query = {};
  query[req.params.field] = req.params.value;

  Enterprise.find(query)
    .then(result => res.json(result))
})

router.get('/update_aws_link', (req, res) => {
  // Enterprise.find({"mainImage": { $regex: ".*aws.*"}}, { "mainImage": 1 }).
  Enterprise.find().
  then(function (result) {
    final = [];

    for (let i = 0; i < result.length; i++) {
      // result[i].fixedImage = "";
      if (result[i].mainImage.includes("aws")) {
        result[i].mainImage = result[i].mainImage.replace("https://s3-us-west-1.amazonaws.com/slfe-image-storage", "https://s3-us-west-1.amazonaws.com/slfe-knowledgebase")

        final.push(result[i])
      } 
      
      if (result[i].otherImages.length > 0) {
        for (let j = 0; j < result[i].otherImages.length; j++) {
          if (result[i].otherImages[j].img.includes("aws")) {
            result[i].otherImages[j].img = result[i].otherImages[j].img.replace("https://s3-us-west-1.amazonaws.com/slfe-image-storage", "https://s3-us-west-1.amazonaws.com/slfe-knowledgebase")

            final.push(result[i]);
            break;
          }
        }
      }

      // result[i].save();
    }
    res.json(final);
  })
});

router.post('/', (req, res) => {
  const newEnt = new Enterprise({
    Name: req.body.Name,
    "Responsible Organization": req.body.ResponsibleOrganization,
    "Short Description": req.body.ShortDescription,
    "General Description": req.body.GeneralDescription,
    "Solution Type": req.body.SolutionType,
    "Primary Domain": req.body.PrimaryDomain,
    "Seconday Domain": req.body.SecondayDomain,
    "Organizational Entity Type": req.body.OrganizationalEntityType,
    "Keyword Descriptiors": req.body.KeywordDescriptors,
    Location: req.body.Location,
    Country: req.body.Country,
    State: req.body.State,
    City: req.body.City,
    "Scope of Activities": req.body.ScopeOfActivities,
    "Operational Area": req.body.OperationalArea,
    "Climate Zone": req.body.ClimateZone,
    "City Type": req.body.CityType,
    "Date Founded": req.body.DateFounded,
    "Economic Networks": req.body.EconomicNetworks,
    "Associations": req.body.Associations,
    "Number of Employees": req.body.NumberOfEmployees,
    References: req.body.References,
    "Annual Revenue": req.body.AnnualRevenue,
    "Number of Workers": req.body.NumberOfWorkers,
    "Product Description": req.body.ProductDescription,
    "Customers Description": req.body.CustomersDescription,
    "Workforce Description": req.body.WorkforceDescription,
    "Production Description": req.body.ProductionDescription,
    "Sourcing Description": req.body.SourcingDescription,
    "Supporting Services Description": req.body.SupportingServicesDescription,
    "Other Outputs Description": req.body.OtherOutputsDescription,
    "Distributing Description": req.body.DistributingDescription,
    "Re-cycling Description": req.body.RecyclingDescription,
    "Managing Description": req.body.ManagingDescription,
    "Decision Making Description": req.body.DecisionMakingDescription,
    "Steering Description": req.body.SteeringDescription,
    "Ownership Description": req.body.OwnershipDescription,
    "Business Model Description": req.body.BusinessModelDescription,
    History: req.body.History,
    Recognition: req.body.Recognition,
    "Future Outlook": req.body.FutureOutlook,
    Researcher: req.body.Researcher,
    "Last Updated": req.body.LastUpdated,
    Lattitude: "",
    Longitude: "",
    mainImage: "",
    otherImages: req.body.otherImages,
    isFeatured: false
  })

  newEnt.save().then(enterprise => res.json(enterprise));
})

module.exports = router;