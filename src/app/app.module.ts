// ---------------------module
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app.material.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarRatingModule } from 'angular-star-rating';
import { AngularFireStorageModule } from '@angular/fire/storage';

// --------------------component
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { MylistComponent } from './component/mylist/mylist.component';
import { BuycoinComponent } from './component/buycoin/buycoin.component';
import { DisplayComicComponent } from './component/display-comic/display-comic.component';
import { ChapterComponent } from './component/chapter/chapter.component';
import { ComicListsComponent } from './component/comic-lists/comic-lists.component';
import { CurrentChapterComponent } from './component/current-chapter/current-chapter.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DisplayPostListComponent } from './component/display-post-list/display-post-list.component';
import { DisplayComicSearchComponent } from './component/display-comic-search/display-comic-search.component';
import { CurrentChapterLockComponent } from './component/current-chapter-lock/current-chapter-lock.component';

// ---------------------firebase module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { envirronment } from './envirronment';
import { AngularFireAuth } from '@angular/fire/auth';

// ---------------------service
import { ComicService } from './service/comic.service';
import { SubscribeService } from './service/subscribe.service';
import { BuycoinService  } from './service/buycoin.service';
import { UserService } from './service/user.service';
import { PostService } from './service/post.service';


// ---------------------guard, pipe
import { AuthGuard } from './auth.guard';
import { ReadComicGuard  } from './read-comic.guard';
import { canActivate } from '@angular/fire/auth-guard';
import { TimeAgoPipe } from 'time-ago-pipe';



@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgbModule,
    BrowserAnimationsModule,
    StarRatingModule.forRoot(),
    AngularFireModule.initializeApp(envirronment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FontAwesomeModule,
    FlexLayoutModule,
    AngularFireStorageModule,
    RouterModule.forRoot(
    [
      { path: '' , component:  HomeComponent },
      { path: 'app' , component: AppComponent },
      { path: 'mylist', component:  MylistComponent, canActivate:[AuthGuard]},
      { path: 'buycoin', component:  BuycoinComponent, canActivate:[AuthGuard] },
      { path: 'chapter', component: ChapterComponent },
      { path: 'currentChapter', component: CurrentChapterComponent},
      { path: 'currentChapter/:chapterId', component: CurrentChapterComponent},
      { path:'currentChapterLock', component: CurrentChapterLockComponent, canActivate:[ReadComicGuard]},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent }
    ]
    ), 
  ],

  // canActivate:[AuthGuard]

  declarations: [ 
    AppComponent,
    HomeComponent,
    MylistComponent,
    BuycoinComponent,
    DisplayComicComponent,
    ChapterComponent,
    ComicListsComponent,
    CurrentChapterComponent,
    LoginComponent,
    RegisterComponent, 
    DisplayPostListComponent,
    TimeAgoPipe,
    DisplayComicSearchComponent,
    CurrentChapterLockComponent,

  ],

  bootstrap:    [ 
    AppComponent,
  ],

  providers: [
    ComicService,
    AngularFirestore,
    SubscribeService,
    BuycoinService,
    PostService,
    UserService,
    AngularFireAuth,
    AuthGuard,
    ReadComicGuard
  ]

  
})
export class AppModule { }
