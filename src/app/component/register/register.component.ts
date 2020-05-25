import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { BuycoinService } from '../.././service/buycoin.service';
import { SubscribeService } from '../.././service/subscribe.service';


import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  username:string;
  email:string;
  password: string;

  profileUrl :Observable<string>;
  selectedFile: File;

  constructor(
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private route: Router,
    private buyCoinSevice: BuycoinService,
    private subscribeService :SubscribeService,
    private storage: AngularFireStorage


  ) { }

  ngOnInit() {
   this.registerForm = this.formBuilder.group({
     'Name': [this.username,[
       Validators.required,
     ]],
     'Email': [this.email,[
       Validators.required,
       Validators.email
     ]],
     'Password': [this.password, [
       Validators.required,
       Validators.minLength(6)
     ]]
   })
  }

  Submit(){
    if(confirm("register")){
      this.afAuth.auth.createUserWithEmailAndPassword(
        this.registerForm.value.Email, this.registerForm.value.Password
      )
      .then( userData => {
        //this.NewCoinAccount(userData.user.uid, 0);
        this.InitialBookmark(userData.user.uid);
        this.InitialHistory(userData.user.uid);
      
        userData.user.updateProfile({
          displayName: this.registerForm.value.Name,
          photoURL: this.profileUrl
        })
      })
      .catch(function(error){ 
        window.alert(error.message);
      });
      console.log(this.registerForm.value.Email);
      console.log(this.registerForm.value.Password);
      this.route.navigate(["login"]);

    }
    

  }
  // uploadImg(event){

  //   this.selectedFile = event.target.files[0];
  //   const filepath = 'user_pic/'+this.makeid(11);
  //   const fileRef = this.storage.ref(filepath);
  //   const task = this.storage.upload(filepath, this.selectedFile);
  //   console.log("upload image ",filepath);

  //   // download url
  //   task.snapshotChanges().pipe(
  //       finalize(() => this.profileUrl = fileRef.getDownloadURL() )
  //    )
  //   .subscribe()


  // }
  // makeid(length) {
  //   var result           = '';
  //   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   var charactersLength = characters.length;
  //   for ( var i = 0; i < length; i++ ) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  NewCoinAccount(usr_id:string, amount_of:number){
    this.buyCoinSevice.NewCoinAccount(usr_id, amount_of);
  }

  InitialBookmark(usr_id:string){
    this.subscribeService.Initialbookmark(usr_id);
  }

  InitialHistory(usr_id:string){
    this.buyCoinSevice.Initialhistory(usr_id);
  }
}