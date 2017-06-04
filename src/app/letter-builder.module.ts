import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LetterBuilderComponent } from './letter-builder.component';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';

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
    RouterModule.forRoot(appRoutes),
    MarkdownToHtmlModule.forRoot(),
  ],
  providers: [],
  bootstrap: [LetterBuilderComponent]
})
export class AppModule { }
