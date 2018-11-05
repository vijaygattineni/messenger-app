import { Component, OnInit } from '@angular/core';
import { QBService } from '../services/qb.service';
import { Observable } from 'rxjs';
declare var QB: any;
import { qbEndpoints, qbAccount } from '../core/qb.config';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contacts: {};
  chatData: Array<any>;
  message: String;
  selectedUser: any;
  session: any;
  dialogId: Number;
  userDetails: any;
  messageObj: any;

  MessagesFromUsers = (userId, msg) => {
    this.messageObj = {
      from: userId,
      body: msg.body
    };
    this.qbService._notificationObj.emit(this.messageObj);
  }

  constructor(private qbService: QBService) { }

  /**
   * On message send
   *
   * @param userId: To UserId
   * @param message: composed message
   */
  onEnter(userId, message) {
    QB.chat.send(userId, {
      type: 'chat',
      body: message,
      extension: { save_to_history: 1 }
    });
    this.chatData.push({ 'message': message, 'sender_id': this.session.user_id });
    this.message = '';
  }

  /**
   * Retrive Chat History
   *
   */
  retriveMessage() {
    this.qbService.retriveMessage(this.session.token, this.dialogId)
      .subscribe((res: any) => {
        this.chatData = res.items;
      });
  }

  /**
   * Chat user selection
   *
   * @param user: selected user details
   */
  onUserSelect(user) {
    this.selectedUser = user;
    this.qbService.createDialog(this.session.token, this.selectedUser.id)
      .subscribe((data: any) => {
        console.log('Dialog response', data);
        this.dialogId = data._id;
        this.retriveMessage();
        setTimeout(function() { $('.messages-list').scrollTop($('.messages-list')[0].scrollHeight); }
        , 1000);
      });
  }

  /**
   * Component onInit
   */
  ngOnInit() {
    this.session = JSON.parse(sessionStorage.getItem('session'));
    this.qbService.getProfileDetails(sessionStorage.getItem('uname'), this.session.token)
      .subscribe((data: any) => {
        this.userDetails = data;
      });
    this.qbService.getUsers(this.session.token, this.session.user_id)
      .subscribe((data: any) => {
        this.contacts = data.items;
        QB.init(qbAccount.appId, qbAccount.authKey, qbAccount.authSecret, qbEndpoints);
        QB.chat.connect({ userId: this.session.user_id, password: sessionStorage.getItem('pass') }, (err, roster) => {
          if (err) {
            console.log(err);
          } else {
            QB.chat.onMessageListener = this.MessagesFromUsers;
          }
        });
      });

    this.qbService._notificationObj
      .subscribe((data) => {
        if (data.from ===  this.selectedUser.id) {
          this.chatData.push({ recipient_id: data.from, message : data.body});
        }
      });
  }
}

