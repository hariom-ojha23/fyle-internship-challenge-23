import { NgModule } from '@angular/core'
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsModule } from '../shared/components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HomeComponent,
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
    ],
    exports: []
})
export class PagesModule { }