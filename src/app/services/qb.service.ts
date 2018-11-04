import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QBService {

  _notificationObj = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  createDialog(token, occupantId) {
    const body = {
      'type': 3,
      'occupants_ids': occupantId
    };
    return this.http.post('https://api.quickblox.com/chat/Dialog.json',
      body,
      {
        headers: { 'QB-Token': token, 'content-type': 'application/json' }
      });
  }

  retriveMessage(token, dialogId) {
    return this.http.get('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + dialogId, {
      headers: { 'QB-Token': token }
    });
  }

  getUsers(token, id) {
    return this.http.get('https://api.quickblox.com/users.json?filter[]=number+id+ne+' + id, {
      headers: { 'QB-Token': token, 'content-type': 'application/json' }
    });
  }

  getProfileDetails(uname, token) {
    return this.http.get('https://api.quickblox.com/users/by_login.json?login=' + uname, {
      headers: { 'QB-Token': token, 'content-type': 'application/json' }
    });
  }

}
