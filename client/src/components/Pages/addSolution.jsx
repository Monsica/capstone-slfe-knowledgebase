import React, { Component } from 'react'
import Navbar from '../PageComponents/Navbar'
import Tabs from "../PageComponents/SolutionTab";
import Footer from '../PageComponents/Footer'
import { connect } from "react-redux";
import { getDomainEntries } from "../../actions/domainActions";
import { addSolutionFunc } from "../../actions/enterpriseActions";
import { withRouter } from 'react-router-dom'

class addSolution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      ResponsibleOrganization: "",
      ShortDescription: "",
      GeneralDescription: "",
      SolutionType: "",
      PrimaryDomain: "",
      SecondaryDomain: "",
      OrganizationalEntityType: "",
      KeywordDescriptors: "",
      Location: "",
      Country: "United States",
      State: "AZ",
      City: "Tempe",
      ScopeOfActivities: "Regional",
      OperationalArea: "",
      ClimateZone: "",
      CityType: "",
      DateFounded: "0",
      EconomicNetworks: "",
      Associations: "",
      NumberOfEmployees: "",
      References: "",
      AnnualRevenue: "",
      NumberOfWorkers: "",
      ProductDescription: "",
      CustomersDescription: "",
      WorkforceDescription: "",
      ProductionDescription: "",
      SourcingDescription: "",
      SupportingServicesDescription: "",
      OtherOutputsDescription: "",
      DistributingDescription: "",
      RecyclingDescription: "",
      ManagingDescription: "",
      DecisionMakingDescription: "",
      SteeringDescription: "",
      OwnershipDescription: "",
      BusinessModelDescription: "",
      History: "",
      Recognition: "",
      FutureOutlook: "",
      Researcher: "",
      LastUpdated: ""
    };

    // TRY
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    
    this.setState({
      [name]: target.value
    });
  }

  handleFormSubmit() {
    if (this.state.Name !== "") {
      const apiCall = this.props.addSolutionFunc(this.state);
      apiCall.then(data => {
        console.log(data.payload._id);
        this.props.history.push('/solution/' + data.payload._id);
      });
    } else {
      alert("Name is required.");
    }
  }

  componentWillMount() {
    const domains = this.props.getDomainEntries();
    domains.then(data => {
      this.setState({
        domains: data.payload
      });

      this.setState({
        PrimaryDomain: data.payload[0].name
      })
    });
  }

  componentDidMount() {
    document.title = "Add Solution";
  }

  getCategoryItems() {
    var categoryTypes = [];
    if (this.state.domains) {
      for (var i = 0; i < this.state.domains.length; i++) {
        categoryTypes.push(
          <option value={this.state.domains[i].name}>
            {this.state.domains[i].name}
          </option>
        );
      }
    }

    return categoryTypes;
  }

  render() {
    const categoryList = this.getCategoryItems();

    return (
      <div >
        <Navbar />
        <h1>Add New Solution</h1> 
        <br />
        <Tabs showCancelBtn={true} showSaveBtn={true} onSave={this.handleFormSubmit}>
          <div label="General">
            <label>Name</label> <br />
            <input name="Name" type="text" value={this.state.Name} onChange={this.handleInputChange}></input>
            <br /><br />
            <label>Responsible Organization</label> <br />
            <input name="ResponsibleOrganization" type="text" value={this.state.ResponsibleOrganization} onChange={this.handleInputChange}></input>
            <br /><br />
            <label>General Description</label> <br />
            <input name="GeneralDescription" type="text" size="50" value={this.state.GeneralDescription} onChange={this.handleInputChange}></input>
            <br /><br />
            <label>Short Description</label> <br />
            <input name="ShortDescription" type="text" value={this.state.ShortDescription} onChange={this.handleInputChange}></input>
            <br /><br />
            <label>Solution Type</label> <br />
            <input name="SolutionType" type="text" value={this.state.SolutionType} onChange={this.handleInputChange}></input>
            <br /><br />
            <label>Primary Domain</label> <br />
            <select name="PrimaryDomain" onChange={this.handleInputChange}>
              {categoryList}
            </select>
            <br /><br />
            <label>Secondary Domain</label> <br />
            <select name="SecondaryDomain" onChange={this.handleInputChange}>
              <option value="">None</option>
              {categoryList}
            </select>
            <br /><br />
            <label>Keyword Descriptors</label> <br />
            <input name="KeywordDescriptors" type="text" value={this.state.KeywordDescriptors} onChange={this.handleInputChange}></input><br />
            <small>Keywords should be separated by semi-colons</small>
            <br /><br />
            <label>Country</label> <br />
            <input name="Country" type="text" value={this.state.Country} onChange={this.handleInputChange}></input>
            <br /><br />
            <label>State/Region</label> <br />
            <input name="State" type="text" value={this.state.State} onChange={this.handleInputChange}></input>
            <br /><br />
            <label>City</label> <br />
            <input name="City" type="text" value={this.state.City} onChange={this.handleInputChange}></input>
            <br /><br />
            <label>Scope of Activities</label> <br />
            <select name="ScopeOfActivities" value={this.state.ScopeOfActivities} onChange={this.handleInputChange}>
              <option value="Regional">Regional</option>
              <option value="Statewide">Statewide</option>
              <option value="National">National</option>
            </select>
            <br /><br />
            <label>Economic Networks</label> <br />
            <input name="EconomicNetworks" type="text" value={this.state.EconomicNetworks} onChange={this.handleInputChange}></input>
            <br /><br />
          </div>
          <div label="Details">
            <label>Product Description</label> <br />
            <textarea name="ProductDescription" rows="5" cols="50" value={this.state.ProductDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Customer Description</label> <br />
            <textarea name="CustomerDescription" rows="5" cols="50" value={this.state.CustomerDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Workforce Description</label> <br />
            <textarea name="WorkforceDescription" rows="5" cols="50" value={this.state.WorkforceDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Production Description</label> <br />
            <textarea name="ProductionDescription" rows="5" cols="50" value={this.state.ProductionDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Sourcing Description</label> <br />
            <textarea name="SourcingDescription" rows="5" cols="50" value={this.state.SourcingDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Supporting Services Description</label> <br />
            <textarea name="SupportingServicesDescription" rows="5" cols="50" value={this.state.SupportingServicesDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Distributing Description</label> <br />
            <textarea name="DistributingDescription" rows="5" cols="50" value={this.state.DistributingDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Re-Cycling Description</label> <br />
            <textarea name="RecyclingDescription" rows="5" cols="50" value={this.state.RecyclingDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Managing Description</label> <br />
            <textarea name="ManagingDescription" rows="5" cols="50" value={this.state.ManagingDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Decision Making Description</label> <br />
            <textarea name="DecisionMakingDescription" rows="5" cols="50" value={this.state.DecisionMakingDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Steering Description</label> <br />
            <textarea name="SteeringDescription" rows="5" cols="50" value={this.state.SteeringDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Ownership Description</label> <br />
            <textarea name="OwnershipDescription" rows="5" cols="50" value={this.state.OwnershipDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <label>Business Model Description</label> <br />
            <textarea name="BusinessModelDescription" rows="5" cols="50" value={this.state.BusinessModelDescription} onChange={this.handleInputChange}></textarea>
            <br /><br />
          </div>
          <div label="Images">
            <input type="file" accept="image/*"></input>
            <input type="button" value="Upload"></input>
          </div>
          <div label="References">
          <label>References</label> <br />
            <textarea name="References" rows="5" cols="50" value={this.state.References} onChange={this.handleInputChange}></textarea>
            <br /><br />
          </div>            
        </Tabs>
      <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  enterprise: state.enterprise
});

export default withRouter(connect(
  mapStateToProps,
  { getDomainEntries, addSolutionFunc }
)(addSolution));
