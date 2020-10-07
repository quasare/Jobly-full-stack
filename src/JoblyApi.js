import axios from "axios";
const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class JoblyApi {
    static async request(endpoint, params = {}, verb = "get") {
      let token = localStorage.getItem('jobly-token');

      let _token = JSON.parse(token)
     console.log(_token); 
    // console.debug("API Call:", endpoint, params, verb);

    let q;
    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/${endpoint}`, { params: { _token, ...params } } );
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
    static async getCompany(handle) {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    }

    static async getCompanies() {
      let res = await this.request(`companies`);

      return res.companies;
    }
    static async getJobs(search) {
      let res = await this.request("jobs");
      console.log(res);
      return res.jobs;
    }
      

  
    static async getCompanies(search) {
        let res = await this.request("companies");
        return res.companies;
      }
    
      static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
      }
    
      static async getJobs(search) {
        let res = await this.request("jobs", { search });
        return res.jobs;
      }
    
      static async applyToJob(id) {
        let res = await this.request(`jobs/${id}/apply`, {}, "post");
        return res.message;
      }
    
      static async login(data) {
        let res = await this.request(`login`, data, "post");
        return res.token;
      }
    
      static async register(data) {
        let res = await this.request(`users`, data, "post");
        return res.token;
      }
    
      static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
      }
    
      static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
      }
  }

  export default JoblyApi;