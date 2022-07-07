import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenbersComponent } from './menbers/menbers.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

@NgModule({
  declarations: [AppComponent, MenbersComponent, MemberDetailComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
