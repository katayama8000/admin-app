import { MembersComponent } from './members/members.component';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router"

const routes: Routes = [
  {path:"members",component:MembersComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
