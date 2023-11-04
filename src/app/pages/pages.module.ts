import { NgModule } from '@angular/core'
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
    declarations: [
        HomeComponent,
        ProfileComponent,
    ],
    imports: [
        ComponentsModule,
    ],
    exports: []
})
export class PagesModule { }