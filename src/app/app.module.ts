import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { satsComponents, materialDesignComponents } from 'src/app/components';
import { providers } from 'src/app/providers';

@NgModule({
  declarations: [
    AppComponent,
    ...satsComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...materialDesignComponents
  ],
  exports: [],
  providers: [
    ...providers
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
