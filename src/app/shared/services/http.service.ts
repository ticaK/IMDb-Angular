import axios from "axios";
import { RoutingService } from "./routing.service";
import { Injectable } from "@angular/core";

const baseUrl = "http://localhost:8000";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  public token = "";

  constructor(private _routingService: RoutingService) {}

  public get(url) {
    return axios
      .get(`${baseUrl}/${url}`, this.getToken())
      .then(res => this.handleSuccessResponse(res))
      .catch(e => this.handleErrorResponse(e));
  }

  public getToken() {
    return {
      headers: {
        Authorization: this.token ? this.token : ""
      }
    };
  }

  public post(url, data = {}) {
    return axios
      .post(`${baseUrl}/${url}`, data, this.getToken())
      .then(res => this.handleSuccessResponse(res))
      .catch(e => this.handleErrorResponse(e));
  }

  public put(url, data = {}) {
    return axios
      .put(`${baseUrl}/${url}`, data, this.getToken())
      .then(res => this.handleSuccessResponse(res))
      .catch(e => this.handleErrorResponse(e));
  }

  public attachHeaders(headers) {
    this.token = headers;
  }

  public removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete axios.defaults.headers[key]);
  }

  public handleSuccessResponse(response) {
    return response;
  }

  public handleErrorResponse(error) {
    const { status } = error.response;

    switch (status) {
      case 401: {
        this._routingService.goToLoginPage();
        break;
      }
      default:
        break;
    }

    return Promise.reject(error);
  }
}
