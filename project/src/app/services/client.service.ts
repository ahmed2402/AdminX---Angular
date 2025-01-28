import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/class/Client';
import { environment } from '../../environments/environment.development';
import { APIResponseModel } from '../model/interface/role';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

    getAllClient():Observable<APIResponseModel> {
        return this.http.get <APIResponseModel>(environment.API_URL+Constant.API_METHOD.GET_ALL_CLIENT)
    }

    getAllUser() {
      return this.http.get("https://jsonplaceholder.typicode.com/users")
    }

    getAllEmployee():Observable<APIResponseModel> {
      return this.http.get<APIResponseModel>(environment.API_URL+Constant.API_METHOD.GET_ALL_EMP)
    }

    // getAllClientProjects():Observable<APIResponseModel> {
    //   return this.http.get <APIResponseModel>(environment.API_URL+"GetAllClientProjects")
    // }   

      getAllClientProjects():Observable<APIResponseModel> {
      return this.http.get <APIResponseModel>(environment.API_URL+Constant.API_METHOD.GET_ALL_PROJECT)
    }   
 
    
    addUpdate(obj:Client):Observable<APIResponseModel> {
      return this.http.post<APIResponseModel>(environment.API_URL+"AddUpdateClient",obj)
    }
  deletClientById(id:number):Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(environment.API_URL+"DeleteClientByClientId?clientId="+id)
}
deleteProjectById(id:number):Observable<APIResponseModel> {
  // return this.http.delete<APIResponseModel>(environment.API_URL+"DeleteProjectByProjectId"+id)
  return this.http.delete<APIResponseModel>(environment.API_URL+"DeleteProjectByProjectId?projectId="+id)
}
addClientProjectUpdate(obj:Client):Observable<APIResponseModel> {
  return this.http.post<APIResponseModel>(environment.API_URL+"AddUpdateClientProject",obj)
}


   }
