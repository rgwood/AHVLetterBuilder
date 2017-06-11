import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LetterBuilderComponent } from './letter-builder.component';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [
    LetterBuilderComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MarkdownToHtmlModule.forRoot(),
  ],
  providers: [],
  bootstrap: [LetterBuilderComponent]
})
export class AppModule { }
