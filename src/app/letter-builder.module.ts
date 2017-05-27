import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LetterBuilderComponent } from './letter-builder.component';

const appRoutes: Routes = [
  { path: 'project/:id',      component: LetterBuilderComponent }
];

@NgModule({
  declarations: [
    LetterBuilderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [LetterBuilderComponent]
})
export class AppModule { }
